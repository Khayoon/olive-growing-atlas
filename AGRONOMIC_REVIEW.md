# Version 5 production review

Default colors now distinguish production evidence and commercial planting risk from the optional seasonal climate layer. See CYPRUS_PRODUCTION_EVIDENCE.json and PRODUCTION_REVIEW_VALIDATION.json. Local freeze observations and actual orchard elevations are retained separately; no reliable annual yield probability is calibrated. Earlier reviews below remain archived.

# Version 4 terrain update

The review below is archived version 3 evidence. Version 4 adds native terrain-aware CHELSA windows and removes generic quarterly-mean chilling from the numeric index. See README.md, TERRAIN_MODEL.js and TERRAIN_VALIDATION.json for current behavior and limits. The new index is not validated for reliable annual yield. Local observations and coarse freeze conflicts remain unchanged.

# Version 3.1 local evidence revision

The point assessments correct how the three known regional conflicts are interpreted. They do not constitute a newly calibrated global model. Read [the local validation report](LOCAL_VALIDATION.json) and [protocol](LOCAL_VALIDATION_PROTOCOL.json). The v3 review below describes the unchanged regional screen and its original evaluation.

- Lalamilo: distinguish Arbequina, Arbosana and Koroneiki fruiting from seven non-harvested cultivars. Irrigated trial outcomes cannot establish rainfed suitability. The 141/161 hours below 12.5°C are published logger summaries, not independently recomputed values or physiological minima. DMA CU thresholds from Aybar et al. (2015) are model-specific and not interchangeable with those hours.
- Pedro Abad: retain the study's damaging 2005 freeze below −9°C. Nearby Córdoba airport measured −8.2°C that year with complete daily coverage. Both contradict an interpretation of the regional favorable score as orchard frost safety, but the airport is 36 km away.
- Maiolati: retain reported −6.4°C and prolonged exposure after a mild spell. Young Arbequina and FS17 trees were especially damaged; Ascolana dura and Orbetana performed relatively better. A less negative event minimum is not a reason to call this orchard frost-safe. Frontone is a separate distant station; ST34 metadata do not prove the study used that station.

No additive temperature offsets are extrapolated across mountains, valleys or islands. No short trial is promoted into a reliable annual commercial-yield label. Development examples are excluded from the remaining six production-cell/two failure-site comparisons. The underlying regional discrepancies remain unresolved pending adequate on-site temperature series and independent calibration/validation.

---

# Agronomic review: global freezes and actual edible-olive orchards (v3.0)

This is a climate-compatibility screen for cultivated table/oil olives, not a validated reliable-annual-yield probability. Global extreme-temperature data are now included; the orchard checks and their failures are published separately from the score.

## Global freeze data

ERA5-EX annual TNn is the minimum of daily minimum 2 m air temperature in each calendar year. The app derives a 1991–2020 mean annual extreme minimum, plus the coldest year/value and threshold-exposure counts for 1991–2025. PRISM refines the mean within CONUS. Source-native ERA5-EX resolution is 0.1°; the app samples it onto the existing 10′ grid, without missing-cell extrapolation. These are modeled reanalysis fields, not station readings at every orchard.

The historical exposure caps were declared before orchard score extraction: ≥1 year ≤−12.2°C caps59; ≥20% valid years ≤−7°C caps79; ≥20% ≤−10°C caps39. The actual valid-year denominator is used, with ≥30/35 years required. These are conservative planning choices, not fitted mortality odds. Non-freeze v2.1 curves were not tuned to these evaluation results.

## External orchard evidence

25 source-derived records; 22 usable study locations; 3 excluded for location problems. Measured multi-year fruit yields occur at eight orchard records representing 7 distinct climate cells across 6 studies. 7/7 cells score ≥40 under documented water management. Two Texas flowering-failure sites and one Italian freeze challenge all score <80 (3/3, two studies). This is broad compatibility/hazard flagging, not global yield accuracy.

Nearby paired plots sharing a climate cell count once. Long-term quantitative yield evidence, short trials, categorical productivity, fruit-quality sampling and cultivar challenges are separated. The Xichang example already used as context before this release is excluded from independent summary metrics. Unknown irrigation is evaluated under both scenarios; the favorable result is never selected after inspection.

## Counterexamples and temperature mismatches

- **Lalamilo, Hawaii:** Arbequina, Arbosana and Koroneiki repeatedly fruited, but the generic model scores the cell 0. Other cultivars and harvest years performed poorly. This is a documented cultivar-specific false exclusion and a limit of the quarterly flowering proxy.
- **Pedro Abad, Spain:** the study reports damaging winter2004–05 temperatures below−9°C; ERA5-EX at the sampled map cell gives−4.9°C for2005 (native point nearest the orchard−4.4°C). The model misses the severity of a documented freeze despite its favorable climate score.
- **Maiolati, Italy:** the study records−6.4°C during the prolonged2012 event; sampled reanalysis gives−13.9°C (nearest orchard-native point−11.4°C). The hazard flag passes, but event magnitude is materially wrong. Duration and a preceding warm ten-day period affected damage.

