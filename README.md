# Olea · Olive Growing Atlas v7

[Open the live map](https://khayoon.github.io/olive-growing-atlas/)

A single-file interactive Leaflet application for cultivated edible olives. Its continuous surface uses climate and weather inputs across covered land. Orchard locations never add score points. Select Arbequina, Leccino or Frantoio, choose rainfed or irrigated conditions, and inspect any coordinate.

## This update

- **Cultivar response:** Arbequina uses the published warm-winter DMA response: optimum 7.3°C, breakpoint 21.7°C, warm rate −0.50 and 339 CU requirement. Leccino and Frantoio retain the original 20.7°C/−0.56 response with 612/671 CU requirements. These are flowering requirements, not freeze-hardiness ratings.
- **Local weather:** Monthly temperature residuals from 44 matched-period station normals and 2 explicitly short development records adjust winter inputs using the same fixed 250 km Gaussian, 500 km maximum distance, climate similarity and coverage weights everywhere. Corrections shrink toward zero without support. Native and overview inputs have separate refitted chilling mappings.
- **Huasco:** Four complete INIA winters produce 1,025–1,452 modeled standard chilling units, exposing a large discrepancy from gridded monthly normals. The generic update raises the native orchard Arbequina score to 88 with irrigation; rainfed remains 4. It does not fully resolve the underestimated Leccino/Frantoio response. The 2014/15/24/25 station record is not presented as a 1981–2010 normal or trial-period weather.
- **Wet coasts:** Driest-quarter rainfall now constrains climates lacking a dry window, alongside warm-quarter wetness. BIO17 quarterly totals exactly match independent monthly-precipitation sums at 32 native controls. The response is an explicit management-planning curve, not a disease or yield-loss probability.
- **South America:** Las Brujas/Salto Grande score 72/75; La Plata 79. Coronel Dorrego remains 93–94, consistent with established commercial production and a different rainfall regime. Western irrigated valleys retain their terrain detail; their rainfed water deficit remains meaningful.
- **Display:** Only 80–100 is green; 40–79 stays amber. Water management is always visible, so irrigated western orchards can be compared with irrigated potential.

## Validation and remaining limits

Whole geographic regions are removed from both weather correction and chilling-fit training before testing. At 45 stations and 919 complete reconstructed daily-weather seasons, local weather correction improves modeled DMA-attainment Brier score from 0.03737 to 0.03698 for the overview and 0.03738 to 0.03658 for native inputs. This modest improvement measures modeled chilling attainment, not observed flowering or reliable annual yield. The same development folds were used for selection; results are not an independent final test. Every fold and regression is retained in the public report.

The prior global freeze model remains: 1991–2025 annual minimum distributions, local station residuals and a station-derived error distribution. Its 49 calibration stations provide 1,235 matched station-years; Prodromos is a separate development supplement. The deployed 9-quantile approximation improves held-region freeze-event Brier score 0.08166→0.06990. This measures temperature events, not crop losses. A physical-consistency guard flags unresolved regional freeze/terrain conflicts. Cyprus retains its documented local commercial-siting guidance above 1,000 m; that altitude threshold is not exported worldwide.

**Hawaii remains unresolved:** sparse historical station records corroborate cooler minima, but the DMA screen still misses documented occasional low-chill fruiting. Young-tree yields were low and variable; no prime-production override is applied. **Peru:** official La Yarada monitoring documents Sevillana flowering and harvest, with warm-year constraints. Its cultivar-specific DMA requirement is unverified. A low Arbequina score must not be interpreted as proof that Sevillana cannot produce. These and Huasco are declared development cases.

80–100 means favorable modeled potential; 40–79 means conditional/management dependent; 0–39 means low modeled potential for the selected cultivar and water scenario. Confidence is separate. This index does not establish annual harvest reliability, profitability, irrigation feasibility, drainage, pollination, bloom-stage frost or disease-control success. Real commercial orchards can occur in the conditional tier.

## Data and reproducibility

- [Model](PRODUCTION_MODEL.js), [parameters and weather nodes](PRODUCTION_CALIBRATION.json), [protocol](PRODUCTION_PROTOCOL.json), [current validation](PRODUCTION_VALIDATION.json).
- [Chilling pipeline and every geographic fold](STATION_CHILLING_VALIDATION.json), [freeze records/QC](STATION_FREEZE_RECORDS.json), [freeze geographic tests](STATION_FREEZE_VALIDATION.json).
- [Huasco, Peru and Hawaii primary records](WARM_COAST_RECORDS.json), [La Plata/Uruguay orchard and weather evidence](SOUTH_AMERICA_CHECKS.json), [quarterly-unit verification](DRY_QUARTER_UNITS_CHECK.json), [native dry-quarter samples](ORCHARD_DRY_QUARTER.json).
- [Orchard outcome audit](ORCHARD_OUTCOME_AUDIT.json), [original climate manifest](DATA_SOURCES.json), [native sources](NATIVE_CLIMATE_SOURCES.json), [land/lake geometry](GEOMETRY_SOURCES.json).

`index.html` embeds HTML/CSS/JavaScript, Leaflet, GeoTIFF.js, the global overview, freeze summaries, land/lake mask, cultivar models and native Cyprus climate. No API key or local GeoJSON is required. Background tiles and other native climate windows require public-network access. CHELSA normals are 1981–2010 (CC0); ERA5-EX annual TNn is 1991–2025 (CC BY 4.0). New station inputs use NOAA GHCN-Daily/GSOM and INIA Agrometeorología. Earlier report files remain historical records, not current validation claims.
