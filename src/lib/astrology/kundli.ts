export interface PlanetPosition {
  name: string;
  sanskritName: string;
  odiaName: string;
  longitude: number; // 0 to 360 degrees
  sign: string;
  odiaSign: string;
  house: number; // 1 to 12
  nakshatra: string;
  odiaNakshatra: string;
  pada: number;
  degreeInSign: number;
  isRetrograde: boolean;
}

export interface KundliResult {
  birthDetails: {
    name: string;
    date: string;
    time: string;
    place: string;
    latitude: number;
    longitude: number;
    timezone: number;
  };
  ayanamsha: {
    name: string;
    valueDegrees: number;
  };
  lagna: {
    sign: string;
    odiaSign: string;
    house: number;
    degree: number;
    nakshatra: string;
    odiaNakshatra: string;
    pada: number;
  };
  moonSign: {
    sign: string;
    odiaSign: string;
    nakshatra: string;
    odiaNakshatra: string;
    pada: number;
  };
  planets: PlanetPosition[];
  houses: { houseNumber: number; sign: string; odiaSign: string; planetsInHouse: string[] }[];
}

export const ZODIAC_SIGNS = [
  { en: "Aries", or: "ମେଷ", lord: "Mars", id: 1 },
  { en: "Taurus", or: "ବୃଷ", lord: "Venus", id: 2 },
  { en: "Gemini", or: "ମିଥୁନ", lord: "Mercury", id: 3 },
  { en: "Cancer", or: "କର୍କଟ", lord: "Moon", id: 4 },
  { en: "Leo", or: "ସିଂହ", lord: "Sun", id: 5 },
  { en: "Virgo", or: "କନ୍ୟା", lord: "Mercury", id: 6 },
  { en: "Libra", or: "ତୁଳା", lord: "Venus", id: 7 },
  { en: "Scorpio", or: "ବିଛା", lord: "Mars", id: 8 },
  { en: "Sagittarius", or: "ଧନୁ", lord: "Jupiter", id: 9 },
  { en: "Capricorn", or: "ମକର", lord: "Saturn", id: 10 },
  { en: "Aquarius", or: "କୁମ୍ଭ", lord: "Saturn", id: 11 },
  { en: "Pisces", or: "ମୀନ", lord: "Jupiter", id: 12 },
];

export const NAKSHATRAS = [
  { en: "Ashwini", or: "ଅଶ୍ୱିନୀ", lord: "Ketu" },
  { en: "Bharani", or: "ଭରଣୀ", lord: "Venus" },
  { en: "Krittika", or: "କୃତ୍ତିକା", lord: "Sun" },
  { en: "Rohini", or: "ରୋହିଣୀ", lord: "Moon" },
  { en: "Mrigashira", or: "ମୃଗଶିରା", lord: "Mars" },
  { en: "Ardra", or: "ଆର୍ଦ୍ରା", lord: "Rahu" },
  { en: "Punarvasu", or: "ପୁନର୍ବସୁ", lord: "Jupiter" },
  { en: "Pushya", or: "ପୁଷ୍ୟା", lord: "Saturn" },
  { en: "Ashlesha", or: "ଅଶ୍ଳେଷା", lord: "Mercury" },
  { en: "Magha", or: "ମଘା", lord: "Ketu" },
  { en: "Purva Phalguni", or: "ପୂର୍ବ ଫାଲ୍ଗୁନୀ", lord: "Venus" },
  { en: "Uttara Phalguni", or: "ଉତ୍ତର ଫାଲ୍ଗୁନୀ", lord: "Sun" },
  { en: "Hasta", or: "ହସ୍ତା", lord: "Moon" },
  { en: "Chitra", or: "ଚିତ୍ରା", lord: "Mars" },
  { en: "Swati", or: "ସ୍ୱାତୀ", lord: "Rahu" },
  { en: "Vishakha", or: "ବିଶାଖା", lord: "Jupiter" },
  { en: "Anuradha", or: "ଅନୁରାଧା", lord: "Saturn" },
  { en: "Jyeshtha", or: "ଜ୍ୟେଷ୍ଠା", lord: "Mercury" },
  { en: "Mula", or: "ମୂଳା", lord: "Ketu" },
  { en: "Purva Ashadha", or: "ପୂର୍ବ ଆଷାଢ଼ା", lord: "Venus" },
  { en: "Uttara Ashadha", or: "ଉତ୍ତର ଆଷାଢ଼ା", lord: "Sun" },
  { en: "Shravana", or: "ଶ୍ରବଣା", lord: "Moon" },
  { en: "Dhanishta", or: "ଧନିଷ୍ଠା", lord: "Mars" },
  { en: "Shatabhisha", or: "ଶତଭିଷା", lord: "Rahu" },
  { en: "Purva Bhadrapada", or: "ପୂର୍ବ ଭାଦ୍ରପଦ", lord: "Jupiter" },
  { en: "Uttara Bhadrapada", or: "ଉତ୍ତର ଭାଦ୍ରପଦ", lord: "Saturn" },
  { en: "Revati", or: "ରେବତୀ", lord: "Mercury" },
];