No local bias corrections or orchard score overrides were applied. Reanalysis errors, terrain differences and sampled-cell support prevent interpreting the score as an orchard guarantee. The source authors report material regional TNn errors against HadEX3; no universal regional correction or confidence interval is inferred.

## Every source-located comparison

| Study site | Evidence group | Water regime | Rainfed | Irrigated | Annual reliability qualifier |
| --- | --- | --- | ---: | ---: | --- |
| Pedro Abad cultivar and density trials, Cordoba, Spain | measured multiyear production | irrigated | 98 | 98 | sustained with climate losses |
| Commercial Arbequina orchard, Cordoba, Spain | short production | irrigated | 99 | 99 | unknown |
| Lombo rainfed Cobrancosa orchard, Portugal | short production | rainfed | 89 | 89 | unknown |
| Lombo rainfed Madural orchard, Portugal | short production | rainfed | 89 | 89 | unknown |
| Messinia non-calcareous rainfed orchard, Greece | measured multiyear production | rainfed | 99 | 99 | irregular |
| Messinia calcareous rainfed orchard, Greece | measured multiyear production | rainfed | 99 | 99 | irregular |
| Sicily Arbequina high-density trial, Italy | short production | irrigated | 89 | 89 | unknown |
| Apulia Arbequina high-density trial, Italy | short production | irrigated | 99 | 99 | unknown |
| Umbria Arbequina high-density trial, Italy | short production | irrigated | 59 | 59 | irregular |
| Maiolati Spontini frost-damage orchard, Italy | freeze challenge | rainfed | 26 | 26 | unproven freeze affected |
| Taous comparative cultivated-olive trial, Tunisia | categorical productivity | irrigated | 47 | 85 | reported low alternate bearing |
| Roseworthy NOVA cultivated variety collection, South Australia | measured multiyear production | irrigated | 95 | 97 | young orchard unknown mature reliability |
| INIA Las Brujas, Uruguay | measured multiyear production | irrigated | 79 | 79 | variable |
| INIA Salto Grande, Uruguay | measured multiyear production | irrigated | 75 | 75 | variable |
| INIA Huasco Experimental Station, Vallenar, Chile | measured multiyear production | irrigated | 5 | 69 | variable |
| Tierras Blancas, San Felipe, Chile | measured multiyear production | irrigated | 59 | 59 | variable |
| Commercial orchard 15 km east of Aimogasta, Argentina | short production | irrigated | 42 | 69 | not-established |
| INTA Junín Olive Germplasm Collection, Mendoza, Argentina | fruit quality sampling | irrigated | 46 | 98 | not-established |
| Beihe Olive Commercial Orchard, Xixi village, Xichang, China | short production | both | 45 | 45 | not-established |
| Established Arbequina grove near Weslaco, Texas, USA | unreliable flowering | unknown | 19 | 19 | poor |
| Texas Olive Ranch, Carrizo Springs, Texas, USA | unreliable flowering | unknown | 64 | 64 | poor |
| Lalamilo Experiment Station, Hawaii Island, USA | cultivar challenge | irrigated | 0 | 0 | poor |

## Exclusions and geographic limits

- Experimental Arbequina grove, Orange, Texas, USA: Paper reports N29.56 W93.87 for Orange, but this appears offshore, south of Orange, Texas. Retained as reported and excluded pending correction by an independent primary location record; 50 replicate trees planted 2004.
- California Olive Ranch orchard near Corning, California, USA: Representative town location only; paper names commercial orchard in Corning but gives no plot coordinates. Excluded from precise validation.
- Lishui cultivar trial, Zhejiang, China: Representative city location only; accessible abstract locates trial in Lishui City without orchard coordinate. Mountainous municipal area is large. Excluded from precise validation.

Japan, New Zealand and Western Cape official production evidence remains contextual: the bounded source review did not locate exact orchard coordinates joined to multi-year harvest series. No town centroids or broad regional yields are passed off as orchard observations. Most measured-yield records remain Mediterranean or irrigated subtropical studies. Absence from this evidence set is not evidence of inability to grow olives.

## Verification and practical limits

The source download MD5 matches the publisher. Eleven scalar NetCDF reads independently verify vector aggregation, units, axes, ocean nodata, hemispheres and threshold counts. The original nine CHELSA planes and PRISM plane are retained. The final raster and inspector share one model implementation and are sampled for exact agreement. These checks establish software/data handling, not yield validity.

Freeze duration, acclimation, hourly flower induction and warm interruptions, spring frost, bloom heat, drainage, disease, pollination, irrigation feasibility and alternate bearing remain unresolved. Several profitable groves in the sample have low or fruitless years. Reliable commercial production requires local multi-year cultivar and management records.

## Primary sources

