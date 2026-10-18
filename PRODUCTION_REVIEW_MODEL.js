// Evidence and commercial-siting review, separate from the seasonal climate index.
// Categorical flags are not yield probabilities or interpolated station readings.
const CYPRUS_PROFILES={general:{label:'General cultivated oil / table olive',upperM:1000,page:9},koroneiki:{label:'Koroneiki · oil olive',upperM:500,exclusiveUpper:true,page:6},kalamon:{label:'Kalamon · table olive',upperM:600,page:7},amfissis:{label:'Amfissis · table olive',upperM:600,page:7}};
const PRODUCTION_COLORS={unverified:'#87958e',conditional:'#d1a354',high_risk:'#c16d58',annual_harvests:'#85b979',water:'#87958e'};
function harvestSeriesQualifies(s){
 const y=s.yieldSeries;if(!y||y.values.length<5||y.values.length!==y.seasonStartYears.length)return false;
 return y.values.every(v=>Number.isFinite(v)&&v>0)&&y.seasonStartYears.every((v,i,a)=>Number.isInteger(v)&&(i===0||v===a[i-1]+1));
}
function productionRiskCode(seasonalScore,elevationM,inCyprus,profile='general'){
 if(inCyprus&&Number.isFinite(elevationM)){
  // Cyprus-specific published siting envelope, not a worldwide lethal elevation.
  if(elevationM>CYPRUS_PROFILES[profile].upperM||(CYPRUS_PROFILES[profile].exclusiveUpper&&elevationM===CYPRUS_PROFILES[profile].upperM))return 2;
 }
 if(Number.isFinite(seasonalScore)&&seasonalScore<40)return 2;
 if(inCyprus&&Number.isFinite(elevationM)&&elevationM>300)return 1; // Actual cold-wind exposure/shelter is unmeasured.
 if(Number.isFinite(seasonalScore)&&seasonalScore<80)return 1;
 return 0; // Favorable seasonal averages cannot establish reliable production.
}
function cyprusTerrainAt(lat,lng){
 const p=embeddedTerrainDetail,g=p.grid,x=Math.floor((lng-g.west)/g.dx),y=Math.floor((g.north-lat)/g.dy);
 if(x<0||y<0||x>=g.width||y>=g.height)return null;
 const i=y*g.width+x,v=p.planes[p.fields.findIndex(f=>f.id==='elevationM')][i];
 if(v===-32768)return null;return {elevationM:v,index:i};
}
function reviewPointDistanceKm(a,b){
 const rad=Math.PI/180,dlat=(a[0]-b[0])*rad,dlon=(a[1]-b[1])*rad;
 return 12742*Math.asin(Math.min(1,Math.sqrt(Math.sin(dlat/2)**2+Math.cos(a[0]*rad)*Math.cos(b[0]*rad)*Math.sin(dlon/2)**2)));
}
function assessProductionAt(lat,lng,m,profile='general',waterAvailable=false){
 if(!m.land)return {status:'water',label:'Open water',reason:'No terrestrial production assessment.',annualReliabilityEstablished:false};
 const terrain=cyprusTerrainAt(lat,lng),cyprus=Boolean(terrain),elevationM=terrain?.elevationM;
 const series=[...orchardEvidence.sites.filter(s=>s.eligible),...cyprusEvidence.orchards.filter(s=>s.coordinateKind==='orchard')].find(s=>harvestSeriesQualifies(s)&&(!cyprus||profile==='general'||s.yieldSeries.cultivar.toLowerCase()===profile)&&reviewPointDistanceKm([lat,lng],[s.lat,s.lng])<=.05);
 if(series){
  const needsWater=series.waterScenario==='irrigated'&&!waterAvailable;
  return {status:needsWater?'conditional':'annual_harvests',label:needsWater?'Annual harvests observed · irrigation required':'Consecutive annual harvests observed',reason:`${series.name}: ${series.yieldSeries.values.length} reported crop seasons. ${needsWater?'Irrigated evidence does not establish rainfed performance.':'The record applies to this study point and its recorded management.'} Future annual reliability and nearby land remain unverified.`,series,cyprus,elevationM,annualReliabilityEstablished:false};
 }
 const code=productionRiskCode(m.score,elevationM,cyprus,profile);
 let reason='No qualifying consecutive annual harvest series is available at this coordinate. Favorable seasonal climate does not establish dependable edible-olive production.';
 if(cyprus&&(elevationM>CYPRUS_PROFILES[profile].upperM||(CYPRUS_PROFILES[profile].exclusiveUpper&&elevationM===CYPRUS_PROFILES[profile].upperM)))reason=`Source DEM elevation ${Math.round(elevationM)} m falls outside the Cyprus handbook’s ${profile==='koroneiki'?'below ':''}${CYPRUS_PROFILES[profile].upperM} m siting guidance for ${CYPRUS_PROFILES[profile].label.toLowerCase()}. This is a commercial planting risk flag, not a claim that every tree dies above this contour.`;
 else if(cyprus&&elevationM>300&&code===1)reason='Cyprus guidance permits up to 1,000 m only on sheltered eastern/southern exposures, but advises against cold-wind-exposed northern sites above 300 m. Actual shelter, orchard frost frequency and annual harvests have not been established here. Cultivation documented at 800–900 m does not validate every slope.';
 else if(code===2)reason='The seasonal climate screen already identifies a major constraint. No local annual harvest series resolves it at this coordinate.';
 else if(code===1)reason='The seasonal climate screen identifies constraints; reliable annual harvests have not been demonstrated at this coordinate.';
 return {status:['unverified','conditional','high_risk'][code],label:['Annual production unverified','Conditional · local site evidence needed','Commercial planting risk flagged'][code],reason,cyprus,elevationM,annualReliabilityEstablished:false};
}
