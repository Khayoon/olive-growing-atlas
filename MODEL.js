// Cultivated Olea europaea subsp. europaea: fruit production, not wild-olive survival.
// CHELSA normals + global ERA5-EX TNn; CONUS PRISM refines mean annual minima.
// Curves are conservative screening choices, not fitted yield or chill-hour models.
const OLIVE_THRESHOLDS={
 cold:[[ -15,0],[-8,5],[-5,25],[-2,55],[0,78],[2,95],[8,100],[12,85],[16,45],[20,0]],
 chill:[[-15,0],[-4,20],[1,75],[5,100],[11,100],[12.5,85],[14,65],[15.5,45],[17,20],[19,0]],
 extreme:[[-18,0],[-12.2,8],[-9.4,35],[-7,65],[-5,82],[-2,100],[5,100]],
 summer:[[8,0],[14,5],[16,22],[18,48],[20,75],[23,96],[27,100],[31,80],[34,40],[38,0]],
 heat:[[12,0],[18,15],[22,55],[26,95],[35,100],[40,65],[45,25],[50,0]],
 wet:[[0,100],[40,100],[80,93],[120,78],[180,58],[250,35],[400,10],[700,0]],
 rh:[[20,100],[65,100],[75,90],[85,65],[95,25],[100,10]],
 rain:[[0,0],[100,8],[200,30],[300,65],[400,90],[600,100],[1100,100],[1600,88],[2400,50],[3500,12],[5000,0]],
 irrigated:[[0,92],[100,96],[300,100],[1100,100],[1600,88],[2400,50],[3500,12],[5000,0]],
 frost:[[0,100],[10,98],[30,88],[60,68],[100,40],[160,12],[220,0]]
};
function oliveCurve(value,points){
 if(value<=points[0][0])return points[0][1];
 for(let i=1;i<points.length;i++)if(value<=points[i][0]){const [a,x]=points[i-1],[b,y]=points[i];return x+(y-x)*(value-a)/(b-a);}
 return points.at(-1)[1];
}
function scoreOliveClimate(c,irrigated=true){
 const t=OLIVE_THRESHOLDS;
 // Monthly source checks establish that BIO18 stores a three-month TOTAL.
 // Divide by 3 before applying the average-month wetness response.
 const components={cold:oliveCurve(c.bio06,t.cold),chill:oliveCurve(c.bio11,t.chill),summer:oliveCurve(c.bio10,t.summer),heat:oliveCurve(c.bio05,t.heat),wet:oliveCurve(c.bio18/3,t.wet)*(.7+.3*oliveCurve(c.hursmean,t.rh)/100),water:oliveCurve(c.bio12,irrigated?t.irrigated:t.rain),frost:oliveCurve(c.fcf,t.frost)};
 const v=components;
 // Missing extremes are unknown, never substituted with monthly averages.
 const freezeMean=Number.isFinite(c.extremeMinC)?c.extremeMinC:c.globalExtremeMeanC;
 if(Number.isFinite(freezeMean))v.extreme=oliveCurve(freezeMean,t.extreme);
 if(!Number.isFinite(freezeMean))return {score:null,components,limiting:'unknown',factor:'Extreme-temperature record missing in this cell',cultivar:'No combined suitability score is assigned without extreme-temperature data. Small islands and narrow coasts may fall outside the source land grid.',freezeAssessed:false,freezeMean:null,freezeMeanSource:null,tailCap:null,tier:'unknown'};
 let score=.2*v.cold+.2*v.chill+.24*v.summer+.1*v.heat+.13*v.wet+.08*v.water+.05*v.frost;
 score=Math.min(score,1.35*Math.min(v.cold,v.chill,v.summer,v.heat));
 if(!irrigated)score=Math.min(score,v.water);
 // Warm-season wetness and warm winters cannot be compensated by a warm summer.
 if(v.wet<90)score=Math.min(score,79,v.wet);
 if(c.bio11>11)score=Math.min(score,v.chill);
 if(Number.isFinite(v.extreme))score=Math.min(score,v.extreme);
 // Historical exposure caps are explicit planning choices, not fitted crop-death odds.
 // A rare severe freeze can destroy several crops even if the mean winter is mild.
 let tailCap=100,tailFactor='';
 if(c.freezeYears>=30){
  if(c.freezeYears12>0){tailCap=59;tailFactor='Severe historical freeze exposure · 1991–2025';}
  if(c.freezeYears7/c.freezeYears>=.2&&tailCap>79){tailCap=79;tailFactor='Recurrent damaging-freeze exposure · 1991–2025';}
  if(c.freezeYears10/c.freezeYears>=.2){tailCap=39;tailFactor='Recurrent severe-freeze exposure · 1991–2025';}
  score=Math.min(score,tailCap);
 }
 score=Math.round(Math.max(0,Math.min(100,score)));
 const labels={cold:c.bio06>12?'Warm-winter flowering / chilling constraint':'Cold-winter constraint · monthly mean lows',chill:'Warm-winter flowering / chilling constraint',summer:c.bio10>27?'Excess summer heat / high seasonal heat load':'Insufficient summer warmth for reliable fruiting',heat:'Summer heat stress',wet:'Wet warm season · fungal-management pressure',water:irrigated?'Water balance · irrigation assumed':'Insufficient rain · irrigation required',frost:'Frequent freeze–thaw exposure',extreme:'Damaging winter freeze risk · annual extreme minima'};
 let limiting=Object.keys(v).reduce((a,b)=>v[a]<v[b]?a:b);
 // Report a binding cap, even when a different raw component is slightly lower.
 if(v.wet<90&&score===Math.round(Math.min(79,v.wet)))limiting='wet';
 if(c.bio11>11&&score===Math.round(v.chill))limiting='chill';
 if(Number.isFinite(v.extreme)&&score===Math.round(v.extreme))limiting='extreme';
 if(tailCap<100&&score===tailCap)limiting='freezeTail';
 const factor=limiting==='freezeTail'?tailFactor:score>=80&&v[limiting]>=78?'Favorable included climate metrics':labels[limiting];
 let cultivar='Locally proven oil or table cultivars; verify pollination partners and nursery provenance.';
 if(v.cold<75||v.frost<65||v.extreme<80||tailCap<80)cultivar='Locally proven fruiting cultivars in small trials only; even cold-tolerant edible olives can lose their canopy and several crops in a hard freeze.';
 else if(c.bio11>11)cultivar='Locally tested low-chill edible cultivars only; confirm multi-year flowering and fruit set. A warm-winter average cannot establish vernalization.';
 else if(v.wet<80)cultivar='Locally trialed cultivars with strong drainage, open canopies and disease management.';
 else if(c.bio05>35||c.bio12<350)cultivar='Locally tested heat/drought-adapted Picual, Koroneiki or Mission; reliable irrigation and flowering trials required.';
 if(score<40)cultivar='No reliable fruit-production recommendation from these regional climate normals. A site trial may differ.';
 return {score,components,limiting,factor,cultivar,freezeAssessed:Number.isFinite(freezeMean),freezeMean,freezeMeanSource:Number.isFinite(c.extremeMinC)?'PRISM':'ERA5-EX',tailCap,tier:score>=80?'prime':score>=40?'marginal':'bad'};
}
