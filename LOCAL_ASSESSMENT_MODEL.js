// Point evidence cannot supply a regional bias correction or a yield probability.
// Do not compare chill-hours below 12.5 C with DMA chilling units.
function assessOliveSite(site,cultivar='trial',irrigated=true){
 if(!site)return null;
 const profile=site.cultivarOutcomes[cultivar]||{category:'unknown',label:'Cultivar not assessed at this site',explanation:'No site-specific observation for this cultivar is included. Do not transfer another cultivar’s flowering or frost response.'};
 const waterMismatch=site.waterScenario==='irrigated'&&!irrigated;
 return {category:waterMismatch?'management_unknown':profile.category,
  label:waterMismatch?'Rainfed production untested':profile.label,
  explanation:waterMismatch?'This field trial used irrigation. Its harvest evidence cannot establish rainfed suitability. '+profile.explanation:profile.explanation,
  reliableAnnualYield:'not_established',score:null,
  basis:'Local field and weather observations; no synthetic numerical score',
  freeze:site.freeze||null,chill:site.chill||null};
}
