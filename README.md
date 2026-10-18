# Olea — cultivated olive climate atlas

[Open the map](https://khayoon.github.io/olive-growing-atlas/) · [Cyprus terrain view](https://khayoon.github.io/olive-growing-atlas/#lat=35.05&lng=33.1&z=8.75&p=34.936,32.864)

Version 4 uses actual terrain-aware **CHELSA V2.1 1981–2010 climate data** for cultivated edible *Olea europaea* subsp. *europaea*. A climate match is a screening index, **not a prediction of reliable annual yield**.

## Terrain and coastlines

At zoom 6.5 and above, the browser reads windows directly from the original global CHELSA Cloud Optimized GeoTIFFs. Native resolution is 30 arcseconds, approximately 0.9 km north–south. Larger viewports use source overviews; the displayed resolution reports this. No API key is needed. Native detail outside Cyprus requires internet access and public-source availability.

A native **336 × 156 cell Cyprus window**, including source DEM elevation, is embedded for immediate and offline use. The world overview retains the original 10 arcminute (~18.5 km) seasonal data. Natural Earth 1:10 million land/lake geometry clips the display; this cartographic scale is not a 10 m climate resolution. Valid-neighbor interpolation avoids coastal fades. Available seasonal climate remains colored when freeze coverage is missing; actual missing climate is neutral gray. Ocean and mapped lakes remain uncolored.

Cyprus controls from native source cells:

| Location | Source DEM elevation | Coldest-month mean low | Rainfed climate match |
|---|---:|---:|---:|
| Mount Olympus | 1,887 m | −4.7°C | 38 |
| Troodos village | 1,724 m | −3.5°C | 54 |
| Paphos | 46 m | 11.7°C | 96 |
| Limassol | 33 m | 10.8°C | 93 |
| Nicosia | 151 m | 6.8°C | 86 |

These are modeled climate/elevation cell estimates, not station measurements. The [Cyprus Department of Meteorology](https://agromet.dom.org.cy/crops/crop/1) describes cultivated olive in lowland and semi-mountainous areas, mainly up to about 700 m. This context is not implemented as a universal altitude cutoff: foothills differ from the cold highest peaks.

## What is scored

[TERRAIN_MODEL.js](TERRAIN_MODEL.js) combines seasonal cold, summer warmth, heat, wetness, water and freeze–thaw curves from [MODEL.js](MODEL.js), weighted 25%, 30%, 10%, 15%, 12% and 8%, with limiting-component, rainfed-water and wet-season caps. Irrigation changes water scarcity alone.

The previous generic quarter-mean chilling response is removed from the numeric index. **A quarterly mean cannot establish cultivar-specific flower induction.** Hourly chilling, warm interruptions, pollination and dependable fruit set remain unassessed. High seasonal climate match must not be interpreted as a verified reliable orchard location.

Regional freeze constraints remain where available: PRISM 1991–2020 mean annual extreme lows in CONUS, otherwise ERA5-EX 1991–2020 mean annual TNn. ERA5-EX coldest event/year and threshold counts cover 1991–2025. Conservative caps remain 59 for any year ≤−12.2°C, 79 for ≥20% of valid years ≤−7°C, and 39 for ≥20% ≤−10°C, requiring at least 30 valid years. These are planning rules, not fitted loss probabilities.

**Fine climate detail does not refine freeze history:** retained global extremes are sampled at 10 arcminutes from a native 0.1° product. No elevation correction, neighboring freeze infill or invented station measurement is applied. Where coarse extreme minima conflict with colder native mountain normals, the inspector flags the resolution conflict. Where freeze history is unavailable, the score is labeled **seasonal climate only**.

## Field evidence and validation limits

The 25 documentary orchard records, 22 usable study coordinates, and three local weather/cultivar assessments remain available. Gold rings distinguish observed outcomes at Lalamilo, Pedro Abad and Maiolati from gridded estimates. DMA chilling units remain separate from simple hours below a temperature threshold. Orchard freezes and nearby NOAA records retain their stations, distances, QC and discrepancies.

Original version 3 production/failure results are **archived comparisons**, not validation of the revised terrain index. Neither the literature sample nor native data checks establish worldwide dependable annual harvests. Cold pools, freeze duration, acclimation, late frost, disease, drainage, irrigation feasibility and alternate bearing need local assessment.

New [terrain checks](TERRAIN_VALIDATION.json) verify native checksums, five independently sampled Cyprus source locations, coast-to-summit contrast, map/inspector scenario consistency, 285 sampled overview cells and retained freeze caps. Browser checks confirmed native loading outside Cyprus in the Alps and Netherlands. These are implementation/data checks, not crop-yield accuracy estimates.

## Standalone use and evidence

Open `index.html` in a current browser supporting `DecompressionStream`. Leaflet 1.9.4 and GeoTIFF.js 2.1.3 are bundled. The global overview, native Cyprus data, coastlines, regions and orchard evidence work offline; background tiles, external source links and other native climate windows need a connection. GitHub Pages serves `main / (root)`.

- [NATIVE_CLIMATE_SOURCES.json](NATIVE_CLIMATE_SOURCES.json): native fields, units, source URLs, checksums, DEM encoding and global runtime access.
- [TERRAIN_MODEL_META.json](TERRAIN_MODEL_META.json), [TERRAIN_MODEL.js](TERRAIN_MODEL.js), [TERRAIN_VALIDATION.json](TERRAIN_VALIDATION.json): revised index and bounded checks.
- [GEOMETRY_SOURCES.json](GEOMETRY_SOURCES.json): pinned land/lake sources and processing.
- [DATA_SOURCES.json](DATA_SOURCES.json), [DATA_VALIDATION.json](DATA_VALIDATION.json), [GLOBAL_FREEZE_VALIDATION.json](GLOBAL_FREEZE_VALIDATION.json): retained coarse processing and original version 3 checks.
- [ORCHARD_EVIDENCE.json](ORCHARD_EVIDENCE.json), [ORCHARD_VALIDATION.json](ORCHARD_VALIDATION.json), [VALIDATION_PROTOCOL.json](VALIDATION_PROTOCOL.json): studies and archived version 3 comparisons.
- [LOCAL_STATIONS.json](LOCAL_STATIONS.json), [LOCAL_VALIDATION.json](LOCAL_VALIDATION.json), [LOCAL_VALIDATION_PROTOCOL.json](LOCAL_VALIDATION_PROTOCOL.json), [LOCAL_ASSESSMENT_MODEL.js](LOCAL_ASSESSMENT_MODEL.js), [stations/](stations/): unchanged observations and categorical local assessments.

## Attribution

CHELSA: [CC0 and dataset documentation](https://www.chelsa-climate.org/datasets/chelsa_bioclim), [terrain methods](https://www.chelsa-climate.org/models/chelsa_v2.0), [Brun et al. (2022)](https://doi.org/10.5194/essd-14-5573-2022), [Karger et al. (2017)](https://doi.org/10.1038/sdata.2017.122).

ERA5-EX: Peng, Shilei (2026), Dataset v1.0, pinned [Figshare version 4](https://doi.org/10.6084/m9.figshare.31812172.v4), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). This atlas derives period aggregates, threshold counts and resampling. [Methods](https://doi.org/10.1038/s41597-026-08312-x).

PRISM follows [OSU terms](https://prism.oregonstate.edu/phzm/). **This derived crop screen is not the official USDA Plant Hardiness Zone Map**; agency logos are omitted. Natural Earth is public domain; Leaflet is BSD-2-Clause; GeoTIFF.js is MIT; background tiles © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). Full library notices are embedded in the HTML and retained in [THIRD_PARTY_NOTICES.txt](THIRD_PARTY_NOTICES.txt).
