# Olea — The global olive atlas

A single-file, interactive Leaflet atlas exploring the climate behind olive cultivation.

**[Open the atlas](https://khayoon.github.io/olive-growing-atlas/)**

## Run it

Download `index.html` and open it in a browser. There is no build step, API key, account, package installation or local data server to configure.

Leaflet 1.9.4, CSS, Natural Earth v5.1.2 1:50m land geometry, model logic and all 29 curated regions are embedded. Only optional OpenStreetMap background tiles use the network. The land outline, suitability surface and inspector continue to work offline. Disable **Map layers → Background map** to avoid network requests.

## Explore

- Pan and zoom; click anywhere for a score, limiting factor and cultivar/management direction. Water returns no score.
- Visit the Mediterranean and Seto Inland Sea baselines, or choose any of the 29 curated regions.
- Toggle the continuous suitability grid, curated polygon envelopes, extreme microclimate pins and 30°–45° belts independently.
- Adjust the grid opacity, enter coordinates or share a URL containing the current map view and inspection point.
- Open **About the model** for the thresholds, limitations and primary sources.
- The dashboard becomes a collapsible drawer on mobile. Coordinate entry is available as an alternative to map clicking.

## Model

The deterministic 0–100 index combines a 30°–45° latitude optimum, a coast-distance proxy calculated from embedded land, smooth, overlapping elliptical desert/monsoon/continental/mountain priors, and curated regional benchmark priors. A 0.5° grid is bilinearly interpolated into Web Mercator and clipped to the land polygons. The point inspector evaluates the same rules at the actual coordinate; it can differ from the coarse raster, especially around small islands and boundaries. Prime scores require substantial influence from a curated growing-region prior. Those priors taper continuously with distance to the actual polygon edges, rather than rectangular bounding boxes. Unsuitable areas use reduced opacity so the background remains legible.

| Tier | Index | Meaning |
| --- | --- | --- |
| Prime | 80–100 | Curated mild-winter, warm-summer Mediterranean analogue or a managed rain-shadow exception |
| Marginal | 40–79 | Site-dependent frost, humidity, heat, water or ripening constraints |
| Unsuitable | 0–39 | Strong climatic constraints or no reasonable rainfed growing assumption |

The Mediterranean and Setouchi anchors are not climatically identical. Shodoshima/Okayama have marine moderation and mountain rain-shadow benefits but retain summer humidity, heavy-rain and typhoon risks. Peru's coastal valleys are an irrigated, cool-Humboldt-Current exception rather than a general high-altitude rule.

**This is an educational geographic screening model, not an observed climate product, validated crop model, probability, yield forecast or planting recommendation.** No actual hourly chill, annual extreme minima, rainfall, soil, elevation or Köppen raster is loaded. Curated scores are assigned priors; matching those benchmark scores tests implementation consistency, not agronomic accuracy. Polygons are illustrative envelopes, not surveyed orchard boundaries. Freeze injury depends on cultivar, duration, acclimation and tree condition. Tree survival does not imply reliable fruit production. Check local station records, drainage, terrain, irrigation and cultivar trials before planting.

## Background tiles and CARTO

The default is OpenStreetMap with a CSS dark-earth filter. CARTO Dark Matter/Positron began requiring keys in 2026; keyless requests return a visible watermark. See [CARTO's current instructions](https://www.carto.com/basemaps/apikey/).

For optional Dark Matter support, find `const CARTO_API_KEY='';` in `index.html` and set your own browser-appropriate, domain-restricted CARTO key. The application then selects Dark Matter and adjusts attribution. Do not put a private server credential in a public HTML file.

Tiles are fetched only for the visible map, using the browser's normal caching and attribution. No tile downloads or offline tile prefetching are provided. Background requests are subject to the provider's availability and [OpenStreetMap tile policy](https://operations.osmfoundation.org/policies/tiles/). A status message appears on tile failures; embedded layers remain operational.

## GitHub Pages

This repository serves `index.html` from **main / (root)**. `.nojekyll` keeps it a plain static site. To deploy a copy, upload `index.html` and `.nojekyll` to your repository, then choose **Settings → Pages → Deploy from a branch → main → /(root)**. Keep third-party notices with redistributed copies.

## Edit

Everything needed to run the application is in `index.html`. The last script contains the readable application source. Search for `const zones` to edit the regions; coordinates use `[longitude, latitude]` for polygon vertices and `[latitude, longitude]` for benchmark centers. Search for `function model` to change scoring. `window.OleaAtlas` exposes the model and geographic data for reproducible inspection in the browser console.

## Verification

- Browser execution at desktop (1512×982) and mobile (390×844) sizes.
- All 29 benchmark centers checked against their configured scores and land classification.
- Global point sweep checked for repeatability and bounded scores.
- Coordinate navigation, inspector, layer toggles, retained opacity, dialog dismissal and mobile overflow checked.
- Local `file://` execution with all HTTP(S) requests blocked: model and UI initialize; Shodoshima returns 87.

These checks establish application behavior, not agronomic calibration.

## Sources and credits

- [UC Agriculture & Natural Resources — Growing Olive Trees in Napa County](https://ucanr.edu/blog/napa-master-gardener-column/article/growing-olive-trees-napa-county)
- [International Olive Council — Olivæ 130, climatic requirements](https://www.internationaloliveoil.org/?download_publication=198433)
- [Japan Meteorological Agency — Climate of Shikoku](https://www.data.jma.go.jp/cpd/longfcst/en/tourist/file/Shikoku.html)
- [Government of Japan — Shodoshima's olives](https://www.gov-online.go.jp/pdf/hlj/20211101/hlj202111_22-23_Island_of_Olives_and_Soy_Sauce.pdf)
- [Natural Earth — public-domain land data](https://www.naturalearthdata.com/about/terms-of-use/), v5.1.2 via [natural-earth-vector](https://github.com/nvkelso/natural-earth-vector)
- [Leaflet 1.9.4](https://leafletjs.com), BSD-2-Clause; license embedded in the HTML and reproduced in `THIRD_PARTY_NOTICES.txt`
- [OpenStreetMap contributors](https://www.openstreetmap.org/copyright); optional [CARTO](https://carto.com/attributions)
