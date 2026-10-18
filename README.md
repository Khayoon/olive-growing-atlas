# Olea · Olive Growing Atlas v6

[Open the live map](https://khayoon.github.io/olive-growing-atlas/)

The default view is a **continuous global production-potential model** for cultivated edible oil/table olives. Study locations never determine the surface color. Choose Arbequina, Leccino or Frantoio and a rainfed/irrigated scenario; inspect any land coordinate.

## What changed

- Global freeze hazard uses 1991–2025 annual minima, local station residuals and an observed weather-error distribution. Local corrections shrink to zero outside supporting weather records.
- 49 calibration stations provide 1,235 matched station-years in 8 geographic folds; Prodromos is a separate Cyprus development supplement. Broad worldwide temperature offsets failed transfer criteria and were rejected.
- The deployed 9-quantile hazard approximation reduced geographic-holdout mean Brier score from 0.08166 to 0.06990, about 14.4%. This measures **weather events**, not olive crop losses. Approximation mean probability difference from exact-series integration: 0.0032.
- Cultivar-specific DMA requirements of 339/612/671 CU are screened with monthly Tmin/Tmax, then calibrated against 45 daily-weather stations and 919 complete seasons. Geographic-holdout modeled-attainment Brier score: 0.05582→0.03932. These are modeled requirement outcomes, not observed flowering.
- Zoomed climate uses native CHELSA seasonal fields and monthly winter Tmin/Tmax. The detailed Cyprus climate, winter temperatures and elevation are embedded for offline use. Regional freeze history remains coarser.
- Actual orchard outcomes include 26 records, 23 eligible sites and 17 studies; 13 records in 9 study clusters were held out before extracting new scores. The primary outcome check uses 9 of those records in 6 clusters, with one contradiction: **Huasco, Chile**, whose measured production the chilling screen underestimates. This is published openly; no coordinate boost hides it.
- Troodos terrain above 1,000 m retains Cyprus's official commercial siting guidance. This is not a global elevation rule.

## Interpretation

80–100 = favorable modeled potential; 40–79 = conditional/management dependent; 0–39 = low modeled potential. The index is **not a percentage of reliable annual yield**. Confidence is separate from suitability. No unstudied area is gray merely because no paper was found.

The model combines thermal, water, wet-season disease and freeze constraints. Freeze injury curves/recovery weighting remain explicit screening choices. Rare freeze duration, deacclimation, spring frost, bloom heat, soil drainage, pollination, alternate bearing, disease-control outcomes and irrigation feasibility remain unresolved. The standard DMA response can underestimate production by low-chill cultivars in some warm coastal climates; Hawaii's documented fruiting and Huasco's harvests remain in the source audit.

## Reproducibility and provenance

- [Production model](PRODUCTION_MODEL.js), [parameters](PRODUCTION_CALIBRATION.json), [protocol](PRODUCTION_PROTOCOL.json), [current results](PRODUCTION_VALIDATION.json).
- [Freeze annual pairs/QC/sources](STATION_FREEZE_RECORDS.json), [all hazard candidates and folds](STATION_FREEZE_VALIDATION.json).
- [Chilling calibration](STATION_CHILLING_VALIDATION.json), [orchard outcomes and primary citations](ORCHARD_OUTCOME_AUDIT.json).
- [Original source manifest](DATA_SOURCES.json), [native climate sources](NATIVE_CLIMATE_SOURCES.json), [geometry](GEOMETRY_SOURCES.json).

`index.html` contains HTML/CSS/JavaScript, Leaflet, GeoTIFF.js, global climate and freeze summaries, a land/lake mask, cultivar models and controls. No API key or local GeoJSON file is required. Background tiles and native detail outside the embedded Cyprus window require public-network access. Source normals: CHELSA 1981–2010 (CC0); annual TNn: ERA5-EX 1991–2025 (CC BY 4.0); station observations: NOAA GHCN-Daily and Cyprus Department of Meteorology. Older v3–v5 records remain archived and are not current validation claims.

A physical-consistency guard caps the production index at 59 and reports low confidence where the estimated regional mean annual extreme low is more than 1°C warmer than the terrain coldest-month mean low. This flags unresolved weather support without fabricating local freeze temperatures.
