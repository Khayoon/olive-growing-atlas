// Climate compatibility, not a calibrated probability of reliable olive yield.
// Native CHELSA terrain-aware temperatures replace coarse overview temperatures.
// Chilling is not inferred from a quarter mean: cultivar flower induction remains unassessed.
function scoreOliveTerrain(c,irrigated=true){
 const baseline=scoreOliveClimate(c,irrigated),v=baseline.components;
 let score=.25*v.cold+.30*v.summer+.10*v.heat+.15*v.wet+.12*v.water+.08*v.frost;
 const thermalCap=1.35*Math.min(v.cold,v.summer,v.heat);
 score=Math.min(score,thermalCap);
 if(!irrigated)score=Math.min(score,v.water);
 if(v.wet<90)score=Math.min(score,79,v.wet);
 if(Number.isFinite(v.extreme))score=Math.min(score,v.extreme);
 let tailCap=100;
 if(c.freezeYears>=30){
  if(c.freezeYears12>0)tailCap=59;
  if(c.freezeYears7/c.freezeYears>=.2)tailCap=Math.min(tailCap,79);
  if(c.freezeYears10/c.freezeYears>=.2)tailCap=39;
 }score=Math.round(Math.max(0,Math.min(100,score,tailCap)));
 const active=['cold','summer','heat','wet','water','frost',...(Number.isFinite(v.extreme)?['extreme']:[])];
 let limiting=active.reduce((a,b)=>v[a]<v[b]?a:b);
 if(thermalCap<100&&score===Math.round(thermalCap))limiting=['cold','summer','heat'].reduce((a,b)=>v[a]<v[b]?a:b);
 if(!irrigated&&score===Math.round(v.water))limiting='water';
 if(v.wet<90&&score===Math.round(Math.min(79,v.wet)))limiting='wet';
 if(Number.isFinite(v.extreme)&&score===Math.round(v.extreme))limiting='extreme';
 if(tailCap<100&&score===tailCap)limiting='freezeTail';
 const labels={cold:c.bio06>12?'Warm-winter temperature pattern · flowering unassessed':'Cold-winter / highland temperature constraint',summer:'Limited summer warmth / seasonal heat constraint',heat:'Summer temperature constraint',wet:'Wet warm season · disease-management pressure',water:irrigated?'Water balance · irrigation assumed':'Low rainfall · irrigation required',frost:'Frequent freeze–thaw transitions',extreme:'Regional annual-extreme freeze constraint',freezeTail:'Severe or recurrent historical freeze exposure'};
 let cultivar='Use locally proven edible cultivars and pollination partners. Flower induction and dependable annual yield require local cultivar evidence.';
 if(c.bio11>11)cultivar='Warm winter: use locally proven low-chill edible cultivars. Hourly chilling and warm interruptions have not been modelled; a quarter mean cannot prove flowering failure or success.';
 if(v.cold<60||tailCap<80)cultivar='Cold-exposed site: locally tested edible cultivars in small trials only. Altitude is not a universal cutoff; use actual local cold records and harvest evidence.';
 return {score,components:v,limiting,factor:score>=80?'Compatible included seasonal climate metrics':labels[limiting],cultivar,
  assessmentScope:baseline.freezeAssessed?'seasonal_climate_with_regional_freeze':'seasonal_climate_only',
  freezeAssessed:baseline.freezeAssessed,freezeMean:baseline.freezeMean,freezeMeanSource:baseline.freezeMeanSource,tailCap,
  floweringAssessed:false,reliableYieldAssessed:false,tier:score>=80?'prime':score>=40?'marginal':'bad'};
}
