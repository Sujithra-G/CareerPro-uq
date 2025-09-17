import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, userId, language = "english", conversationHistory } = body

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock AI responses based on message content and language
    let response = ""

    const lowerMessage = message.toLowerCase()

    if (language === "hindi") {
      if (lowerMessage.includes("career") || lowerMessage.includes("करियर")) {
        response = `आपकी रुचियों और कौशल के आधार पर, मैं प्रौद्योगिकी, स्वास्थ्य सेवा, या व्यापार में करियर का पता लगाने की सिफारिश करूंगा। क्या आपने हमारी करियर मूल्यांकन प्रश्नावली ली है? यह आपकी योग्यता और रुचियों के आधार पर व्यक्तिगत सिफारिशें प्रदान कर सकती है।\n\nक्या आप चाहेंगे कि मैं आपको कुछ करियर विकल्पों के माध्यम से मार्गदर्शन करूं, या आप पहले प्रश्नावली लेना पसंद करेंगे?`
      } else if (lowerMessage.includes("engineering") || lowerMessage.includes("इंजीनियरिंग")) {
        response = `इंजीनियरिंग कई विशेषज्ञताओं के साथ एक शानदार क्षेत्र है! यहां कुछ लोकप्रिय इंजीनियरिंग करियर हैं:\n\n🔧 **सॉफ्टवेयर इंजीनियरिंग** - एप्लिकेशन और सिस्टम डिज़ाइन और विकसित करें\n⚡ **इलेक्ट्रिकल इंजीनियरिंग** - विद्युत प्रणालियों और इलेक्ट्रॉनिक्स के साथ काम करें\n🏗️ **सिविल इंजीनियरिंग** - पुलों और इमारतों जैसे बुनियादी ढांचे को डिज़ाइन करें\n⚙️ **मैकेनिकल इंजीनियरिंग** - मशीनों और यांत्रिक प्रणालियों को डिज़ाइन करें\n🧪 **केमिकल इंजीनियरिंग** - औद्योगिक प्रक्रियाओं में रसायन विज्ञान लागू करें\n\nकिस प्रकार की इंजीनियरिंग आपको सबसे ज्यादा दिलचस्प लगती है? मैं इनमें से किसी भी क्षेत्र के बारे में अधिक विशिष्ट जानकारी प्रदान कर सकता हूं।`
      } else if (lowerMessage.includes("college") || lowerMessage.includes("कॉलेज")) {
        response = `सही कॉलेज चुनना आपकी करियर सफलता के लिए महत्वपूर्ण है! यहां विचार करने योग्य मुख्य कारक हैं:\n\n📍 **स्थान** - घर से दूरी, जलवायु, शहरी बनाम ग्रामीण\n🎓 **कार्यक्रम** - आपके वांछित प्रमुख की गुणवत्ता, संकाय विशेषज्ञता\n💰 **लागत** - ट्यूशन, रहने का खर्च, वित्तीय सहायता उपलब्धता\n🏫 **कैंपस जीवन** - आकार, संस्कृति, पाठ्येतर गतिविधियां\n📈 **करियर सेवाएं** - नौकरी प्लेसमेंट दरें, इंटर्नशिप अवसर\n\nमैं आपकी रुचियों से मेल खाने वाले आपके पास के कॉलेजों को खोजने में आपकी मदद कर सकता हूं। क्या आप चाहेंगे कि मैं आपके स्थान के आधार पर कुछ विकल्प दिखाऊं?`
      } else {
        response = `यह एक बेहतरीन सवाल है! मैं यहां करियर मार्गदर्शन, कॉलेज की जानकारी, परीक्षा कार्यक्रम और छात्रवृत्ति के अवसरों के साथ आपकी मदद करने के लिए हूं।\n\nयहां कुछ तरीके हैं जिनसे मैं आपकी सहायता कर सकता हूं:\n• **करियर सलाह** - उपयुक्त करियर पथ खोजने में आपकी मदद करें\n• **कॉलेज की जानकारी** - आपके लिए सही संस्थान खोजें\n• **समयसीमा प्रबंधन** - महत्वपूर्ण तारीखों का ट्रैक रखें\n• **छात्रवृत्ति मार्गदर्शन** - फंडिंग के अवसर खोजें\n\nक्या आप मुझे और विशेष रूप से बता सकते हैं कि आप क्या जानना चाहते हैं? मैं आपकी करियर यात्रा के लिए व्यक्तिगत मार्गदर्शन प्रदान करने के लिए यहां हूं!`
      }
    } else {
      // English responses (existing logic)
      if (lowerMessage.includes("career") && lowerMessage.includes("best")) {
        response = `Based on your interests and skills, I'd recommend exploring careers in technology, healthcare, or business. Have you taken our career assessment quiz yet? It can provide personalized recommendations based on your aptitude and interests.\n\nWould you like me to guide you through some career options, or would you prefer to take the quiz first?`
      } else if (lowerMessage.includes("engineering")) {
        response = `Engineering is a fantastic field with many specializations! Here are some popular engineering careers:\n\n🔧 **Software Engineering** - Design and develop applications and systems\n⚡ **Electrical Engineering** - Work with electrical systems and electronics  \n🏗️ **Civil Engineering** - Design infrastructure like bridges and buildings\n⚙️ **Mechanical Engineering** - Design machines and mechanical systems\n🧪 **Chemical Engineering** - Apply chemistry to industrial processes\n\nWhich type of engineering interests you most? I can provide more specific information about any of these fields.`
      } else if (lowerMessage.includes("college") || lowerMessage.includes("choose")) {
        response = `Choosing the right college is crucial for your career success! Here are key factors to consider:\n\n📍 **Location** - Distance from home, climate, urban vs rural\n🎓 **Programs** - Quality of your desired major, faculty expertise\n💰 **Cost** - Tuition, living expenses, financial aid availability\n🏫 **Campus Life** - Size, culture, extracurricular activities\n📈 **Career Services** - Job placement rates, internship opportunities\n\nI can help you find colleges near you that match your interests. Would you like me to show you some options based on your location?`
      } else if (lowerMessage.includes("scholarship")) {
        response = `There are many scholarship opportunities available! Here are some types to explore:\n\n💡 **Merit-based** - Based on academic achievement or test scores\n💰 **Need-based** - Based on family financial situation  \n🎯 **Field-specific** - For particular majors like STEM or arts\n🌍 **Demographic** - For specific communities or backgrounds\n🏆 **Competition-based** - Essay contests, talent competitions\n\nI can help you find scholarships that match your profile. What field are you interested in studying? Also, check our timeline section for upcoming scholarship deadlines!`
      } else if (lowerMessage.includes("exam") || lowerMessage.includes("date")) {
        response = `Here are some important upcoming exam dates:\n\n📚 **JEE Main 2024** - Registration ongoing until Dec 30\n🩺 **NEET 2024** - Application deadline Dec 15  \n📖 **CBSE Board Exams** - Registration starts Jan 5, 2025\n🎓 **CAT 2024** - Results already declared\n\nFor the most up-to-date information and complete timeline, I recommend checking our Timeline section. Would you like me to show you more details about any specific exam?`
      } else if (lowerMessage.includes("planning") || lowerMessage.includes("help")) {
        response = `I'm here to help with your career planning! Here's how I can assist:\n\n✅ **Career Assessment** - Take our quiz to discover your ideal career path\n🎯 **Personalized Recommendations** - Get AI-powered career suggestions\n🏫 **College Search** - Find institutions that match your goals\n📅 **Timeline Management** - Track important deadlines and dates\n💬 **Ongoing Support** - Ask me questions anytime!\n\nWhat specific area would you like to focus on first? I can guide you through any of these steps.`
      } else if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
        response = `Hello! Great to meet you! I'm CareerPro, and I'm excited to help you navigate your career journey. \n\nI can assist you with:\n• Career recommendations based on your interests\n• College and university information  \n• Scholarship opportunities\n• Important exam dates and deadlines\n• General career planning advice\n\nWhat would you like to explore today? Feel free to ask me anything about your career path!`
      } else {
        response = `That's a great question! I'm here to help you with career guidance, college information, exam schedules, and scholarship opportunities.\n\nHere are some ways I can assist you:\n• **Career Advice** - Help you discover suitable career paths\n• **College Information** - Find the right institutions for you\n• **Timeline Management** - Keep track of important dates\n• **Scholarship Guidance** - Find funding opportunities\n\nCould you tell me more specifically what you'd like to know? I'm here to provide personalized guidance for your career journey!`
      }
    }

    console.log(`Chatbot response generated for user: ${userId} in ${language}`)

    return NextResponse.json({ response }, { status: 200 })
  } catch (error) {
    console.error("Error generating chat response:", error)
    return NextResponse.json(
      { response: "I'm sorry, I'm having trouble responding right now. Please try again in a moment." },
      { status: 500 },
    )
  }
}
