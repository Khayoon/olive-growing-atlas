# Olea — cultivated edible-olive climate and orchard atlas

**[Open the interactive map](https://khayoon.github.io/olive-growing-atlas/)**

Version 3.1 adds local weather and cultivar assessments for three documented orchards. The regional grid remains version 3.0. It embeds global annual extreme-temperature history and source-linked edible-olive orchard evidence. The intended crop is **Olea europaea subsp. europaea**, including table and oil cultivars. Wild/African olive distributions and unrelated plants called olive are excluded.

Download `index.html` and open it in a current browser. Leaflet, Natural Earth land, climate values, both water scenarios and all orchard evidence are embedded. No API key, local GeoJSON or server is required. Optional OpenStreetMap background tiles and external source links need a connection. The file is approximately 20 MB and uses browser `DecompressionStream('gzip')`.

## What the map now does

- Global **ERA5-EX annual TNn** supplies actual published annual minima of daily minimum 2 m air temperature, not the average low of a winter month.
- The inspector shows a **1991–2020 mean annual extreme low**, the **coldest annual value and year in 1991–2025**, and counts of years at or below −7°C and −10°C. The historical window includes the 2021 Texas freeze.
- The 2023 PRISM/USDA CONUS dataset remains the finer-resolution annual-extreme mean where available. ERA5-EX supplies global historical exposure. These products can disagree; their values are labeled separately.
- Nine CHELSA 1981–2010 seasonal-climate fields retain temperature, flowering-proxy, heat, wetness and water-supply constraints.
- **Rainfed** and **reliable irrigation** scenarios differ only in water scarcity. Irrigation never removes freeze, flowering, heat or wetness constraints.
- **Orchard evidence** opens actual field studies with cultivars, water regime, measured harvests/failures, annual-reliability qualifiers, model comparisons and primary-source links. Square study markers are independent of illustrative cultivation regions.
- Missing extreme-temperature data produce **no combined score**, not an invented latitude estimate. Small islands and narrow coasts can lack a valid sampled freeze cell; Shodoshima retains its documented cultivation context even where the displayed cell lacks freeze data.

## What the orchard checks establish

25 records were collected from primary studies before inspecting version 3 scores. 22 have usable study coordinates; three vague or conflicting locations are excluded. Eight records with measured multi-year harvests represent **seven distinct climate cells across six studies**. All seven score at least 40 under the documented water regime. This checks broad compatibility with managed fruit production, not a requirement that every productive orchard score 80.

Two precisely located Texas flowering-failure trials and one Italian freeze-damage site all score below 80. Those are three hazard-site flags across two studies, not validation of freeze magnitude or a global failure-class accuracy estimate. Nearby plots sharing a climate cell count once. Short trials, categorical productivity, fruit-quality sampling and cultivar challenges remain separate.

**Local weather and cultivar checks:** gold-ring markers and sidebar shortcuts open Lalamilo, Pedro Abad and Maiolati. Local evidence takes precedence over a standalone regional orchard verdict. Choose the cultivar to see documented fruiting, non-harvest or relative freeze-damage outcomes. Published DMA chilling requirements (Arbequina 339, Leccino 612, Frantoio 671 CU) are explicitly separated from Lalamilo's reported 141/161 hours below 12.5°C. These exposures are not universal cultivar requirements, and no DMA CU are inferred from quarterly means or incomplete daily data.

Local freeze reports are below −9°C at Pedro Abad in 2005 and −6.4°C at Maiolati on 15 February 2012. Regional estimates −4.9°C and −13.9°C remain visible as conflicts. Nearby NOAA daily archives are supplied with QC, coverage, station distances and elevations. Córdoba airport (36 km away) independently records −8.2°C in 2005; it is not the orchard thermometer. Frontone (31.5 km away) cannot substitute for Maiolati. AMAP ST34 is about 0.63 km away, but only metadata were obtained; the study does not identify its station ID.

**This release resolves misleading interpretations, not the underlying regional numerical biases.** There is insufficient directly obtained hourly/on-site history to calibrate a defensible spatial correction or a reliable-yield model. The regional raster and its original discrepancies are unchanged. The local cases receive categorical assessments, not invented 0–100 scores.

The three sites are now development cases. Excluding them leaves six measured-production climate cells (five studies), all scoring at least 40, and two Texas flowering-failure sites (one study), both flagged below 80. These remaining checks are regression comparisons of the existing screen, not fresh independent validation.

The literature sample is small and geographically uneven. This is an externally checked **climate screening model**, not a calibrated probability of reliable annual yield or commercial profitability. Read [the full agronomic review](AGRONOMIC_REVIEW.md).

## Model and data detail

| Source | Coverage / period | Meaning |
| --- | --- | --- |
| CHELSA V2.1 / BIOCLIM+ | Global, 1981–2010 | Nine seasonal climate fields, original source approximately 1 km, sampled to 10′ |
| ERA5-EX v1.0, Figshare v4 | Global native land grid 0.1°, annual 1950–2025; app uses 1991–2025 | TNn: minimum of daily minimum temperature each calendar year |
| PRISM / USDA 2023 | CONUS, 1991–2020, source 800 m | Mean annual extreme minimum; preferred mean where available |

The app's common grid is 2160 × 1044, approximately **10 arc-minutes** (18.5 km north–south). Nearest native ERA5-EX points are sampled at each cell center, wrapping longitude from −180–180 to 0–360. There is no gap filling. Display smoothing adds no observations. The mean uses at least 27/30 valid years; historical exposure requires at least 30/35 valid years. Threshold counts use original float values before temperature packing to 0.1°C.

The model retains the previous non-freeze curves. Mean annual extremes independently cap the score. Conservative planning rules also cap it at 59 when at least one observed year reaches ≤−12.2°C, at 79 when ≥20% of valid years reach ≤−7°C, and at 39 when ≥20% reach ≤−10°C. These are explicit risk-policy choices, not fitted crop-death probabilities. [MODEL.js](MODEL.js) is a readable copy of the function embedded in the standalone HTML.

Annual TNn cannot resolve freeze duration, deacclimation, bloom heat, spring frost, disease, drainage, pollination, irrigation feasibility or alternate bearing. Flower induction depends on sustained cool temperatures, warm interruptions and cultivar; a damaging cold snap is not a requirement. A ±3°C mean-freeze sensitivity in the orchard records is illustrative only and holds historical tail caps fixed; it is not a confidence interval.

## Downloadable evidence

- [DATA_SOURCES.json](DATA_SOURCES.json): native units/axes, period, resampling, source URLs, licence, hashes and model rules.
- [DATA_VALIDATION.json](DATA_VALIDATION.json): map/inspector consistency and controls across continents.
- [GLOBAL_FREEZE_VALIDATION.json](GLOBAL_FREEZE_VALIDATION.json): independent scalar source checks and local freeze discrepancies.
- [ORCHARD_EVIDENCE.json](ORCHARD_EVIDENCE.json): source-derived coordinates, management, cultivars, evidence classes and exclusions.
- [ORCHARD_VALIDATION.json](ORCHARD_VALIDATION.json): every result, shared-cell grouping, counterexamples and primary citations.
- [LOCAL_STATIONS.json](LOCAL_STATIONS.json): local source observations, cultivar outcomes and station metadata.
- [LOCAL_VALIDATION.json](LOCAL_VALIDATION.json): 52,589 independently checked accepted station values, 12 local behavior checks and remaining regional comparisons.
- [LOCAL_VALIDATION_PROTOCOL.json](LOCAL_VALIDATION_PROTOCOL.json): development split, units, completeness and scope.
- [LOCAL_ASSESSMENT_MODEL.js](LOCAL_ASSESSMENT_MODEL.js): categorical point-assessment logic. Regional `MODEL.js` is unchanged.
- [stations/](stations/): accepted 1991–2025 daily Tmin/Tmax with source/measurement flags and annual coverage. GHCN quality-flagged and missing values excluded; no gap filling.
- [VALIDATION_PROTOCOL.json](VALIDATION_PROTOCOL.json): rules declared before orchard score extraction.

## Attribution and reuse

ERA5-EX: **Peng, Shilei (2026), ERA5-EX Dataset v1.0, Figshare version 4**, [doi:10.6084/m9.figshare.31812172.v4](https://doi.org/10.6084/m9.figshare.31812172.v4), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). This atlas derives different-period aggregates, threshold-year counts and a coarser sampled grid. [Methods paper](https://doi.org/10.1038/s41597-026-08312-x). The authors report substantial regional differences against HadEX3; those are not orchard-point error bars or a universal correction.

CHELSA data are [CC0](https://www.chelsa-climate.org/datasets/chelsa_bioclim); see [Brun et al. (2022)](https://doi.org/10.5194/essd-14-5573-2022) and [Karger et al. (2017)](https://doi.org/10.1038/sdata.2017.122).

PRISM data have separate [OSU terms](https://prism.oregonstate.edu/phzm/). **This altered, derived crop screen is not the official USDA Plant Hardiness Zone Map**; agency logos are omitted. Natural Earth land is public domain; Leaflet 1.9.4 is BSD-2-Clause; optional background tiles use [OpenStreetMap](https://www.openstreetmap.org/copyright). See [THIRD_PARTY_NOTICES.txt](THIRD_PARTY_NOTICES.txt).

GitHub Pages serves `main / (root)`. The map remains a standalone HTML application; the adjacent evidence files make its claims reviewable.
