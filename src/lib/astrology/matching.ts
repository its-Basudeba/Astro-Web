import { getNakshatraInfo, getZodiacSign } from './kundli.ts';
import type { KundliResult } from './kundli.ts';

export interface AshtakootaScore {
  name: string;
  odiaName: string;
  maxScore: number;
  obtainedScore: number;
  description: string;
  odiaDescription: string;
}

export interface MatchingResult {
  boy: {
    name: string;
    moonSign: string;
    odiaSign: string;
    nakshatra: string;
    odiaNakshatra: string;
    pada: number;
  };
  girl: {
    name: string;
    moonSign: string;
    odiaSign: string;
    nakshatra: string;
    odiaNakshatra: string;
    pada: number;
  };
  totalScore: number;
  maxScore: number;
  percentage: number;
  kootas: AshtakootaScore[];
  verdict: {
    grade: 'Excellent' | 'Good' | 'Average' | 'Challenging';
    odiaGrade: string;
    recommendation: string;
    odiaRecommendation: string;
  };
  disclaimer: string;
}

// 8 Kootas in Vedic Kundli Matching
// 1. Varna (1 point): Work and spiritual ego compatibility
// 2. Vashya (2 points): Mutual attraction and control
// 3. Tara (3 points): Health and longevity compatibility
// 4. Yoni (4 points): Biological and sexual temperament
// 5. Graha Maitri (5 points): Psychological friendship between Moon sign lords
// 6. Gana (6 points): Temperament (Deva, Manushya, Rakshasa)
// 7. Bhakoot (7 points): Emotional prosperity, family happiness
// 8. Nadi (8 points): Genetic health, progeny, nervous constitution

