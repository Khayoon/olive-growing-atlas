# Olea · Olive Climate Potential v8

[Open the live map](https://khayoon.github.io/olive-growing-atlas/)

A continuous climatic screening model for cultivated edible olives, with Arbequina, Leccino and Frantoio profiles and rainfed/irrigation-assumed scenarios. This is **not a map of verified reliable harvests or sustainable irrigation resources**. Orchard locations never add score points.

## The Sahara correction

Version7 could classify a hot desert climate as favorable because good winter/dry-season conditions compensated for constrained summer and heat responses. It also assumed adequate usable irrigation. That assumption did not establish water availability, water quality, salt disposal, drainage or sustainable withdrawals.

Version8 changes two things globally:

- The final climate score cannot exceed either the summer or heat response. Their existing numerical curves remain explicit planning choices, not calibrated yield-loss percentages. Adequate irrigation cannot cancel physiological heat stress.
- Irrigation-assumed cells scoring at least40 with annual CHELSA rainfall below200mm receive muted amber/neutral color and diagonal stripes. **This is a separate resource-dependence display flag, not a numeric score penalty or inferred groundwater/salinity dataset.** The identical rule applies to Sahara, Huasco, Negev and other regions. Low climate scores remain red. Under200mm is a literal rainfall threshold, not a full aridity-index classification.

Examples at the same overview cells:

| Location | v7 climate score | v8 climate score | Resource flag |
|---|---:|---:|---|
| El Oued |81|60|Striped|
| Kufra |90|76|Striped|
| Siwa |94|86|Striped|
| Huasco |88|88|Striped|
| Negev, Revivim control |99|99|Striped|

These are relative planning indices, **not percentages of reliable annual yield**. Climatically favorable desert sites remain possible when sufficient usable water exists; the striping prevents them being presented as uniformly proven production zones.

## Evidence and limits

Five successive harvests in the northern Algerian Sahara demonstrate actual edible-olive production under intensive irrigation, mostly using local/table cultivars. Measured Negev Arbequina production also prevents a blanket desert exclusion. Conversely, experiments show heat can reduce fruit/oil performance despite irrigation, and Siwa/Negev records document salinity and sustainability concerns. Water-resource properties cannot be inferred from rainfall or manufactured from the existence of an orchard paper.

The changes were checked at23 regional/control points and against all23 existing native orchard controls; their prior broad suitability tiers were preserved. Huasco, Negev, Aimogasta and Córdoba control scores remain unchanged. These are **development/regression checks**, not new independent global reliability validation.

Freeze and chilling inputs/methods are retained fromv7: annual minimum distributions1991–2025; local weather residuals and an error distribution; native CHELSA winter temperatures; published cultivar-specific DMA responses; a weather/chilling pipeline checked against45 stations and919 complete modeled daily-weather seasons. Earlier geographic Brier metrics remain component-level weather/chilling tests, not validations of v8 yield reliability. Cyprus retains its local official commercial-siting guidance above1,000m, without exporting that altitude threshold worldwide.

Huasco's higher-chill cultivars remain underestimated. Hawaii's occasional low-chill fruiting still challenges transfer. Peru's Sevillana requirement is unverified. Soil, bloom-stage heat/frost, pollination, disease-control success, water access and farm economics remain unresolved. Conditional sites can produce commercially with appropriate management.

## Sources and reproducibility

- [Current model](PRODUCTION_MODEL.js), [parameters](PRODUCTION_CALIBRATION.json), [protocol](PRODUCTION_PROTOCOL.json), [current results](PRODUCTION_VALIDATION.json).
- [Desert orchard, water and salinity records](DESERT_PRODUCTION_REVIEW.json), [experimental heat evidence](DESERT_HEAT_REVIEW.json), [frozen v7 numeric audit](DESERT_MODEL_AUDIT_V7.json), [v8 regression results](DESERT_V8_REGRESSION.json).
- [Chilling geographic tests](STATION_CHILLING_VALIDATION.json), [freeze observations/QC](STATION_FREEZE_RECORDS.json), [freeze geographic tests](STATION_FREEZE_VALIDATION.json).
- [Huasco/Peru/Hawaii records](WARM_COAST_RECORDS.json), [South American checks](SOUTH_AMERICA_CHECKS.json), [orchard audit](ORCHARD_OUTCOME_AUDIT.json).
- [Original climate manifest](DATA_SOURCES.json), [native sources](NATIVE_CLIMATE_SOURCES.json), [geometry](GEOMETRY_SOURCES.json).

`index.html` embeds the model, global overview, native Cyprus climate, land/lake geometry, Leaflet and GeoTIFF.js. No API key or local GeoJSON is required. Background tiles and other native climate windows need public-network access. CHELSA normals1981–2010 areCC0; ERA5-EX annualTNn1991–2025 isCC BY4.0. Weather sources include NOAA, INIA and Cyprus Meteorology. The original source climate planes are preserved. Older report files are historical, not current validation claims.
