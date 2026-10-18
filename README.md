# Olea — The global olive climate atlas

**[Open the atlas](https://khayoon.github.io/olive-growing-atlas/)**

Version 2 replaces the geographic heuristic with real **CHELSA V2.1 / CHELSA-BIOCLIM+ climate normals for 1981–2010**. No latitude band, coast-distance rule, hand-drawn climate penalty or curated region score generates suitability.

## Open it

Download `index.html` and open it in a current browser. It contains Leaflet, land, compressed climate values, both water-scenario rasters and the application. No API key, server or package installation is needed. Optional OpenStreetMap background tiles require a network connection; the climate data and inspector work offline. Browser support for `DecompressionStream('gzip')` is required.

The file is larger than version 1 because it embeds actual global climate data. A loading message appears during decoding.

## Explore

- Click a location for actual climate values, grid-cell outline, limiting factors and a derived olive score.
- Choose **Rainfed only** (the default) or **Reliable irrigation available**. Irrigation relaxes water scarcity only.
- Toggle the climate surface, cultivation context polygons, extreme-site pins and latitude reference lines independently.
- Adjust opacity, inspect coordinates or share a view. Shared links retain the water scenario.
- Read **About the model** for inputs, weights, caveats and primary sources.

Cultivation polygons and pins are illustrative context, not surveyed orchard boundaries. They never alter scores. A successful managed orchard can lie in a marginal cell; Shodoshima's wet-summer constraint remains visible rather than being overridden to make the example green.

## Actual climate inputs

Nine published fields are embedded, with scale and offset applied from the source metadata:

| Field | Interpretation | Units |
| --- | --- | --- |
| BIO05 | Hottest month's mean daily maximum | °C |
| BIO06 | Coldest month's mean daily minimum | °C |
| BIO10 | Mean temperature of warmest three months | °C |
| BIO11 | Mean temperature of coldest three months | °C |
| BIO12 | Annual precipitation | mm/year |
| BIO18 | Precipitation in warmest three months | mm/quarter |
| BIO19 | Precipitation in coldest three months | mm/quarter; retained for reuse |
| hursmean | Annual mean near-surface relative humidity | % |
| fcf | Annual freeze–thaw transition frequency | transitions/year |

The original rasters have approximately 1 km spacing. This application uses a **2160 × 1044 grid at approximately 10 arc-minutes**, sampled from the publisher's COG overviews. Exact bounds, transforms, scale/offset, URLs, ETags and checksums are in [DATA_SOURCES.json](DATA_SOURCES.json). This application does not claim 1 km or parcel-level detail. Ten arc-minutes is about 18.5 km north–south; east–west dimensions vary with latitude.

The inspector uses the containing climate cell. Interpolating display colors adds no observations or precision. Natural Earth land geometry clips the surface and may miss small islets. Missing climate data return no score rather than a guessed value.

## Suitability interpretation

This is a transparent rule-based **climate screening index for reliable fruit production**. Climate data are real; the index is a model, not an observed yield, probability, species-distribution fit or certified orchard recommendation.

Weights: cold-month mean lows 20%; cold-quarter temperature as a chilling proxy 20%; warm-quarter temperature 24%; hot-month mean highs 10%; warm-season rain and annual humidity 13%; water supply 8%; freeze–thaw frequency 5%. Poor thermal conditions and rainfed water scarcity cap the score. High warm-season wetness limits the result to the management-dependent tier. Exact response curves are readable in `index.html` as `OLIVE_THRESHOLDS`; the same function generates raster and inspector scores.

| Tier | Index | Interpretation |
| --- | --- | --- |
| Favorable | 80–100 | Favorable combination of included climate normals |
| Marginal | 40–79 | Meaningful constraint or management dependence |
| Poor | 0–39 | Constraints on reliable fruit production |

**Monthly mean daily minima are not absolute winter minima.** These fields do not establish safety from rare severe freezes, hourly chilling, freeze duration or late-frost damage. A warm average in Texas cannot rule out damaging cold outbreaks. Freeze–thaw transitions are not frost days. Annual humidity is not summer humidity. Soil drainage, exposure, irrigation-water availability, pathogens, cultivar adaptation, pollination and management are not assessed.

The baseline is **1981–2010**, not this year's weather or a future projection. These are published downscaled reanalysis-based fields, not station observations at every location. Tree survival and consistent fruiting are different outcomes.

## Data checks

- Applied source-specific scale/offset metadata.
- Independently reconstructed seasonal precipitation from all twelve monthly CHELSA temperature and precipitation layers at 16 controls. Numeric BIO18 values match **three-month totals**, despite the source long-name saying monthly mean. Maximum control difference: approximately 2.3 mm. Wetness scoring uses that verified total divided by three.
- Excluded categorical Köppen overviews that can average class codes, and an unneeded growing-degree-day field with invalid negative values/nodata.
- Verified the data checksum and compared raster against inspector at more than 27,000 sampled cells, in both water scenarios.
- Checked contrasting Mediterranean, California, Chile, Cape and Australia climates against cold Toronto/Tibetan Plateau, tropical Amazon, arid Sahara and irrigated Mendoza.

These checks establish data handling and software consistency. They do not independently validate scoring thresholds against orchard yields.

## Sources and reuse

CHELSA data are **CC0 1.0**: [bioclimatic dataset](https://www.chelsa-climate.org/datasets/chelsa_bioclim), [climatologies](https://www.chelsa-climate.org/datasets/chelsa_climatologies).

- Brun, P. et al. (2022). [Global climate-related predictors at kilometer resolution for the past and future](https://doi.org/10.5194/essd-14-5573-2022). Earth System Science Data 14, 5573–5603.
- Karger, D. N. et al. (2017). [Climatologies at high resolution for the Earth's land surface areas](https://doi.org/10.1038/sdata.2017.122). Scientific Data 4, 170122.
- Fraga, H. et al. (2021). [Mediterranean Olive Orchards under Climate Change: A Review of Future Impacts and Adaptation Strategies](https://www.mdpi.com/2073-4395/11/1/56). Agronomy 11, 56.
- [International Olive Council — climatic requirements](https://www.internationaloliveoil.org/?download_publication=198433).

Weights and curves are this application's implementation, informed by agronomic ranges; they do not reproduce or claim validation from those publications.

Mapping: [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/) public-domain land; [Leaflet 1.9.4](https://leafletjs.com), BSD-2-Clause; [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). Notices are embedded and included in `THIRD_PARTY_NOTICES.txt`.

## Background and GitHub Pages

OpenStreetMap is the key-free default with dark styling. Optional CARTO Dark Matter works by setting your own browser-appropriate, domain-restricted `CARTO_API_KEY`; [CARTO requires a key](https://www.carto.com/basemaps/apikey/). Tiles follow provider availability and the [OSM tile policy](https://operations.osmfoundation.org/policies/tiles/). No tile prefetching is provided.

GitHub Pages serves `main / (root)`. `.nojekyll` keeps it buildless. To host a copy, upload HTML and notices and enable Pages. Preserve climate attribution and the source manifest with redistributed copies.
