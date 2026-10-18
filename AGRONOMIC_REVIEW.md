# Cultivated edible olive: agronomic review (v2.1)

The intended crop is **Olea europaea subsp. europaea**, including edible table and oil cultivars. African olive (*subsp. cuspidata*) and other plants named olive are excluded. The model never used wild/invasive occurrence records; its problem was inadequate climate-risk interpretation.

## Findings and corrections

- **Texas:** The previous 98/100 Hill Country score was misleading. CHELSA average winter lows and freeze-thaw climatology missed severe episodic freezes. Added the PRISM/USDA 2023 mean annual extreme minimum raster (1991–2020), resampled to the existing grid. It caps scores independently within CONUS. Its period excludes February 2021; it is not a worst-freeze predictor.
- **Warm winters:** A flowering-proxy constraint now independently caps scores when cold-quarter means exceed 11°C. Exact cultivar-specific chill accumulation is not inferred from quarterly means. Flowering depends on sustained cool temperatures and warm interruptions, not a damaging cold snap.
- **Wet summers:** Strong wetness can no longer be offset by favorable temperatures. The wetness response caps the score itself, with a management-dependent ceiling below the stated response threshold. These are explicit heuristic choices, not calibrated yield thresholds.
- **Australia:** Invasive African olive is distinct from cultivated edible olive. Riverina is independently documented as a commercial edible-olive region. Humid eastern coastal locations retain flowering/wetness constraints.
- **China:** Replaced a broad Yunnan/Sichuan envelope with a small Xichang context outline and a published Beihe orchard coordinate (27°44′ N, 102°14′ E). Added a separate Lishui trial pin. Dry-valley production and selected wet-region cultivar trials do not justify a blanket southern-China suitability zone.
- **Río de la Plata / Uruguay:** INIA documents oil production alongside significant humidity-associated disease pressure; the model treats representative humid sites as management-dependent.

## Before and after controls

These numbers are software screening scores at named coordinates, not measured yields or probabilities. Rainfed comparisons use the same packed CHELSA values. Irrigation affects water scarcity only.

| Control | v2.0 rainfed | v2.1 rainfed | v2.1 irrigated | Current rainfed limiter |
| --- | ---: | ---: | ---: | --- |
| Andalusia | 98 | 98 | 98 | Favorable temperature & seasonal water balance |
| California | 81 | 81 | 84 | Favorable temperature & seasonal water balance |
| Shodoshima | 79 | 73 | 73 | Wet warm season Â· fungal-management pressure |
| Texas Hill Country | 98 | 45 | 45 | Damaging winter freeze risk Â· annual extreme minima |
| Winter Garden | 86 | 64 | 64 | Warm-winter flowering / chilling constraint |
| Willamette | 88 | 66 | 66 | Damaging winter freeze risk Â· annual extreme minima |
| Guangzhou | 63 | 25 | 25 | Wet warm season Â· fungal-management pressure |
| Lishui | 79 | 51 | 51 | Wet warm season Â· fungal-management pressure |
| Kunming | 79 | 54 | 54 | Wet warm season Â· fungal-management pressure |
| Sydney | 79 | 61 | 61 | Warm-winter flowering / chilling constraint |
| Brisbane | 50 | 35 | 35 | Warm-winter flowering / chilling constraint |
| Riverina | 92 | 92 | 99 | Favorable temperature & seasonal water balance |
| La Plata | 79 | 79 | 79 | Wet warm season Â· fungal-management pressure |
| Maldonado | 90 | 79 | 79 | Wet warm season Â· fungal-management pressure |
| Tacna | 2 | 2 | 53 | Insufficient rain Â· irrigation required |

## Evidence and limits

Checked 27,170 sampled grid cells in both water scenarios: overlay/inspector score difference = 0. Verified the original nine CHELSA planes are byte-for-byte unchanged, optional freeze nodata stays unknown, source °F-to-°C conversion at 5 controls, and embedded HTML syntax/checksums. These checks establish data handling and implementation consistency; they do not validate crop-yield prediction.

**Unresolved:** global extreme-freeze coverage outside CONUS; hourly flower-induction temperatures and warm interruptions; freeze duration and acclimation; soils, drainage, disease, pollination and cultivar-specific yield history. Coarse cells can mix a sheltered orchard with surrounding mountains. A documented orchard can outperform a generic climate index. Do not interpret poor screening scores as proof that no edible olive cultivar can fruit there.

This is a derived crop screening map, not the official USDA Plant Hardiness Zone Map. CHELSA and PRISM have different baselines and reuse terms. No geographic box or cultivation polygon overrides scores.

## Primary sources

- [Texas A&M AgriLife: European olives, freeze injury, vernalization and limited commercial success](https://mytexas.ag.tamu.edu/publications/olives-texas-fruit-and-nut-production/).
- [PRISM / Oregon State University: 2023 PHZM temperature grid, methods, periods and reuse terms](https://prism.oregonstate.edu/phzm/).
- [Flower-induction experiments: cultivar and winter-temperature effects](https://pmc.ncbi.nlm.nih.gov/articles/PMC10143890/).
- [NSW DPI: African olive identification](https://weeds.dpi.nsw.gov.au/Weed/AfricanOlive).
- [NSW DPI: edible olive production in the Riverina](https://www.dpi.nsw.gov.au/stories/olive-tree-crops).
- [Lishui: five-year edible-cultivar and pollinizer experiment](https://www.hnxb.org.cn/CN/10.11869/j.issn.100-8551.2021.04.0960).
- [Xichang: edible oils from indigenous and European cultivars](https://pmc.ncbi.nlm.nih.gov/articles/PMC10114164/).
- [Beihe orchard irrigation trial and published location](https://journals.ashs.org/horttech/view/journals/horttech/29/2/article-p122.xml).
- [Western Chinese dry-valley suitability research](https://www.integrativebiology.ac.cn/pd/CN/10.3724/SP.J.1143.2011.11077).
- [INIA Uruguay: edible cultivars and disease evaluation](https://www.inia.uy/taxonomy/term/4379).
- [INIA Peru: cultivated olives in Tacna](https://repositorio.inia.gob.pe/items/3778735a-93ca-44ff-b0ac-5744e7911941).
