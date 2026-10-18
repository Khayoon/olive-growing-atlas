/* Cultivated olive DMA chilling screen.
 * Sources: De Melo-Abreu et al. 2004 DOI 10.1016/j.agrformet.2004.02.009
 * (Eq. 1 and daily Tmin/Tmax reconstruction); Aybar et al. 2015
 * DOI 10.5424/sjar/2015131-6375 (Table 2 and southern start date).
 * Reconstructed temperatures are modeled solar-hour temperatures, not hourly
 * observations. The default seven-month screening window is an atlas convention,
 * not a universal physiological flowering deadline. No yield probability follows.
 */
(function(root) {
  'use strict';
  const DAY_MS = 86400000;
  const cultivars = Object.freeze({
    Arbequina: Object.freeze({ requirementCU: 339, optimumC: 7.3, breakpointC: 20.7, warmRate: -.56 }),
    Leccino: Object.freeze({ requirementCU: 612, optimumC: 7.3, breakpointC: 20.7, warmRate: -.56 }),
    Frantoio: Object.freeze({ requirementCU: 671, optimumC: 7.3, breakpointC: 20.7, warmRate: -.56 }),
    ArbequinaWarm: Object.freeze({ requirementCU: 339, optimumC: 7.3, breakpointC: 21.7, warmRate: -.50 })
  });
  function chillIncrementC(tempC, parameters) {
    const p = parameters || cultivars.Arbequina;
    if (!Number.isFinite(tempC)) return NaN;
    if (tempC <= 0) return 0;
    if (tempC <= p.optimumC) return tempC / p.optimumC;
    if (tempC <= p.breakpointC)
      return 1 - (tempC - p.optimumC) * (1 - p.warmRate) / (p.breakpointC - p.optimumC);
    return p.warmRate;
  }
  function dayOfYear(date) {
    const d = new Date(date + 'T00:00:00Z');
    return Math.round((d.getTime() - Date.UTC(d.getUTCFullYear(), 0, 1)) / DAY_MS) + 1;
  }
  function sunriseSolarHour(latitude, date) {
    const declination = .409 * Math.sin(2 * Math.PI * dayOfYear(date) / 365 - 1.39);
    const arg = -Math.tan(latitude * Math.PI / 180) * Math.tan(declination);
    if (!Number.isFinite(arg) || arg <= -1 || arg >= 1) return null;
    return 12 - Math.acos(arg) * 12 / Math.PI;
  }
  function addDays(date, days) {
    return new Date(new Date(date + 'T00:00:00Z').getTime() + days * DAY_MS).toISOString().slice(0, 10);
  }
  function validPair(row) {
    return row && Number.isFinite(row.tminC) && Number.isFinite(row.tmaxC) &&
      row.tminC <= row.tmaxC && row.tminC >= -100 && row.tmaxC <= 70;
  }
  function hourlyFromDaily(previous, current, next, latitude) {
    if (!validPair(previous) || !validPair(current) || !validPair(next)) return null;
    if (previous.date !== addDays(current.date, -1) || next.date !== addDays(current.date, 1)) return null;
    const rise = sunriseSolarHour(latitude, current.date);
    const nextRise = sunriseSolarHour(latitude, next.date);
    if (rise === null || nextRise === null || rise >= 14 || nextRise >= 14) return null;
    const result = [];
    for (let i = 0; i < 24; i++) {
      const hour = i + .5; // midpoint integration of each local solar-hour bin
      let low, high, fraction, warming;
      if (hour < rise) {
        low = current.tminC; high = previous.tmaxC;
        fraction = (hour + 24 - 14) / (24 + rise - 14); warming = false;
      } else if (hour <= 14) {
        low = current.tminC; high = current.tmaxC;
        fraction = (hour - rise) / (14 - rise); warming = true;
      } else {
        low = next.tminC; high = current.tmaxC;
        fraction = (hour - 14) / (24 + nextRise - 14); warming = false;
      }
      const mean = (high + low) / 2, amplitude = (high - low) / 2;
      result.push(mean + (warming ? -1 : 1) * amplitude * Math.cos(Math.PI * fraction));
    }
    return result;
  }
  function simulateSeason(rows, latitude, startYear, options) {
    const opts = options || {};
    const north = latitude >= 0;
    const startDate = opts.startDate || `${startYear}-${north ? '10-01' : '04-01'}`;
    const endDate = opts.endDate || `${startYear + (north ? 1 : 0)}-${north ? '04-30' : '10-31'}`;
    const byDate = new Map(rows.map(r => [r.date, r]));
    const states = Object.fromEntries(Object.entries(cultivars).map(([name, p]) =>
      [name, { requirementCU: p.requirementCU, totalCU: 0, maximumCU: 0, reachedDate: null }]));
    let expectedDays = 0, modeledDays = 0, pairedDays = 0;
    for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
      expectedDays++;
      const current = byDate.get(date);
      if (validPair(current)) pairedDays++;
      const hourly = hourlyFromDaily(byDate.get(addDays(date, -1)), current,
        byDate.get(addDays(date, 1)), latitude);
      if (!hourly) continue;
      modeledDays++;
      for (const [name, p] of Object.entries(cultivars)) {
        const state = states[name];
        for (const tempC of hourly) {
          state.totalCU = Math.max(0, state.totalCU + chillIncrementC(tempC, p));
          state.maximumCU = Math.max(state.maximumCU, state.totalCU);
          if (!state.reachedDate && state.totalCU >= p.requirementCU) state.reachedDate = date;
        }
      }
    }
    const complete = modeledDays === expectedDays;
    for (const state of Object.values(states)) {
      state.totalCU = Math.round(state.totalCU * 10) / 10;
      state.maximumCU = Math.round(state.maximumCU * 10) / 10;
      state.requirementMet = complete ? Boolean(state.reachedDate) : null;
      if (!complete) state.reachedDate = null; // missing warm/cold days prevent a valid classification
    }
    return { startDate, endDate, expectedDays, pairedDays, modeledDays, complete,
      method: 'DMA kernel with modeled hourly temperatures from accepted daily Tmin/Tmax',
      maximumCUInterpretation: 'Maximum screening accumulation if the chill kernel continues all season; original DMA changes phase at first requirement attainment.',
      reliabilityAssessed: false, cultivars: states };
  }
  function simulateMonthlyNormal(tminC, tmaxC, latitude, options) {
    if (!Array.isArray(tminC) || !Array.isArray(tmaxC) || tminC.length !== 12 || tmaxC.length !== 12)
      throw new TypeError('Twelve monthly mean daily Tmin/Tmax values in Celsius are required.');
    const opts = options || {}, year = 2001;
    const start = `${year}-${latitude >= 0 ? '10-01' : '04-01'}`;
    const end = `${year + (latitude >= 0 ? 1 : 0)}-${latitude >= 0 ? '04-30' : '10-31'}`;
    const rows=[];
    for(let date=addDays(start,-1);date<=addDays(end,1);date=addDays(date,1)) {
      const d = new Date(date+'T00:00:00Z'), month=d.getUTCMonth();
      if (!opts.interpolate) rows.push({date,tminC:tminC[month],tmaxC:tmaxC[month]});
      else {
        // Interpolate monthly midpoints, retaining the climatological (not weather) character.
        const currentMiddle=Date.UTC(d.getUTCFullYear(),month,16), timestamp=d.getTime();
        const leftMonth=timestamp<currentMiddle?month-1:month, rightMonth=leftMonth+1;
        const left=Date.UTC(d.getUTCFullYear(),leftMonth,16),right=Date.UTC(d.getUTCFullYear(),rightMonth,16);
        const f=(timestamp-left)/(right-left),li=(leftMonth+12)%12,ri=rightMonth%12;
        rows.push({date,tminC:tminC[li]*(1-f)+tminC[ri]*f,tmaxC:tmaxC[li]*(1-f)+tmaxC[ri]*f});
      }
    }
    const result=simulateSeason(rows,latitude,year);
    result.method = 'Normal-climate DMA kernel screen: monthly mean daily Tmin/Tmax repeated by month'+(opts.interpolate?' with midpoint interpolation':'');
    result.interannualReliabilityAssessed=false;
    return result;
  }
  const api = { cultivars, chillIncrementC, sunriseSolarHour, hourlyFromDaily, simulateSeason, simulateMonthlyNormal, addDays };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.OliveChillingModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