export function calculateKundliMatching(boyKundli: KundliResult, girlKundli: KundliResult): MatchingResult {
  const boyMoon = boyKundli.planets.find((p) => p.name === 'Moon')!;
  const girlMoon = girlKundli.planets.find((p) => p.name === 'Moon')!;

  const boyNakInfo = getNakshatraInfo(boyMoon.longitude);
  const girlNakInfo = getNakshatraInfo(girlMoon.longitude);

  const boySignInfo = getZodiacSign(boyMoon.longitude);
  const girlSignInfo = getZodiacSign(girlMoon.longitude);

  // 1. Varna (1 Point)
  // Brahmin (Water signs), Kshatriya (Fire), Vaishya (Earth), Shudra (Air)
  const getVarnaRank = (signId: number) => {
    if ([4, 8, 12].includes(signId)) return 4; // Brahmin
    if ([1, 5, 9].includes(signId)) return 3;  // Kshatriya
    if ([2, 6, 10].includes(signId)) return 2; // Vaishya
    return 1; // Shudra (3, 7, 11)
  };
  const boyVarna = getVarnaRank(boySignInfo.signIndex);
  const girlVarna = getVarnaRank(girlSignInfo.signIndex);
  const varnaScore = boyVarna >= girlVarna ? 1 : 0;

  // 2. Vashya (2 Points)
  const vashyaScore = (boySignInfo.signIndex === girlSignInfo.signIndex) ? 2 :
    ([1, 5, 9].includes(boySignInfo.signIndex) && [1, 5, 9].includes(girlSignInfo.signIndex)) ? 2 : 1;

  // 3. Tara (3 Points)
  const diff1 = (girlNakInfo.index - boyNakInfo.index + 27) % 9;
  const diff2 = (boyNakInfo.index - girlNakInfo.index + 27) % 9;
  const auspiciousTarans = [1, 2, 4, 6, 8, 0];
  const t1 = auspiciousTarans.includes(diff1) ? 1.5 : 0;
  const t2 = auspiciousTarans.includes(diff2) ? 1.5 : 0;
  const taraScore = Math.round(t1 + t2);

  // 4. Yoni (4 Points)
  const yoniScore = (boyNakInfo.index % 14 === girlNakInfo.index % 14) ? 4 : 2;

  // 5. Graha Maitri (5 Points)
  const lordFriendship = boySignInfo.lord === girlSignInfo.lord ? 5 : 3;
  const grahaMaitriScore = lordFriendship;

  // 6. Gana (6 Points)
  // Deva, Manushya, Rakshasa by nakshatra index
  const getGana = (index: number) => {
    const devaNaks = [0, 4, 6, 7, 12, 14, 16, 21, 26];
    const rakshasaNaks = [2, 8, 9, 13, 17, 18, 22, 23];
    if (devaNaks.includes(index)) return 'Deva';
    if (rakshasaNaks.includes(index)) return 'Rakshasa';
    return 'Manushya';
  };
  const boyGana = getGana(boyNakInfo.index);
  const girlGana = getGana(girlNakInfo.index);
  let ganaScore = 6;
  if (boyGana === girlGana) {
    ganaScore = 6;
  } else if ((boyGana === 'Deva' && girlGana === 'Manushya') || (boyGana === 'Manushya' && girlGana === 'Deva')) {
    ganaScore = 4;
  } else if (boyGana === 'Rakshasa' || girlGana === 'Rakshasa') {
    ganaScore = 1;
  }

  // 7. Bhakoot (7 Points)
  const signDistance = (girlSignInfo.signIndex - boySignInfo.signIndex + 12) % 12;
  // Inauspicious distances: 2/12, 6/8, 9/5 (Dwirdwadasa, Shadashtaka, Navapanchama)
  const isBhakootDosha = [1, 5, 7, 11].includes(signDistance);
  const bhakootScore = isBhakootDosha ? 0 : 7;

  // 8. Nadi (8 Points)
  // 3 Nadis: Adi (0), Madhya (1), Antya (2)
  const boyNadi = boyNakInfo.index % 3;
  const girlNadi = girlNakInfo.index % 3;
  const nadiScore = boyNadi !== girlNadi ? 8 : 0; // Same nadi produces Nadi Dosha

  const kootas: AshtakootaScore[] = [
    {
      name: "Varna",
      odiaName: "ବର୍ଣ୍ଣ କୂଟ",
      maxScore: 1,
      obtainedScore: varnaScore,
      description: "Work, ego, and spiritual compatibility",
      odiaDescription: "କର୍ମ ଏବଂ ଆଧ୍ୟାତ୍ମିକ ସାମଞ୍ଜସ୍ୟ"
    },
    {
      name: "Vashya",
      odiaName: "ବଶ୍ୟ କୂଟ",
      maxScore: 2,
      obtainedScore: vashyaScore,
      description: "Mutual dominance and instinctive harmony",
      odiaDescription: "ପାରସ୍ପରିକ ଆକର୍ଷଣ ଏବଂ ପ୍ରଭାବ"
    },
    {
      name: "Tara",
      odiaName: "ତାରା କୂଟ",
      maxScore: 3,
      obtainedScore: taraScore,
      description: "Destiny, longevity, and well-being",
      odiaDescription: "ଭାଗ୍ୟ ଏବଂ ଆୟୁଷ ସୁରକ୍ଷା"
    },
    {
      name: "Yoni",
      odiaName: "ଯୋନି କୂଟ",
      maxScore: 4,
      obtainedScore: yoniScore,
      description: "Biological harmony and intimate compatibility",
      odiaDescription: "ଶାରୀରିକ ଏବଂ ମାନସିକ ସୌହାର୍ଦ୍ଦ୍ୟ"
    },
    {
      name: "Graha Maitri",
      odiaName: "ଗ୍ରହ ମୈତ୍ରୀ",
      maxScore: 5,
      obtainedScore: grahaMaitriScore,
      description: "Psychological and intellectual friendship",
      odiaDescription: "ମନୋବୈଜ୍ଞାନିକ ଓ ବୌଦ୍ଧିକ ବନ୍ଧୁତା"
    },
    {
      name: "Gana",
      odiaName: "ଗଣ କୂଟ",
      maxScore: 6,
      obtainedScore: ganaScore,
      description: "Temperament and behavior alignment",
      odiaDescription: "ସ୍ୱଭାବ ଏବଂ ଆଚରଣ ସାମଞ୍ଜସ୍ୟ"
    },
    {
      name: "Bhakoot",
      odiaName: "ଭକୂଟ କୂଟ",
      maxScore: 7,
      obtainedScore: bhakootScore,
      description: "Emotional fulfillment and family welfare",
      odiaDescription: "ପ୍ରେମ ଏବଂ ପାରିବାରିକ ସମୃଦ୍ଧି"
    },
    {
      name: "Nadi",
      odiaName: "ନାଡ଼ି କୂଟ",
      maxScore: 8,
      obtainedScore: nadiScore,
      description: "Genetic vitality, progeny, and physiological harmony",
      odiaDescription: "ବଂଶବୃଦ୍ଧି, ସନ୍ତାନ ସୁଖ ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ"
    }
  ];

  const totalScore = kootas.reduce((acc, k) => acc + k.obtainedScore, 0);
  const percentage = Math.round((totalScore / 36) * 100);

  let grade: 'Excellent' | 'Good' | 'Average' | 'Challenging' = 'Average';
  let odiaGrade = "ମଧ୍ୟମ";
  let recommendation = "";
  let odiaRecommendation = "";

  if (totalScore >= 28) {
    grade = 'Excellent';
    odiaGrade = "ଉତ୍ତମ ରାଜଯୋଟକ";
    recommendation = "Highly auspicious match. The couple shares great philosophical, emotional, and physical harmony.";
    odiaRecommendation = "ଏହି ଯୋଟକ ଅତ୍ୟନ୍ତ ଶୁଭପ୍ରଦ। ପାରସ୍ପରିକ ବୁଝାମଣା, ଦାମ୍ପତ୍ୟ ସୁଖ ଏବଂ ପାରିବାରିକ ଉନ୍ନତି ଯୋଗ ଅଛି।";
  } else if (totalScore >= 18) {
    grade = 'Good';
    odiaGrade = "ଶୁଭ ଯୋଟକ";
    recommendation = "Favorable match according to traditional Vedic standards. Personal chart consultation recommended.";
    odiaRecommendation = "ବିବାହ ପାଇଁ ଅନୁକୂଳ। ସ୍ୱତନ୍ତ୍ର କୁଣ୍ଡଳୀ ବିଚାର ଓ ଦୋଷ କ୍ଷୟ ନିମନ୍ତେ ପରାମର୍ଶ ଉଚିତ୍।";
  } else {
    grade = 'Challenging';
    odiaGrade = "ବିଶେଷ ବିଚାର ଆବଶ୍ୟକ";
    recommendation = "Low Guna score. Comprehensive individual birth-chart review by Pandit Ji is recommended before finalizing.";
    odiaRecommendation = "ଗୁଣ ମିଳନ ସଂଖ୍ୟା କମ୍ ଅଛି। ନାଡ଼ି ବା ଭକୂଟ ଦୋଷ ଶାନ୍ତି ଏବଂ ବିସ୍ତୃତ କୁଣ୍ଡଳୀ ପରୀକ୍ଷା ପାଇଁ ପଣ୍ଡିତଜୀଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ।";
  }

  return {
    boy: {
      name: boyKundli.birthDetails.name,
      moonSign: boySignInfo.sign,
      odiaSign: boySignInfo.odiaSign,
      nakshatra: boyNakInfo.nakshatra,
      odiaNakshatra: boyNakInfo.odiaNakshatra,
      pada: boyNakInfo.pada,
    },
    girl: {
      name: girlKundli.birthDetails.name,
      moonSign: girlSignInfo.sign,
      odiaSign: girlSignInfo.odiaSign,
      nakshatra: girlNakInfo.nakshatra,
      odiaNakshatra: girlNakInfo.odiaNakshatra,
      pada: girlNakInfo.pada,
    },
    totalScore,
    maxScore: 36,
    percentage,
    kootas,
    verdict: {
      grade,
      odiaGrade,
      recommendation,
      odiaRecommendation,
    },
    disclaimer: "Vedic Ashtakoota calculation is an advisory traditional methodology. It is not an absolute prediction or scientific guarantee."
  };
}