- [Peng (2026), ERA5-EX pinned dataset, CC BY4.0](https://doi.org/10.6084/m9.figshare.31812172.v4).
- [ERA5-EX methods and regional validation](https://doi.org/10.1038/s41597-026-08312-x).
- [CHELSA V2.1 / BIOCLIM+](https://www.chelsa-climate.org/datasets/chelsa_bioclim).
- [PRISM/OSU annual extreme minimum data and reuse terms](https://prism.oregonstate.edu/phzm/).
- [Cultivar and Tree Density As Key Factors in the Long-Term Performance of Super High-Density Olive Orchards](https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2016.01226/full).
- [Analysis of fruit and oil quantity and quality distribution in high-density olive trees in order to improve the mechanical harvesting process](https://sjar.revistas.csic.es/index.php/sjar/article/download/6513/2390?inline=1).
- [The effect of nitrogen fertilization on the incidence of olive fruit fly, olive leaf spot and olive anthracnose in two olive cultivars grown in rainfed conditions](https://bibliotecadigital.ipb.pt/bitstream/10198/20240/1/44.pdf).
- [Enhancing the Yield of Mature Olive Trees via Comparative Fertilization Strategies, including a Foliar Application with Fulvic and Humic Acids, in Non-Irrigated Orchards with Calcareous and Non-Calcareous Soils](https://mdpi-res.com/d_attachment/horticulturae/horticulturae-10-00167/article_deploy/horticulturae-10-00167.pdf?version=1707714682).
- [Growth and Yields of Arbequina High-Density Planting Systems in Three Different Olive Growing Areas in Italy](https://iris.unipa.it/bitstream/10447/102669/1/Argentina_collegiale.pdf).
- [Frost tolerance of 24 olive cultivars and subsequent vegetative re-sprouting as indication of recovery ability](https://www.d3a.univpm.it/sites/www.d3a.univpm.it/files/d3a/Lavori%20scientifici/001%20-%20Lodolini%20et%20al%202016%20-%20SCI%20HORTIC-AMSTERDAM%20-%20211%20-%20152-157.pdf).
- [Zeitoun Ennwader: A new olive oil cultivar in Tunisia with high oil quality and low alternate bearing](https://www.agrimaroc.org/index.php/Actes_IAVH2/article/download/766/918/2434).
- [National Olive Variety Assessment (NOVA), Stage 2, RIRDC 05/155](https://www.floridaolive.org/wp-content/uploads/2020/08/Australian-Olive-Variety-Assesment-stage2-1.pdf).
- [University of Adelaide thesis, chapter 2: Orchard layout, plant materials, and climatic recordings](https://digital.library.adelaide.edu.au/dspace/bitstream/2440/57515/8/02whole.pdf).
- [It Is Feasible to Produce Olive Oil in Temperate Humid Climate Regions](https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2019.01544/full).
- [Preliminary Evaluation of 29 Olive Cultivars for Production and Alternate Bearing, Huasco Valley](https://www.scielo.cl/scielo.php?lng=p&nrm=iso&pid=S0718-58392009000300004&script=sci_arttext&tlng=p).
- [Effect of Different Irrigation Treatments on Fruit Load, Fruit Size and Yield of Olive Trees cv. Sevillana](https://scielo.conicyt.cl/scielo.php?pid=S0365-28072006000100006&script=sci_arttext).
- [Plant growth and yield responses in olive to different irrigation levels in an arid region of Argentina](https://ri.conicet.gov.ar/bitstream/handle/11336/68532/CONICET_Digital_Nro.e6a9d979-1374-43af-9b66-8ed5be45c515_A.pdf?isAllowed=y&sequence=2).
- [Effect of shading in different periods from flowering to maturity on fatty acid and phenolic composition of olive oil](https://www.sciencedirect.com/science/article/abs/pii/S0304423818303911).
- [Promising olive varieties for extra virgin oil production in Mendoza, Argentina](https://link.springer.com/article/10.1016/j.jssas.2022.06.003).
- [Drip Irrigation Elevated Olive Productivity in Southwest China](https://journals.ashs.org/horttech/view/journals/horttech/29/2/article-p122.xml).
- [Feasibility of Growing Olives on Selected Sites along Coastal Texas](https://www.floridaolive.org/wp-content/uploads/2017/08/Growing-Olives-Texas-Coast.pdf).
- [Promising Olive Cultivars for Oil Production in Hawaii](https://journals.ashs.org/downloadpdf/journals/horttech/26/4/article-p497.pdf).
- [Reflective Guide to Growing Olives for Oil Production in Hawai‘i](https://www.ctahr.hawaii.edu/oc/freepubs/pdf/NPH-16.pdf).
- [Cultivar Determines Fatty Acids and Phenolics Dynamics for Olive Fruit and Oil in Super-High-Density Orchards](https://mdpi-res.com/d_attachment/agronomy/agronomy-11-00313/article_deploy/agronomy-11-00313-v2.pdf).
- [Screening of Outstanding Olive Varieties and Compatable Pollinizers for Southern China](https://www.hnxb.org.cn/CN/10.11869/j.issn.100-8551.2021.04.0960).

Full machine-readable observations, coordinate provenance, sources, exclusions and results: [ORCHARD_VALIDATION.json](ORCHARD_VALIDATION.json). Frozen evaluation rules: [VALIDATION_PROTOCOL.json](VALIDATION_PROTOCOL.json).
