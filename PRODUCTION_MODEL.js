// Relative cultivated-olive production potential. Study presence never enters this function.
// DMA monthly-normal screen is modeled, not an observed chill or yield probability.
const PRODUCTION_CULTIVARS={Arbequina:{requirementCU:339,breakpointC:21.7,warmRate:-.50},Leccino:{requirementCU:612,breakpointC:20.7,warmRate:-.56},Frantoio:{requirementCU:671,breakpointC:20.7,warmRate:-.56}};
const PRODUCTION_QUANTILES=[0,.05,.1,.2,.35,.5,.7,.9,1];
const normalChillTables=new Map();
function localMonthlyWeather(c){
 if(c.chillWeather)return c.chillWeather;
 const config=CHILL_CALIBRATION.weather?.[c.nativeMonthlyDetail?'native':'coarse'];
 const lat=c.latitude??c.cell?.lat,lng=c.longitude??c.cell?.lng,north=lat>=0,months=north?[9,10,11,0,1,2,3]:[3,4,5,6,7,8,9];
 const low=months.map(m=>c['tasmin'+String(m+1).padStart(2,'0')]),high=months.map(m=>c['tasmax'+String(m+1).padStart(2,'0')]);
 const out={minC:Array(12).fill(0),maxC:Array(12).fill(0),support:0,shortRecordSupport:0};
 if(!config||!Number.isFinite(lat)||!Number.isFinite(lng)||low.concat(high).some(v=>!Number.isFinite(v)))return c.chillWeather=out;
 const sourceMin=Math.min(...low),sourceMean=low.concat(high).reduce((a,b)=>a+b,0)/14,rad=Math.PI/180,near=[];
 for(const s of config.nodes){
  if(Math.abs(lat-s.lat)>4.51)continue;
  const a=Math.sin((lat-s.lat)*rad/2),b=Math.sin((lng-s.lng)*rad/2),d=12742*Math.asin(Math.min(1,Math.sqrt(a*a+Math.cos(lat*rad)*Math.cos(s.lat*rad)*b*b)));
  if(d>config.maximumKm)continue;
  const w=Math.exp(-.5*(d/config.radiusKm)**2-.5*((sourceMin-s.winterMinC)/config.winterMinScaleC)**2-.5*((sourceMean-s.winterMeanC)/config.winterMeanScaleC)**2);
  near.push({s,w});
 }
 for(const m of months){let total=0,short=0,a=0,b=0;for(const {s,w:base} of near){const w=base*s.monthWeights[m];if(!w)continue;total+=w;if(!s.primary)short+=w;a+=w*s.residualMinC[m];b+=w*s.residualMaxC[m];}
  const shrink=1-Math.exp(-total);out.minC[m]=total?a/total*shrink:0;out.maxC[m]=total?b/total*shrink:0;out.support+=total/7;out.shortRecordSupport+=short/7;
 }
 return c.chillWeather=out;
}
const freezeResponseTable=new Float32Array(1301);
for(let i=0;i<freezeResponseTable.length;i++){
 const t=-80+i*.1;let value=0;
 for(const e of FREEZE_CALIBRATION.errorNodesC)value+=oliveCurve(t+e,[[-18,0],[-12,5],[-10,25],[-7,65],[-5,88],[-3,100],[60,100]]);
 freezeResponseTable[i]=value/FREEZE_CALIBRATION.errorNodesC.length;
}
function expectedFreezeResponse(t){const x=Math.max(0,Math.min(1299.999,(t+80)*10)),i=Math.floor(x);return freezeResponseTable[i]+(freezeResponseTable[i+1]-freezeResponseTable[i])*(x-i);}
function localFreezeCorrection(c){
 const lat=c.latitude??c.cell?.lat,lng=c.longitude??c.cell?.lng;if(!Number.isFinite(lat)||!Number.isFinite(lng))return {correctionC:0,support:0,nearestKm:null};
 let total=0,bias=0,nearest=Infinity;const rad=Math.PI/180;
 for(const s of FREEZE_CALIBRATION.stations){
  if(Math.abs(lat-s.lat)>4.51)continue;
  const a=Math.sin((lat-s.lat)*rad/2),b=Math.sin((lng-s.lng)*rad/2),d=12742*Math.asin(Math.min(1,Math.sqrt(a*a+Math.cos(lat*rad)*Math.cos(s.lat*rad)*b*b)));
  nearest=Math.min(nearest,d);if(d>500)continue;
  const w=Math.exp(-.5*(d/500)**2-.5*((c.bio06-s.nativeBio06)/3)**2);
  total+=w;bias+=w*s.meanResidualC;
 }
 return {correctionC:total?bias/total*(1-Math.exp(-total)):0,support:total,nearestKm:Number.isFinite(nearest)?nearest:null};
}
function normalChillDay(low,high,rise,cultivar='Arbequina'){
 const profile=PRODUCTION_CULTIVARS[cultivar],key=rise+':'+profile.breakpointC;let table=normalChillTables.get(key);
 if(!table){
  const n=181;table={n,net:new Float32Array(n*n),floor:new Float32Array(n*n),peak:new Float32Array(n*n),gain:new Float32Array(n*n)};
  for(let a=0;a<n;a++)for(let b=a;b<n;b++){
   const lo=-35+a*.5,hi=-35+b*.5;let net=0,floor=0,peak=0,gain=0;
   for(let j=0;j<24;j++){
    const hour=j+.5,up=hour>=rise&&hour<=14,f=up?(hour-rise)/(14-rise):hour<rise?(hour+10)/(10+rise):(hour-14)/(10+rise);
    const t=(hi+lo)/2+(up?-1:1)*(hi-lo)/2*Math.cos(Math.PI*f);
    const u=t<=0?0:t<=7.3?t/7.3:t<=profile.breakpointC?1-(t-7.3)*(1-profile.warmRate)/(profile.breakpointC-7.3):profile.warmRate;
    net+=u;floor=Math.min(floor,net);peak=Math.max(peak,net);gain=Math.max(gain,net-floor);
   }
   const i=a*n+b;table.net[i]=net;table.floor[i]=net-floor;table.peak[i]=peak;table.gain[i]=gain;
  }normalChillTables.set(key,table);
 }
 const a=Math.max(0,Math.min(180,Math.round((low+35)*2))),b=Math.max(a,Math.min(180,Math.round((high+35)*2))),i=a*table.n+b;
 return {net:table.net[i],floor:table.floor[i],peak:table.peak[i],gain:table.gain[i]};
}
function normalOliveChill(c,cultivar='Arbequina',weatherAdjusted=true){
 const response=PRODUCTION_CULTIVARS[cultivar].breakpointC+':'+weatherAdjusted;
 c.normalChillByResponse??={};if(Number.isFinite(c.normalChillByResponse[response]))return c.normalChillByResponse[response];
 const lat=c.latitude??c.cell?.lat??0,north=lat>=0,start=north?9:3,days=[31,28,31,30,31,30,31,31,30,31,30,31];
 const dmin=c.nativeDetail&&!c.nativeMonthlyDetail?c.bio06-c.overviewBio06:0;
 const dmax=c.nativeDetail&&!c.nativeMonthlyDetail?2*(c.bio11-c.overviewBio11)-dmin:0;
 const weather=weatherAdjusted?localMonthlyWeather(c):{minC:Array(12).fill(0),maxC:Array(12).fill(0)};
 let accumulation=0,maximum=0;
 for(let j=0;j<7;j++){
  const m=(start+j)%12,low=c['tasmin'+String(m+1).padStart(2,'0')],high=c['tasmax'+String(m+1).padStart(2,'0')];
  if(!Number.isFinite(low)||!Number.isFinite(high))return null;
  const doy=[15,46,74,105,135,166,196,227,258,288,319,349][m],dec=.409*Math.sin(2*Math.PI*doy/365-1.39);
  const arg=Math.max(-1,Math.min(1,-Math.tan(Math.max(-65,Math.min(65,lat))*Math.PI/180)*Math.tan(dec)));
  const rise=Math.max(4,Math.min(10,Math.round((12-Math.acos(arg)*12/Math.PI)*2)/2));
  let lo=low+dmin+weather.minC[m],hi=high+dmax+weather.maxC[m];if(lo>hi)lo=hi=(lo+hi)/2;
  const d=normalChillDay(lo,hi,rise,cultivar);
  // Exact repeated-day recurrence for the quantized normal-day temperature profile.
  for(let k=0;k<days[m];k++){maximum=Math.max(maximum,accumulation+d.peak,d.gain);accumulation=Math.max(d.floor,accumulation+d.net);}
 }
 c.normalChillByResponse[response]=Math.round(maximum);return c.normalChillByResponse[response];
}
function correctedOliveFreeze(c){
 if(c.productionFreeze)return c.productionFreeze;
 const raw=PRODUCTION_QUANTILES.map((_,i)=>c['tnnQ'+i]);
 if(raw.some(v=>!Number.isFinite(v)))return null;
 const mean=Number.isFinite(c.globalExtremeMeanC)?c.globalExtremeMeanC:raw[5],local=localFreezeCorrection(c),correction=local.correctionC;
 const adjusted=raw.map(t=>t+correction);
 const response=t=>oliveCurve(t,[[-18,0],[-12,5],[-10,25],[-7,65],[-5,88],[-3,100],[20,100]]);
 let meanResponse=0;for(let i=1;i<adjusted.length;i++)meanResponse+=(PRODUCTION_QUANTILES[i]-PRODUCTION_QUANTILES[i-1])*(expectedFreezeResponse(adjusted[i])+expectedFreezeResponse(adjusted[i-1]))/2;
 // Repeated crops need recovery after structural damage; an isolated extreme matters.
 const terrainConflict=mean+correction>c.bio06+1;
 // Grossly inconsistent climate supports cannot certify a favorable freeze regime.
 // This is an uncertainty cap, not an invented elevation-adjusted temperature.
 const score=Math.max(0,Math.min(100,terrainConflict?59:100,100-2*(100-meanResponse),response(adjusted[0])+40));
 return c.productionFreeze={score,terrainConflict,correctionC:correction,adjustedMeanC:mean+correction,adjustedWorstC:adjusted[0],adjustedDecileC:adjusted[2],rawMeanC:mean,quantiles:adjusted,support:local.support,nearestStationKm:local.nearestKm};
}
function scoreOliveProduction(c,irrigated=false,cultivar='Arbequina'){
 const seasonal=irrigated?(c.terrainIrrigated??=scoreOliveTerrain(c,true)):(c.terrainRainfed??=scoreOliveTerrain(c,false)),v={...seasonal.components},freeze=correctedOliveFreeze(c),cu=normalOliveChill(c,cultivar);
 // A normal-year screen cannot establish annual flowering. Its low end is a trial
 // category, rather than a claim that a living tree cannot occasionally fruit.
 const requirement=PRODUCTION_CULTIVARS[cultivar].requirementCU;
 const chillFit=c.nativeMonthlyDetail&&CHILL_CALIBRATION.native?CHILL_CALIBRATION.native:CHILL_CALIBRATION;
 const chillAttainment=Number.isFinite(cu)?1/(1+Math.exp(-(chillFit.intercept+chillFit.slope*Math.log1p(cu/requirement)))):null;
 v.chill=chillAttainment===null?100:20+80*chillAttainment;
 v.freeze=freeze?.score??100;
 // A wet warm quarter alone misses climates with no relatively dry season.
 // BIO17 is a verified three-month TOTAL. This planning response expresses
 // management burden, not fitted infection odds or observed crop-loss rates.
 v.drySeason=Number.isFinite(c.bio17)?oliveCurve(c.bio17,[[0,100],[75,100],[150,85],[225,75],[300,65],[450,50],[600,30],[900,5]]):100;
 v.wet=Math.min(v.wet,v.drySeason);
 let score=Math.min(seasonal.score,v.chill,v.freeze);
 // The old seasonal score used an uncalibrated mean/tail cap. Replace those caps
 // here with the calibrated annual-minimum distribution, retaining other stresses.
 let climate=.25*v.cold+.30*v.summer+.10*v.heat+.15*v.wet+.12*v.water+.08*v.frost;
 climate=Math.min(climate,1.35*Math.min(v.cold,v.summer,v.heat));
 if(!irrigated)climate=Math.min(climate,v.water);if(v.wet<90)climate=Math.min(climate,79,v.wet);
 // Reproductive/fruit-development heat stress cannot be offset by favorable
 // winter temperatures, dry air or an assumed water supply. These remain
 // planning response curves, not measured crop-loss probabilities.
 score=Math.round(Math.max(0,Math.min(100,climate,v.chill,v.freeze,v.heat,v.summer)));
 const irrigationResourceDependence=irrigated&&Number.isFinite(c.bio12)&&c.bio12<200;
 const cyprusSiting=c.inCyprus&&Number.isFinite(c.elevationM)&&c.elevationM>1000;
 if(cyprusSiting)score=Math.min(score,39); // Local official commercial-siting envelope, not a global altitude threshold.
 const limiting=score===Math.round(v.freeze)&&freeze?'freeze':score===Math.round(v.chill)&&Number.isFinite(cu)?'chill':Object.keys(v).filter(k=>['cold','summer','heat','wet','water','frost'].includes(k)).reduce((a,b)=>v[a]<v[b]?a:b);
 const labels={freeze:'Damaging freeze exposure · station-calibrated distribution',chill:'Cultivar flowering / winter-chill limitation',cold:'Cold seasonal climate / upland exposure',summer:c.bio10>27?'Hot warm quarter · fruit / oil development constraint':'Seasonal warmth / ripening constraint',heat:'Chronic summer heat · warmest-month mean highs',wet:v.drySeason<90?'Limited dry season · fungal-management burden':'Warm-season wetness / disease pressure',water:'Rainfall deficit · irrigation changes potential',frost:'Repeated freeze–thaw exposure'};
 return {...seasonal,score,tier:score>=80?'prime':score>=40?'marginal':'bad',components:v,limiting,factor:cyprusSiting?'Outside Cyprus commercial siting guidance · above 1,000 m':limiting==='freeze'&&freeze?.terrainConflict?'Unresolved regional freeze / terrain temperature conflict':score>=80?(irrigationResourceDependence?'Favorable modeled climate · exceptionally irrigation-dependent':'Favorable modeled climate conditions'):labels[limiting],normalChillCU:cu,chillAttainment,cultivarProfile:cultivar,chillRequirementCU:requirement,freezeProduction:freeze,freezeAssessed:!!freeze,reliableYieldAssessed:false,irrigationResourceDependence,waterResourceFeasibilityAssessed:false,
 cultivar:`${cultivar}: published DMA requirement ${requirement} CU, ${PRODUCTION_CULTIVARS[cultivar].breakpointC}°C warm-response breakpoint. This score is cultivar-specific; Sevillana/Criolla are not assigned Arbequina's requirement. Verify pollination, drainage and local orchard experience.`,
  assessmentScope:'continuous_production_potential',confidence:!freeze?'Low · freeze history missing':freeze.terrainConflict?'Low · regional freeze / terrain temperature conflict':!Number.isFinite(cu)?'Low · winter-temperature inputs missing':Math.abs(freeze.correctionC)>6?'Low · large climate correction':freeze.support<.1?'Limited · little local station support':c.nativeDetail&&c.nativeMonthlyDetail?'Moderate · native climate, regional freeze estimate':'Limited · regional climate overview'};
}