/**
 * Calculates Julian Day Number for given UTC components
 */
export function calculateJulianDay(year: number, month: number, day: number, hourFraction: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5 + (hourFraction / 24);
  return jd;
}

/**
 * Lahiri Ayanamsha computation for J2000 epoch:
 * Baseline: 23.85 degrees at 2000.0, precession rate ~ 50.29 arcseconds/year
 */
export function calculateLahiriAyanamsha(jd: number): number {
  const t = (jd - 2451545.0) / 36525.0; // centuries since J2000
  // Standard Lahiri Ayanamsha formula
  const ayanamsha = 23.85667 + 1.39697 * t - 0.000308 * t * t;
  return ayanamsha;
}

/**
 * Normalizes degree to 0 <= deg < 360
 */
export function normalizeDegree(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

/**
 * Determines Nakshatra and Pada from Sidereal Longitude (0-360)
 */
export function getNakshatraInfo(siderealLon: number) {
  const nakshatraSpan = 360 / 27; // 13.333333° (13° 20')
  const padaSpan = nakshatraSpan / 4; // 3.333333° (3° 20')

  const norm = normalizeDegree(siderealLon);
  const index = Math.floor(norm / nakshatraSpan);
  const remainder = norm % nakshatraSpan;
  const pada = Math.floor(remainder / padaSpan) + 1;

  const nakshatra = NAKSHATRAS[index % 27];
  return {
    nakshatra: nakshatra.en,
    odiaNakshatra: nakshatra.or,
    lord: nakshatra.lord,
    pada,
    index,
  };
}

/**
 * Determines Zodiac Sign from Sidereal Longitude
 */
export function getZodiacSign(siderealLon: number) {
  const norm = normalizeDegree(siderealLon);
  const signIndex = Math.floor(norm / 30);
  const degreeInSign = norm % 30;
  const sign = ZODIAC_SIGNS[signIndex % 12];
  return {
    sign: sign.en,
    odiaSign: sign.or,
    signIndex: signIndex + 1, // 1-12
    degreeInSign,
    lord: sign.lord,
  };
}

/**
 * Computes Ascendant (Lagna) Sidereal Longitude
 */
export function calculateLagna(jd: number, lat: number, lon: number, ayanamsha: number): number {
  const d = jd - 2451545.0;
  // Greenwich Mean Sidereal Time in degrees
  let gmst = 280.46061837 + 360.98564736629 * d;
  gmst = normalizeDegree(gmst);

  // Local Sidereal Time in degrees
  const lst = normalizeDegree(gmst + lon);
  const lstRad = (lst * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;
  const obliquityRad = (23.4392911 * Math.PI) / 180;

  // Approximate Sayana Ascendant calculation
  const y = Math.cos(lstRad);
  const x = -Math.sin(lstRad) * Math.cos(obliquityRad) - Math.tan(latRad) * Math.sin(obliquityRad);
  let ascSayana = (Math.atan2(y, x) * 180) / Math.PI;
  ascSayana = normalizeDegree(ascSayana + 90);

  // Convert Tropical (Sayana) to Sidereal (Nirayana) with Lahiri Ayanamsha
  const lagnaSidereal = normalizeDegree(ascSayana - ayanamsha);
  return lagnaSidereal;
}

/**
 * Calculates planetary positions using standard celestial orbital approximations
 */
export function calculatePlanetaryPositions(jd: number, ayanamsha: number, lagnaSignIndex: number): PlanetPosition[] {
  const d = jd - 2451545.0; // days since J2000.0

  // Mean motions & longitudes (tropical approx)
  // Sun
  const sunMeanLon = normalizeDegree(280.466 + 0.98564736 * d);
  const sunMeanAnomaly = normalizeDegree(357.529 + 0.98560028 * d);
  const sunTrop = normalizeDegree(sunMeanLon + 1.915 * Math.sin((sunMeanAnomaly * Math.PI) / 180));
  const sunSidereal = normalizeDegree(sunTrop - ayanamsha);

  // Moon
  const moonMeanLon = normalizeDegree(218.316 + 13.176396 * d);
  const moonMeanAnomaly = normalizeDegree(134.963 + 13.064993 * d);
  const moonTrop = normalizeDegree(moonMeanLon + 6.289 * Math.sin((moonMeanAnomaly * Math.PI) / 180));
  const moonSidereal = normalizeDegree(moonTrop - ayanamsha);

  // Mars
  const marsMean = normalizeDegree(355.433 + 0.524033 * d);
  const marsSidereal = normalizeDegree(marsMean - ayanamsha);

  // Mercury (approximate around Sun)
  const mercurySidereal = normalizeDegree(sunSidereal + 18 * Math.sin((d * 0.071)));

  // Jupiter
  const jupMean = normalizeDegree(34.351 + 0.083085 * d);
  const jupSidereal = normalizeDegree(jupMean - ayanamsha);

  // Venus (approximate around Sun)
  const venusSidereal = normalizeDegree(sunSidereal + 26 * Math.sin((d * 0.027)));

  // Saturn
  const satMean = normalizeDegree(50.077 + 0.033444 * d);
  const satSidereal = normalizeDegree(satMean - ayanamsha);

  // Rahu (Mean North Node - moves retrograde ~19.34 degrees per year)
  const rahuMean = normalizeDegree(2451545.0 - (d * 0.0529539));
  const rahuSidereal = normalizeDegree(rahuMean - ayanamsha);

  // Ketu (Exactly 180 degrees opposite Rahu)
  const ketuSidereal = normalizeDegree(rahuSidereal + 180);

  const rawPlanets = [
    { name: "Sun", sanskritName: "Surya", odiaName: "ସୂର୍ଯ୍ୟ", lon: sunSidereal, isRetro: false },
    { name: "Moon", sanskritName: "Chandra", odiaName: "ଚନ୍ଦ୍ର", lon: moonSidereal, isRetro: false },
    { name: "Mars", sanskritName: "Mangala", odiaName: "ମଙ୍ଗଳ", lon: marsSidereal, isRetro: false },
    { name: "Mercury", sanskritName: "Budha", odiaName: "ବୁଧ", lon: mercurySidereal, isRetro: false },
    { name: "Jupiter", sanskritName: "Guru / Brihaspati", odiaName: "ବୃହସ୍ପତି", lon: jupSidereal, isRetro: false },
    { name: "Venus", sanskritName: "Shukra", odiaName: "ଶୁକ୍ର", lon: venusSidereal, isRetro: false },
    { name: "Saturn", sanskritName: "Shani", odiaName: "ଶନି", lon: satSidereal, isRetro: false },
    { name: "Rahu", sanskritName: "Rahu (North Node)", odiaName: "ରାହୁ", lon: rahuSidereal, isRetro: true },
    { name: "Ketu", sanskritName: "Ketu (South Node)", odiaName: "କେତୁ", lon: ketuSidereal, isRetro: true },
  ];

  return rawPlanets.map((p) => {
    const signInfo = getZodiacSign(p.lon);
    const nakInfo = getNakshatraInfo(p.lon);
    // House calculation in Whole Sign House system (standard in Vedic Astrology)
    // House 1 = Lagna sign, House 2 = Next sign, etc.
    let house = signInfo.signIndex - lagnaSignIndex + 1;
    if (house <= 0) house += 12;

    return {
      name: p.name,
      sanskritName: p.sanskritName,
      odiaName: p.odiaName,
      longitude: parseFloat(p.lon.toFixed(2)),
      sign: signInfo.sign,
      odiaSign: signInfo.odiaSign,
      house,
      nakshatra: nakInfo.nakshatra,
      odiaNakshatra: nakInfo.odiaNakshatra,
      pada: nakInfo.pada,
      degreeInSign: parseFloat(signInfo.degreeInSign.toFixed(2)),
      isRetrograde: p.isRetro,
    };
  });
}

/**
 * Complete Kundli Generation Engine
 */
export function generateKundli(
  name: string,
  dobString: string, // YYYY-MM-DD
  tobString: string, // HH:MM (24-hr)
  place: string,
  lat: number,
  lon: number,
  tzOffsetHours: number = 5.5 // Default IST
): KundliResult {
  const [yearStr, monthStr, dayStr] = dobString.split("-");
  const [hourStr, minuteStr] = tobString.split(":");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  // Convert Local Time to UTC
  const localDecimalHours = hour + minute / 60;
  const utcDecimalHours = localDecimalHours - tzOffsetHours;

  const jd = calculateJulianDay(year, month, day, utcDecimalHours);
  const ayanamsha = calculateLahiriAyanamsha(jd);

  // Calculate Lagna
  const lagnaLon = calculateLagna(jd, lat, lon, ayanamsha);
  const lagnaSign = getZodiacSign(lagnaLon);
  const lagnaNak = getNakshatraInfo(lagnaLon);

  // Calculate Planets
  const planets = calculatePlanetaryPositions(jd, ayanamsha, lagnaSign.signIndex);

  // Find Moon for Moon Sign details
  const moon = planets.find((p) => p.name === "Moon")!;
  const moonSign = {
    sign: moon.sign,
    odiaSign: moon.odiaSign,
    nakshatra: moon.nakshatra,
    odiaNakshatra: moon.odiaNakshatra,
    pada: moon.pada,
  };

  // Group planets by houses
  const houses = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const houseSignIndex = ((lagnaSign.signIndex - 1 + i) % 12) + 1;
    const sign = ZODIAC_SIGNS[houseSignIndex - 1];
    const planetsInHouse = planets.filter((p) => p.house === houseNum).map((p) => p.odiaName || p.name);
    return {
      houseNumber: houseNum,
      sign: sign.en,
      odiaSign: sign.or,
      planetsInHouse,
    };
  });

  return {
    birthDetails: {
      name,
      date: dobString,
      time: tobString,
      place,
      latitude: lat,
      longitude: lon,
      timezone: tzOffsetHours,
    },
    ayanamsha: {
      name: "Lahiri (Chitrapaksha)",
      valueDegrees: parseFloat(ayanamsha.toFixed(4)),
    },
    lagna: {
      sign: lagnaSign.sign,
      odiaSign: lagnaSign.odiaSign,
      house: 1,
      degree: parseFloat(lagnaSign.degreeInSign.toFixed(2)),
      nakshatra: lagnaNak.nakshatra,
      odiaNakshatra: lagnaNak.odiaNakshatra,
      pada: lagnaNak.pada,
    },
    moonSign,
    planets,
    houses,
  };
}
