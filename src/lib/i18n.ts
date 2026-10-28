export type Language = 'en' | 'or';

export interface TranslationStrings {
  common: {
    brandName: string;
    tagline: string;
    bookConsultation: string;
    freeKundli: string;
    kundliMatching: string;
    dailyHoroscope: string;
    home: string;
    about: string;
    services: string;
    kundli: string;
    matching: string;
    horoscope: string;
    booking: string;
    blog: string;
    contact: string;
    privacy: string;
    terms: string;
    cancellation: string;
    admin: string;
    whatsappUs: string;
    callUs: string;
    emailUs: string;
    location: string;
    readMore: string;
    viewDetails: string;
    submit: string;
    loading: string;
    success: string;
    error: string;
    allRightsReserved: string;
    disclaimer: string;
    disclaimerText: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    experienceDraft: string;
    consultationCount: string;
    satisfactionRate: string;
  };
  servicesSection: {
    title: string;
    subtitle: string;
    viewAll: string;
    priceStarting: string;
    durationMinutes: string;
  };
  kundliTool: {
    title: string;
    subtitle: string;
    nameLabel: string;
    dobLabel: string;
    tobLabel: string;
    pobLabel: string;
    generateBtn: string;
    calculating: string;
    chartTitle: string;
    planetaryPositions: string;
    lagna: string;
    rashi: string;
    nakshatra: string;
    disclaimer: string;
  };
  matchingTool: {
    title: string;
    subtitle: string;
    boyDetails: string;
    girlDetails: string;
    matchBtn: string;
    score: string;
    gunaMilan: string;
    recommendation: string;
  };
  bookingSection: {
    title: string;
    subtitle: string;
    selectService: string;
    selectDate: string;
    selectTime: string;
    personalDetails: string;
    fullName: string;
    email: string;
    phone: string;
    message: string;
    confirmBooking: string;
    priceNotice: string;
  };
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    common: {
      brandName: "Pandit Dhananjaya Nanda",
      tagline: "Vedic Astrology | Kundli | Horoscope | Spiritual Guidance",
      bookConsultation: "Book Consultation",
      freeKundli: "Free Kundli Generator",
      kundliMatching: "Kundli Matching",
      dailyHoroscope: "Rashi Horoscope",
      home: "Home",
      about: "About Pandit Ji",
      services: "Services",
      kundli: "Kundli",
      matching: "Matching",
      horoscope: "Horoscope",
      booking: "Book Consultation",
      blog: "Articles & Blog",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      cancellation: "Refund & Cancellation",
      admin: "Admin",
      whatsappUs: "Chat on WhatsApp",
      callUs: "Phone Support",
      emailUs: "Email Consultation",
      location: "Odisha, India",
      readMore: "Read Full Article",
      viewDetails: "View Details",
      submit: "Submit",
      loading: "Calculating celestial charts...",
      success: "Request processed successfully",
      error: "An error occurred. Please verify your input.",
      allRightsReserved: "All Rights Reserved",
      disclaimer: "Astrological Disclaimer",
      disclaimerText: "Astrology provides traditional interpretive spiritual and lifestyle guidance based on Vedic calculations. It does not replace medical, legal, or financial professional counsel."
    },
    hero: {
      badge: "Authentic Vedic Astrology Practice in Odisha",
      title: "Divine Planetary Wisdom for Life's Sacred Journey",
      subtitle: "Empowering individuals, families, and professionals through precise Vedic birth-chart computations, planetary remedy guidance, and compassionate personal consultations.",
      ctaPrimary: "Schedule Your Consultation",
      ctaSecondary: "Generate Free Kundli",
      experienceDraft: "Respected Vedic Tradition",
      consultationCount: "Dedicated Personal Care",
      satisfactionRate: "Mathematical Ephemeris Calculations"
    },
    servicesSection: {
      title: "Vedic Consultation Services",
      subtitle: "Explore traditional consultations tailored to your career, health, relationships, and spiritual growth.",
      viewAll: "Explore All Offerings",
      priceStarting: "Consultation Offering",
      durationMinutes: "mins"
    },
    kundliTool: {
      title: "Authentic Vedic Kundli Generator",
      subtitle: "Accurate astronomical birth chart calculation using Vedic Lahiri Ayanamsha algorithms.",
      nameLabel: "Full Name",
      dobLabel: "Date of Birth",
      tobLabel: "Exact Time of Birth",
      pobLabel: "Birth Place (City, State / Coordinates)",
      generateBtn: "Generate Vedic Janma Kundli",
      calculating: "Computing planetary ephemeris and Lagna...",
      chartTitle: "Lagna (D-1) Birth Chart & Planetary States",
      planetaryPositions: "Planetary Degrees & Nakshatras",
      lagna: "Ascendant (Lagna)",
      rashi: "Moon Sign (Rashi)",
      nakshatra: "Birth Star (Nakshatra)",
      disclaimer: "Calculations follow standard Nirayana Vedic principles with Lahiri Ayanamsha."
    },
    matchingTool: {
      title: "Ashtakoota Kundli Matching (Guna Milan)",
      subtitle: "Traditional 36-Guna assessment for marital harmony, temperament, and astrological alignment.",
      boyDetails: "Groom's Birth Details",
      girlDetails: "Bride's Birth Details",
      matchBtn: "Calculate Guna Milan Score",
      score: "Total Guna Milan Score",
      gunaMilan: "Out of 36 Gunas",
      recommendation: "Traditional Astrological Assessment"
    },
    bookingSection: {
      title: "Book a Personalized Consultation",
      subtitle: "Select your required consultation type and reserve your preferred session time.",
      selectService: "Choose Astrology Service",
      selectDate: "Preferred Appointment Date",
      selectTime: "Available Time Slot",
      personalDetails: "Client Contact Information",
      fullName: "Full Name",
      email: "Email Address",
      phone: "WhatsApp / Mobile Number",
      message: "Key Questions or Topics of Concern (Optional)",
      confirmBooking: "Reserve Appointment",
      priceNotice: "Final fee and mode of consultation (Phone / Video / In-Person) will be confirmed per selected service."
    }
  },
  or: {
    common: {
      brandName: "ପଣ୍ଡିତ ଧନଞ୍ଜୟ ନନ୍ଦ",
      tagline: "ବୈଦିକ ଜ୍ୟୋତିଷ | କୁଣ୍ଡଳୀ | ରାଶିଫଳ | ଆଧ୍ୟାତ୍ମିକ ମାର୍ଗଦର୍ଶନ",
      bookConsultation: "ପରାମର୍ଶ ବୁକ୍ କରନ୍ତୁ",
      freeKundli: "ମାଗଣା କୁଣ୍ଡଳୀ ନିର୍ମାଣ",
      kundliMatching: "ଯକ୍ଷ୍ମା ଓ କୁଣ୍ଡଳୀ ମେଳକ",
      dailyHoroscope: "ରାଶିଫଳ",
      home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
      about: "ପଣ୍ଡିତଜୀଙ୍କ ବିଷୟରେ",
      services: "ସେବା ସମୂହ",
      kundli: "କୁଣ୍ଡଳୀ",
      matching: "ରାଜଯୋଟକ ମେଳକ",
      horoscope: "ରାଶିଫଳ",
      booking: "ପରାମର୍ଶ ନିମନ୍ତେ ବୁକିଂ",
      blog: "ଲେଖା ଓ ପତ୍ରିକା",
      contact: "ଯୋଗାଯୋଗ",
      privacy: "ଗୋପନୀୟତା ନୀତି",
      terms: "ନିୟମ ଓ ସର୍ତ୍ତାବଳୀ",
      cancellation: "ପ୍ରତ୍ୟାର୍ପଣ ନୀତି",
      admin: "ପ୍ରଶାସନ",
      whatsappUs: "ହ୍ୱାଟ୍ସଆପ୍ ମାଧ୍ୟମରେ କଥା ହୁଅନ୍ତୁ",
      callUs: "ଫୋନ୍ ସେବା",
      emailUs: "ଇମେଲ୍ ପରାମର୍ଶ",
      location: "ଓଡ଼ିଶା, ଭାରତ",
      readMore: "ସମ୍ପୂର୍ଣ୍ଣ ପଢନ୍ତୁ",
      viewDetails: "ବିସ୍ତୃତ ଦେଖନ୍ତୁ",
      submit: "ଦାଖଲ କରନ୍ତୁ",
      loading: "ଗ୍ରହ ଗଣନା ଚାଲିଅଛି...",
      success: "ଆପଣଙ୍କ ଅନୁରୋଧ ସଫଳତାର ସହ ଗ୍ରହଣ କରାଗଲା",
      error: "ଗଣନାରେ ତ୍ରୁଟି ହେଲା। ଦୟାକରି ତଥ୍ୟ ଯାଞ୍ଚ କରନ୍ତୁ।",
      allRightsReserved: "ସର୍ବସ୍ୱତ୍ବ ସଂରକ୍ଷିତ",
      disclaimer: "ଜ୍ୟୋତିଷୀୟ ସୂଚନା",
      disclaimerText: "ବୈଦିକ ଜ୍ୟୋତିଷ ଶାସ୍ତ୍ର ପାରମ୍ପରିକ ଏବଂ ଆଧ୍ୟାତ୍ମିକ ଦିଗ୍ଦର୍ଶନ ପ୍ରଦାନ କରେ। ଏହା ଡାକ୍ତରୀ କିମ୍ବା ଆଇନଗତ ପରାମର୍ଶର ବିକଳ୍ପ ନୁହେଁ।"
    },
    hero: {
      badge: "ଓଡ଼ିଶାର ପ୍ରତିଷ୍ଠିତ ବୈଦିକ ଜ୍ୟୋତିଷ ପରମ୍ପରା",
      title: "ଜୀବନର ଶୁଭ ମାର୍ଗଦର୍ଶନ ପାଇଁ ପ୍ରାମାଣିକ ବୈଦିକ ଜ୍ୟୋତିଷ",
      subtitle: "ସଠିକ୍ ଗ୍ରହ ସ୍ଥିତି ଗଣନା, ଜନ୍ମ କୁଣ୍ଡଳୀ ବିଚାର, ଦୋଷ ନିରାକରଣ ଓ ଆଧ୍ୟାତ୍ମିକ ଶାନ୍ତି ନିମନ୍ତେ ଶ୍ରଦ୍ଧେୟ ପଣ୍ଡିତ ଧନଞ୍ଜୟ ନନ୍ଦଙ୍କ ସହ ପରାମର୍ଶ କରନ୍ତୁ।",
      ctaPrimary: "ପରାମର୍ଶ ବୁକ୍ କରନ୍ତୁ",
      ctaSecondary: "ମାଗଣା କୁଣ୍ଡଳୀ ପ୍ରସ୍ତୁତ କରନ୍ତୁ",
      experienceDraft: "ପାରମ୍ପରିକ ଗୁରୁକୁଳ ପରମ୍ପରା",
      consultationCount: "ବ୍ୟକ୍ତିଗତ ଧ୍ୟାନ ଓ ବିଚାର",
      satisfactionRate: "ସଠିକ ଗ୍ରହ ଗଣିତ ପଦ୍ଧତି"
    },
    servicesSection: {
      title: "ଆମର ଜ୍ୟୋତିଷୀୟ ସେବା",
      subtitle: "ଆପଣଙ୍କ କର୍ମଜୀବନ, ବିବାହ, ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ଆଧ୍ୟାତ୍ମିକ ପ୍ରଗତି ପାଇଁ ସ୍ୱତନ୍ତ୍ର ପରାମର୍ଶ।",
      viewAll: "ସମସ୍ତ ସେବା ଦେଖନ୍ତୁ",
      priceStarting: "ପରାମର୍ଶ ଶୁଳ୍କ",
      durationMinutes: "ମିନିଟ୍"
    },
    kundliTool: {
      title: "ପ୍ରାମାଣିକ ବୈଦିକ ଜନ୍ମ କୁଣ୍ଡଳୀ",
      subtitle: "ସଠିକ୍ ଲାହିଡ଼ୀ ଅୟନାଂଶ ଅନୁଯାୟୀ ଲଗ୍ନ, ରାଶି ଏବଂ ଗ୍ରହ ସ୍ଥିତି ଗଣନା।",
      nameLabel: "ପୂରା ନାମ",
      dobLabel: "ଜନ୍ମ ତାରିଖ",
      tobLabel: "ସଠିକ୍ ଜନ୍ମ ସମୟ",
      pobLabel: "ଜନ୍ମ ସ୍ଥାନ (ସହର / ଜିଲ୍ଲା)",
      generateBtn: "କୁଣ୍ଡଳୀ ପ୍ରସ୍ତୁତ କରନ୍ତୁ",
      calculating: "ଗ୍ରହ ନକ୍ଷତ୍ର ଗଣନା କରାଯାଉଛି...",
      chartTitle: "ଜନ୍ମ ଲଗ୍ନ କୁଣ୍ଡଳୀ (D-1)",
      planetaryPositions: "ଗ୍ରହସ୍ଥିତି, ଅଂଶ ଓ ନକ୍ଷତ୍ର",
      lagna: "ଜନ୍ମ ଲଗ୍ନ",
      rashi: "ଜନ୍ମ ରାଶି",
      nakshatra: "ଜନ୍ମ ନକ୍ଷତ୍ର",
      disclaimer: "ଏହି ଗଣନା ପ୍ରାଚୀନ ନିରୟନ ବୈଦିକ ପଦ୍ଧତି ଅନୁସାରେ ପ୍ରସ୍ତୁତ।"
    },
    matchingTool: {
      title: "ବୈଦିକ କୁଣ୍ଡଳୀ ଯୋଟକ ମେଳକ",
      subtitle: "ବର ଏବଂ କନ୍ୟାଙ୍କ ମଧ୍ୟରେ ଅଷ୍ଟକୂଟ (୩୬ ଗୁଣ) ବିଚାର।",
      boyDetails: "ବରଙ୍କ ଜନ୍ମ ବିବରଣୀ",
      girlDetails: "କନ୍ୟାଙ୍କ ଜନ୍ମ ବିବରଣୀ",
      matchBtn: "ମେଳକ ଗୁଣ ଗଣନା କରନ୍ତୁ",
      score: "ସମୁଦାୟ ଗୁଣ ମିଳନ ସଂଖ୍ୟା",
      gunaMilan: "୩୬ ଗୁଣ ମଧ୍ୟରୁ",
      recommendation: "ଶାସ୍ତ୍ରୀୟ ବିଚାର ମତ"
    },
    bookingSection: {
      title: "ପରାମର୍ଶ ପାଇଁ ସମୟ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ",
      subtitle: "ଆପଣଙ୍କ ସୁବିଧା ଅନୁଯାୟୀ ଉପଯୁକ୍ତ ସମୟ ବାଛି ପରାମର୍ଶ ନିଶ୍ଚିତ କରନ୍ତୁ।",
      selectService: "ଜ୍ୟୋତିଷ ସେବା ଚୟନ କରନ୍ତୁ",
      selectDate: "ଆପଣଙ୍କ ପସନ୍ଦର ତାରିଖ",
      selectTime: "ଉପଲବ୍ଧ ସମୟ",
      personalDetails: "ଆପଣଙ୍କ ବିବରଣୀ",
      fullName: "ନାମ",
      email: "ଇମେଲ୍ ଠିକଣା",
      phone: "ହ୍ୱାଟ୍ସଆପ୍ / ଫୋନ୍ ନମ୍ବର",
      message: "ଆପଣଙ୍କ ପ୍ରଶ୍ନ ବା ସମସ୍ୟା (ଐଚ୍ଛିକ)",
      confirmBooking: "ନିଶ୍ଚିତ କରନ୍ତୁ",
      priceNotice: "ପରାମର୍ଶର ମାଧ୍ୟମ (ଦୂରଭାଷ / ଭିଡିଓ କଲ୍ / ସାକ୍ଷାତ) ଅନୁସାରେ ବିବରଣୀ ଜଣାଇ ଦିଆଯିବ।"
    }
  }
};
