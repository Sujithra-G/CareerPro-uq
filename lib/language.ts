// Language context and utilities for CareerPro
export type Language = "english" | "hindi"

export const translations = {
  english: {
    // Navigation
    dashboard: "Dashboard",
    quiz: "Quiz",
    recommendations: "AI Recommendations",
    colleges: "Colleges",
    timeline: "Timeline",
    chatbot: "CareerPro AI",
    settings: "Settings",
    logout: "Logout",

    // Common
    loading: "Loading...",
    error: "Error",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    next: "Next",
    previous: "Previous",
    viewAll: "View All",
    left: "left",
    match: "match",
    score: "Score",

    // Dashboard
    welcome: "Welcome back",
    welcomeMessage: "Your personalized career guidance for J&K government colleges",
    yourProgress: "Your Progress",
    profileCompletion: "Profile Completion",
    careerExploration: "Career Exploration",
    quickActions: "Quick Actions",
    getStartedWithCareerExploration: "Get started with your career exploration",
    yourTopCareerMatches: "Your Top Career Matches",
    basedOnYourQuizResults: "Based on your quiz results",
    careerAssessment: "Career Assessment",
    quizCompleted: "Quiz Completed!",
    retakeQuiz: "Retake Quiz",
    takeYourCareerQuiz: "Take Your Career Quiz",
    discoverYourIdealCareerPath: "Find your ideal career path",
    startQuiz: "Start Quiz",
    upcomingEvents: "Upcoming Events",
    needHelp: "Need Help?",
    chatWithCareerBuddy: "Chat with Career Buddy",
    browseHelpArticles: "Browse Help Articles",
    nearbyColleges: "Nearby Colleges",
    upcomingDeadlines: "Deadlines",
    scholarshipsAvailable: "Scholarships",
    viewJKColleges: "View J&K Colleges",

    // Quiz
    quizTitle: "Career Assessment Quiz",
    quizDescription: "Find your ideal career path",

    // Colleges
    collegesTitle: "J&K Government Colleges",

    // Chatbot
    chatbotTitle: "CareerPro AI Assistant",
    chatPlaceholder: "Ask about J&K colleges, admissions, or career guidance...",
    chatWelcome:
      "Hi there! I'm CareerPro, your AI-powered career guidance assistant. I'm here to help you with career advice, college information, exam dates, and more. How can I assist you today?",
    chatTyping: "Typing...",
    chatOnline: "Online • Ready to help",
    chatError: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
    quickSuggestions: "Quick suggestions:",
    viewCareerRecommendations: "View Career Recommendations",
    findNearbyColleges: "Find Nearby Colleges",
    checkImportantDates: "Check Important Dates",

    // Settings
    settingsTitle: "Settings",
    settingsDescription: "Customize your CareerPro experience for Jammu & Kashmir",
    profile: "Profile",
    profileDescription: "Your account information",
    email: "Email",
    region: "Region",
    regionValue: "Jammu & Kashmir, India",
    languageTitle: "Language / भाषा",
    languageDescription: "Choose your preferred language for the interface and AI responses",
    locationServices: "Location Services",
    locationDescription: "Enable location access to find nearby J&K government colleges",
    locationPermission: "Location Permission",
    locationGranted: "Location access granted",
    locationRequired: "Location access required for nearby colleges",
    enableLocation: "Enable Location",
    notifications: "Notifications",
    notificationsDescription: "Get notified about J&K admission dates, scholarships, and entrance tests",
    pushNotifications: "Push Notifications",
    pushNotificationsDescription: "Admission deadlines, scholarship alerts, and exam schedules",
    notificationTypes: "Notification Types:",
    aboutCareerPro: "About CareerPro",
    aboutDescription: "Your dedicated career guidance platform for Jammu & Kashmir students",
    version: "Version: 1.0.0",
    focusedOn: "Focused on J&K Government Colleges and State-specific guidance",
    poweredBy: "Powered by AI for personalized career recommendations",

    // J&K Colleges Page
    jkCollegesTitle: "Jammu & Kashmir Government Colleges",
    jkCollegesDescription:
      "Comprehensive information about government colleges in J&K with admission details, cut-offs, and eligibility criteria.",
    governmentColleges: "Government Colleges",
    updatedCutoffs: "Updated Cut-offs & Eligibility",
    multipleLanguages: "Multiple Languages Supported",
    searchAndFilter: "Search & Filter Colleges",
    searchPlaceholder: "Search colleges, courses, districts...",
    selectCourse: "Select Course",
    allCourses: "All Courses",
    selectDistrict: "Select District",
    allDistricts: "All Districts",
    clearFilters: "Clear Filters",
    showing: "Showing",
    of: "of",
    sortedByDistance: "(sorted by distance)",
    availableDegreePrograms: "Available Degree Programs",
    mediumOfInstruction: "Medium of Instruction",
    annualFees: "Annual Fees",
    cutoffsAndEligibility: "Cut-offs & Eligibility",
    eligibilityCriteria: "Eligibility Criteria",
    general: "General",
    obc: "OBC",
    sc: "SC",
    st: "ST",
    visitWebsite: "Visit Website",
    contactCollege: "Contact College",
    viewDetails: "View Details",
    noCollegesFound: "No colleges found",
    tryAdjusting: "Try adjusting your search criteria or filters.",
    clearAllFilters: "Clear All Filters",
    government: "Government",
    governmentAided: "Government Aided",
    established: "Est.",
    naacGrade: "NAAC",
    loadingColleges: "Loading J&K Government Colleges...",
  },
  hindi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    quiz: "प्रश्नावली",
    recommendations: "AI सुझाव",
    colleges: "कॉलेज",
    timeline: "समयसीमा",
    chatbot: "CareerPro AI",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",

    // Common
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    save: "सेव करें",
    cancel: "रद्द करें",
    submit: "जमा करें",
    next: "अगला",
    previous: "पिछला",
    viewAll: "सभी देखें",
    left: "बचे",
    match: "मैच",
    score: "स्कोर",

    // Dashboard
    welcome: "वापसी पर स्वागत",
    welcomeMessage: "जम्मू-कश्मीर सरकारी कॉलेजों के लिए आपका व्यक्तिगत करियर मार्गदर्शन",
    yourProgress: "आपकी प्रगति",
    profileCompletion: "प्रोफाइल पूर्णता",
    careerExploration: "करियर अन्वेषण",
    quickActions: "त्वरित कार्य",
    getStartedWithCareerExploration: "अपने करियर अन्वेषण की शुरुआत करें",
    yourTopCareerMatches: "आपके शीर्ष करियर मैच",
    basedOnYourQuizResults: "आपके प्रश्नावली परिणामों के आधार पर",
    careerAssessment: "करियर मूल्यांकन",
    quizCompleted: "प्रश्नावली पूर्ण!",
    retakeQuiz: "प्रश्नावली दोबारा लें",
    takeYourCareerQuiz: "अपनी करियर प्रश्नावली लें",
    discoverYourIdealCareerPath: "अपना आदर्श करियर पथ खोजें",
    startQuiz: "प्रश्नावली शुरू करें",
    upcomingEvents: "आगामी कार्यक्रम",
    needHelp: "सहायता चाहिए?",
    chatWithCareerBuddy: "करियर बडी से चैट करें",
    browseHelpArticles: "सहायता लेख ब्राउज़ करें",
    nearbyColleges: "नजदीकी कॉलेज",
    upcomingDeadlines: "आगामी समयसीमा",
    scholarshipsAvailable: "छात्रवृत्तियां",
    viewJKColleges: "जम्मू-कश्मीर कॉलेज देखें",

    // Quiz
    quizTitle: "करियर मूल्यांकन प्रश्नावली",
    quizDescription: "अपना आदर्श करियर पथ खोजें",

    // Colleges
    collegesTitle: "जम्मू-कश्मीर सरकारी कॉलेज",

    // Chatbot
    chatbotTitle: "CareerPro AI सहायक",
    chatPlaceholder: "जम्मू-कश्मीर कॉलेज, प्रवेश, या करियर मार्गदर्शन के बारे में पूछें...",
    chatWelcome:
      "नमस्ते! मैं CareerPro हूं, आपका AI-संचालित करियर मार्गदर्शन सहायक। मैं यहां करियर सलाह, कॉलेज की जानकारी, परीक्षा की तारीखों और बहुत कुछ के साथ आपकी मदद करने के लिए हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    chatTyping: "टाइप कर रहा है...",
    chatOnline: "ऑनलाइन • मदद के लिए तैयार",
    chatError: "मुझे खुशी है, मुझे अभी जवाब देने में परेशानी हो रही है। कृपया एक क्षण में फिर से कोशिश करें।",
    quickSuggestions: "त्वरित सुझाव:",
    viewCareerRecommendations: "करियर सुझाव देखें",
    findNearbyColleges: "नजदीकी कॉलेज खोजें",
    checkImportantDates: "महत्वपूर्ण तारीखें जांचें",

    // Settings
    settingsTitle: "सेटिंग्स",
    settingsDescription: "जम्मू और कश्मीर के लिए अपने CareerPro अनुभव को अनुकूलित करें",
    profile: "प्रोफाइल",
    profileDescription: "आपकी खाता जानकारी",
    email: "ईमेल",
    region: "क्षेत्र",
    regionValue: "जम्मू और कश्मीर, भारत",
    languageTitle: "भाषा / Language",
    languageDescription: "इंटरफेस और AI प्रतिक्रियाओं के लिए अपनी पसंदीदा भाषा चुनें",
    locationServices: "स्थान सेवाएं",
    locationDescription: "नजदीकी जम्मू-कश्मीर सरकारी कॉलेजों को खोजने के लिए स्थान पहुंच सक्षम करें",
    locationPermission: "स्थान अनुमति",
    locationGranted: "स्थान पहुंच प्रदान की गई",
    locationRequired: "नजदीकी कॉलेजों के लिए स्थान पहुंच आवश्यक",
    enableLocation: "स्थान सक्षम करें",
    notifications: "सूचनाएं",
    notificationsDescription: "जम्मू-कश्मीर प्रवेश तिथियों, छात्रवृत्तियों और प्रवेश परीक्षाओं के बारे में सूचित हों",
    pushNotifications: "पुश सूचनाएं",
    pushNotificationsDescription: "प्रवेश की अंतिम तिथि, छात्रवृत्ति अलर्ट, और परीक्षा कार्यक्रम",
    notificationTypes: "सूचना प्रकार:",
    aboutCareerPro: "CareerPro के बारे में",
    aboutDescription: "जम्मू और कश्मीर के छात्रों के लिए आपका समर्पित करियर मार्गदर्शन मंच",
    version: "संस्करण: 1.0.0",
    focusedOn: "जम्मू-कश्मीर सरकारी कॉलेजों और राज्य-विशिष्ट मार्गदर्शन पर केंद्रित",
    poweredBy: "व्यक्तिगत करियर सुझावों के लिए AI द्वारा संचालित",

    // J&K Colleges Page
    jkCollegesTitle: "जम्मू और कश्मीर सरकारी कॉलेज",
    jkCollegesDescription: "प्रवेश विवरण, कट-ऑफ और पात्रता मानदंड के साथ जम्मू-कश्मीर में सरकारी कॉलेजों की व्यापक जानकारी।",
    governmentColleges: "सरकारी कॉलेज",
    updatedCutoffs: "अपडेटेड कट-ऑफ और पात्रता",
    multipleLanguages: "कई भाषाओं का समर्थन",
    searchAndFilter: "कॉलेज खोजें और फ़िल्टर करें",
    searchPlaceholder: "कॉलेज, कोर्स, जिले खोजें...",
    selectCourse: "कोर्स चुनें",
    allCourses: "सभी कोर्स",
    selectDistrict: "जिला चुनें",
    allDistricts: "सभी जिले",
    clearFilters: "फ़िल्टर साफ़ करें",
    showing: "दिखा रहे हैं",
    of: "में से",
    sortedByDistance: "(दूरी के अनुसार क्रमबद्ध)",
    availableDegreePrograms: "उपलब्ध डिग्री कार्यक्रम",
    mediumOfInstruction: "शिक्षा का माध्यम",
    annualFees: "वार्षिक फीस",
    cutoffsAndEligibility: "कट-ऑफ और पात्रता",
    eligibilityCriteria: "पात्रता मानदंड",
    general: "सामान्य",
    obc: "ओबीसी",
    sc: "एससी",
    st: "एसटी",
    visitWebsite: "वेबसाइट देखें",
    contactCollege: "कॉलेज से संपर्क करें",
    viewDetails: "विवरण देखें",
    noCollegesFound: "कोई कॉलेज नहीं मिला",
    tryAdjusting: "अपने खोज मानदंड या फ़िल्टर को समायोजित करने का प्रयास करें।",
    clearAllFilters: "सभी फ़िल्टर साफ़ करें",
    government: "सरकारी",
    governmentAided: "सरकारी सहायता प्राप्त",
    established: "स्थापित",
    naacGrade: "NAAC",
    loadingColleges: "जम्मू-कश्मीर सरकारी कॉलेज लोड हो रहे हैं...",
  },
}

export function getTranslation(key: string, language: Language = "english"): string {
  const keys = key.split(".")
  let value: any = translations[language]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

export function getCurrentLanguage(): Language {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("careerpro-language") as Language) || "english"
  }
  return "english"
}
