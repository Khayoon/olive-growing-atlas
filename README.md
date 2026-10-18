# Olea — edible-olive production evidence atlas

[Open the Troodos production review](https://khayoon.github.io/olive-growing-atlas/#lat=35.03&lng=32.99&z=8.75&p=34.949912,32.830595&purpose=production)

## Version 5: production evidence, local freezes and commercial planting risk

The default map no longer paints favorable seasonal averages green as evidence of reliable annual production. It separates **observed consecutive annual harvests at study points**, conditional sites, commercial planting risk and unverified land. The previous seasonal climate index remains available through the assessment selector.

- **Green points:** at least five consecutive positive reported crop-year yields at that study coordinate. This establishes observed harvests under recorded management, not stable mature yields, future freeze safety, an orchard boundary or suitability of neighboring land.
- **Amber:** exposure, cultivar or management conditions need local evidence, or the seasonal screen identifies constraints.
- **Red:** a commercial siting recommendation is exceeded in Cyprus, or the seasonal screen identifies a major constraint. This is not a lethal-temperature/altitude prediction.
- **Gray:** dependable annual production is unverified. It does not mean olives cannot grow there.

### Whole-range elevation review

All native land cells in the embedded Cyprus window are audited, including the whole Troodos range. This window is not a surveyed Troodos boundary. The Cyprus Department of Agriculture's 2022 handbook, PDF page 9, advises against cold-wind-exposed northern sites above 300 m, while sheltered eastern/southern sites may extend to 1,000 m. The default review therefore flags cells above 1,000 m as exceeding that commercial siting envelope, and treats 300–1,000 m as conditional because actual shelter is unmeasured. This **Cyprus-specific planning rule is not exported as a worldwide altitude cutoff**.

Cultivar profiles use the same handbook: Koroneiki is advised **below 500 m** (PDF page 6); Kalamon and Amfissis are described up to **600 m** (PDF page 7). None of these contours proves individual tree death or parcel-level production failure. Source DEM resolution is roughly 1 km and differs from surveyed station or orchard elevations.

### Actual freeze observations

The official January 2016 station table reports Panagia Bridge −4.5°C at 440 m, Saittas −4.7°C at 640 m, Stavros Psokas −5°C at 780 m, Platania −9.6°C at 1,120 m, Prodromos −9.7°C at 1,380 m and Troodos Square −12°C at 1,725 m. These are observed monthly minima, not monthly mean lows.

The official daily archive supplies **5,650 accepted unique Prodromos Tmin/Tmax pairs**, 2010-01-01 through 2025-10-31. The observed minimum is **−10.7°C on 2015-01-09**. During 2010–2024, ≤−5°C was observed in 11 of 15 calendar years and ≤−7°C in seven. Gaps remain explicit: these are observed counts, not estimated return periods. The 2025 record is partial. Daily extrema cannot establish hourly freeze duration or cultivar chilling units.

Raw CSV checksums, accepted daily records, plausible-value/date checks, duplicate handling and per-year coverage are retained. Publication does not imply independent sensor QC or homogenization. Modern/named-site map anchors are not proof of identical historical thermometer positions. **No station temperatures are interpolated across the range or used as invented numerical bias corrections.**

### Orchard elevations and what they establish

The Guzelyurt EUL trial reports an actual orchard altitude of **41 m**, exact study coordinates, irrigation and Koroneiki fruit yields **0.41, 4.78, 9.58, 6.08 and 6.81 kg/tree** for crop years 2013–2017. These are five observed annual harvests from young developing trees. They do not validate mature yield stability, rare-freeze safety or mountain production, and irrigated results do not validate rainfed performance.

Oleastro reports current production from its own groves; its map point is the facility, with no published surveyed orchard altitude or annual series. A former Vavatsinia grove's operator-reported **600 m** altitude is retained as historical context; its destruction in the July 2021 wildfire prevents using it as a current production control. No exact grove coordinate was retrieved, so none is invented.

Official descriptions of olive cultivation at **Pelendri (800 m)** and **Askas (~900 m)** report village altitudes, not measured orchard elevations. The IOC's Cyprus chapter also reports cultivation up to 900 m and productive trees in Pitsilia. A blanket exclusion of all upland olives would therefore be unsupported. These records demonstrate cultivation without establishing reliable annual harvests on every slope.

**Remaining gap:** no retrieved high-elevation Troodos orchard combines a surveyed orchard elevation, consecutive annual yield series and a matching long-term local freeze series. Only Prodromos has a retrieved long daily series; six stations provide the January 2016 spatial comparison. Eastern uplands, parcel wind shelter, cold-air pooling, late frost and cultivar-specific hourly chilling remain unvalidated. The atlas does not assign a numerical reliable-yield probability.

### Current evidence files

- [CYPRUS_PRODUCTION_EVIDENCE.json](CYPRUS_PRODUCTION_EVIDENCE.json): sources, six stations, actual orchard points, village-versus-orchard elevation provenance and explicit gaps.
- [PRODUCTION_REVIEW_MODEL.js](PRODUCTION_REVIEW_MODEL.js): separate categorical review rules; the seasonal climate model is retained.
- [PRODUCTION_REVIEW_VALIDATION.json](PRODUCTION_REVIEW_VALIDATION.json): every native Cyprus land cell, elevation bands, station comparisons, cultivar boundaries and orchard non-transfer checks.
- [Prodromos accepted daily records](stations/CY_PRODROMOS_DAILY.json): 5,650 unique paired observations, processing and missing-day coverage.

Primary sources: [Cyprus cultivation handbook](https://www.moa.gov.cy/moa/da/da.nsf/All/B9B43BD726856F98C22588640039CBCF/%24file/%CE%97%20%CE%BA%CE%B1%CE%BB%CE%BB%CE%B9%CE%AD%CF%81%CE%B3%CE%B5%CE%B9%CE%B1%20%CF%84%CE%B7%CF%82%20%CE%95%CE%BB%CE%B9%CE%AC%CF%82.pdf?OpenElement=), [January 2016 station observations](https://www.moa.gov.cy/moa/dm/dm.nsf/All/357B4C9319C712C9C2258597003C8B5C/%24file/GAZ_Jan2016_UK.pdf), [Cyprus DoM daily archive](https://www.data.gov.cy/en/dataset/412), [Guzelyurt original field study, Tables 3–6](https://pakbs.org/pjbot/papers/1560039128.pdf), [IOC Cyprus chapter](https://www.internationaloliveoil.org/?download_publication=17208).

The Cyprus Department of Meteorology daily dataset is **CC BY 4.0**. This atlas filters and summarizes it; missing days are not filled. Other primary-source documents are linked and factual observations summarized, without republishing their full copyrighted works.

## Retained seasonal-climate layer and earlier evidence

The sections below document the optional version 4 climate layer and archived prior evaluations. They do not validate the new production review as a forecast of dependable annual yields.


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
