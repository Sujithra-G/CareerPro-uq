"""
FastAPI Backend for CareerPro J&K
Provides chat endpoint and J&K-specific career guidance APIs
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import json
import uvicorn
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="CareerPro J&K API",
    description="Career guidance API for Jammu & Kashmir students",
    version="1.0.0"
)

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class ChatMessage(BaseModel):
    message: str
    user_id: str
    language: str = "english"
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    response: str
    suggestions: List[str]
    resources: List[Dict[str, str]]
    timestamp: datetime

class JKCollege(BaseModel):
    name: str
    location: str
    district: str
    type: str
    courses: List[str]
    fees: str
    rating: float
    website: str
    phone: str

class CareerRecommendation(BaseModel):
    title: str
    match_percentage: int
    description: str
    skills: List[str]
    salary_range: str
    growth_rate: str

# J&K Specific Knowledge Base
JK_KNOWLEDGE_BASE = {
    "colleges": [
        {
            "name": "Government College for Women, Srinagar",
            "district": "Srinagar",
            "type": "Government",
            "courses": ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
            "fees": "₹8,000 - ₹15,000 per year",
            "rating": 4.2,
            "website": "https://gcwsrinagar.edu.in",
            "phone": "+91-194-2452789",
            "specialties": ["Women's Education", "Arts", "Science", "Commerce"]
        },
        {
            "name": "Government College of Engineering & Technology, Jammu",
            "district": "Jammu",
            "type": "Government",
            "courses": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "B.Tech CE"],
            "fees": "₹45,000 - ₹65,000 per year",
            "rating": 4.3,
            "website": "https://gcetjammu.ac.in",
            "phone": "+91-191-2434567",
            "specialties": ["Engineering", "Technology", "Placement Cell"]
        },
        {
            "name": "Government Medical College, Srinagar",
            "district": "Srinagar",
            "type": "Government",
            "courses": ["MBBS", "MD", "MS", "Diploma Courses"],
            "fees": "₹25,000 - ₹35,000 per year",
            "rating": 4.5,
            "website": "https://gmcsrinagar.edu.in",
            "phone": "+91-194-2401234",
            "specialties": ["Medical Education", "Healthcare", "Research"]
        }
    ],
    "scholarships": [
        {
            "name": "J&K Merit Scholarship",
            "eligibility": "Students with 80%+ marks in 12th",
            "amount": "₹50,000 per year",
            "deadline": "January 15, 2025",
            "website": "https://jkscholarships.gov.in"
        },
        {
            "name": "Chief Minister's Scholarship",
            "eligibility": "Economically weaker sections",
            "amount": "₹25,000 per year",
            "deadline": "February 28, 2025",
            "website": "https://jkscholarships.gov.in"
        }
    ],
    "entrance_exams": [
        {
            "name": "JEE Main",
            "for": "Engineering Admissions",
            "registration_deadline": "December 15, 2024",
            "exam_date": "January 2025",
            "website": "https://jeemain.nta.nic.in"
        },
        {
            "name": "NEET",
            "for": "Medical Admissions",
            "registration_deadline": "December 20, 2024",
            "exam_date": "May 2025",
            "website": "https://neet.nta.nic.in"
        }
    ],
    "career_paths": {
        "engineering": {
            "opportunities": ["Software Developer", "Civil Engineer", "Government Jobs"],
            "salary_range": "₹3.5 - 8 LPA",
            "growth_prospects": "High demand in J&K IT sector and infrastructure development"
        },
        "medical": {
            "opportunities": ["Doctor", "Medical Officer", "Specialist"],
            "salary_range": "₹6 - 15 LPA",
            "growth_prospects": "High demand in J&K healthcare sector"
        },
        "arts": {
            "opportunities": ["Teacher", "Civil Services", "Content Writer"],
            "salary_range": "₹2.5 - 6 LPA",
            "growth_prospects": "Government jobs and education sector opportunities"
        }
    }
}

# Chat Response Templates
CHAT_RESPONSES = {
    "english": {
        "greeting": "Hello! I'm your CareerPro AI assistant for Jammu & Kashmir. How can I help you with your career guidance today?",
        "college_info": "Here are some top J&K government colleges that might interest you:",
        "scholarship_info": "Here are available scholarships for J&K students:",
        "exam_info": "Here are important entrance exams for J&K students:",
        "career_guidance": "Based on your interests, here are some career paths popular in J&K:",
        "default": "I'm here to help with J&K-specific career guidance. You can ask me about colleges, scholarships, entrance exams, or career opportunities in Jammu & Kashmir."
    },
    "hindi": {
        "greeting": "नमस्ते! मैं जम्मू-कश्मीर के लिए आपका CareerPro AI सहायक हूं। आज मैं आपके करियर मार्गदर्शन में कैसे मदद कर सकता हूं?",
        "college_info": "यहां कुछ शीर्ष जम्मू-कश्मीर सरकारी कॉलेज हैं जो आपकी रुचि के हो सकते हैं:",
        "scholarship_info": "यहां जम्मू-कश्मीर के छात्रों के लिए उपलब्ध छात्रवृत्तियां हैं:",
        "exam_info": "यहां जम्मू-कश्मीर के छात्रों के लिए महत्वपूर्ण प्रवेश परीक्षाएं हैं:",
        "career_guidance": "आपकी रुचियों के आधार पर, यहां जम्मू-कश्मीर में लोकप्रिय कुछ करियर पथ हैं:",
        "default": "मैं जम्मू-कश्मीर विशिष्ट करियर मार्गदर्शन में मदद के लिए यहां हूं। आप मुझसे कॉलेज, छात्रवृत्ति, प्रवेश परीक्षा, या जम्मू-कश्मीर में करियर के अवसरों के बारे में पूछ सकते हैं।"
    }
}

def get_chat_response(message: str, language: str = "english") -> ChatResponse:
    """Generate AI response for J&K-specific career queries"""
    message_lower = message.lower()
    responses = CHAT_RESPONSES.get(language, CHAT_RESPONSES["english"])
    
    # Determine intent and generate response
    if any(word in message_lower for word in ["hello", "hi", "namaste", "नमस्ते"]):
        response_text = responses["greeting"]
        suggestions = [
            "Tell me about J&K government colleges",
            "What scholarships are available?",
            "Entrance exam information",
            "Career opportunities in J&K"
        ]
        resources = []
        
    elif any(word in message_lower for word in ["college", "कॉलेज", "university", "विश्वविद्यालय"]):
        response_text = responses["college_info"]
        suggestions = [
            "Engineering colleges in J&K",
            "Medical colleges in J&K",
            "Arts colleges in Srinagar",
            "Admission process"
        ]
        resources = [
            {"title": college["name"], "url": college["website"], "type": "college"}
            for college in JK_KNOWLEDGE_BASE["colleges"][:3]
        ]
        
    elif any(word in message_lower for word in ["scholarship", "छात्रवृत्ति", "financial aid"]):
        response_text = responses["scholarship_info"]
        suggestions = [
            "Merit-based scholarships",
            "Need-based scholarships",
            "Application deadlines",
            "Eligibility criteria"
        ]
        resources = [
            {"title": scholarship["name"], "url": scholarship["website"], "type": "scholarship"}
            for scholarship in JK_KNOWLEDGE_BASE["scholarships"]
        ]
        
    elif any(word in message_lower for word in ["exam", "परीक्षा", "entrance", "प्रवेश"]):
        response_text = responses["exam_info"]
        suggestions = [
            "JEE Main registration",
            "NEET application",
            "Exam dates",
            "Preparation tips"
        ]
        resources = [
            {"title": exam["name"], "url": exam["website"], "type": "exam"}
            for exam in JK_KNOWLEDGE_BASE["entrance_exams"]
        ]
        
    elif any(word in message_lower for word in ["career", "करियर", "job", "नौकरी"]):
        response_text = responses["career_guidance"]
        suggestions = [
            "Engineering careers",
            "Medical careers",
            "Government jobs",
            "Private sector opportunities"
        ]
        resources = [
            {"title": "J&K Career Opportunities", "url": "#", "type": "career"},
            {"title": "Government Job Portal", "url": "#", "type": "job"}
        ]
        
    else:
        response_text = responses["default"]
        suggestions = [
            "Show me J&K colleges",
            "Available scholarships",
            "Entrance exam dates",
            "Career guidance"
        ]
        resources = []
    
    return ChatResponse(
        response=response_text,
        suggestions=suggestions,
        resources=resources,
        timestamp=datetime.now()
    )

# API Endpoints
@app.get("/")
async def root():
    return {"message": "CareerPro J&K API is running!", "version": "1.0.0"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat_message: ChatMessage):
    """
    Main chat endpoint for J&K career guidance
    """
    try:
        logger.info(f"Chat request from user {chat_message.user_id}: {chat_message.message}")
        
        response = get_chat_response(chat_message.message, chat_message.language)
        
        logger.info(f"Generated response for user {chat_message.user_id}")
        return response
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/colleges", response_model=List[Dict[str, Any]])
async def get_jk_colleges(district: Optional[str] = None, course: Optional[str] = None):
    """
    Get J&K government colleges with optional filtering
    """
    colleges = JK_KNOWLEDGE_BASE["colleges"]
    
    if district:
        colleges = [c for c in colleges if c["district"].lower() == district.lower()]
    
    if course:
        colleges = [c for c in colleges if any(course.lower() in course_name.lower() for course_name in c["courses"])]
    
    return colleges

@app.get("/scholarships", response_model=List[Dict[str, Any]])
async def get_jk_scholarships():
    """
    Get available scholarships for J&K students
    """
    return JK_KNOWLEDGE_BASE["scholarships"]

@app.get("/entrance-exams", response_model=List[Dict[str, Any]])
async def get_entrance_exams():
    """
    Get entrance exam information for J&K students
    """
    return JK_KNOWLEDGE_BASE["entrance_exams"]

@app.post("/recommendations")
async def get_career_recommendations(user_data: Dict[str, Any]):
    """
    Get personalized career recommendations for J&K students
    """
    # Mock recommendation logic based on user interests
    interests = user_data.get("interests", [])
    
    recommendations = []
    
    if "technology" in interests or "engineering" in interests:
        recommendations.append({
            "title": "Software Developer",
            "match_percentage": 92,
            "description": "Develop software solutions for J&K government and private sector",
            "skills": ["Programming", "Problem Solving", "Database Management"],
            "salary_range": "₹4.5 - 8 LPA",
            "growth_rate": "15% annually"
        })
    
    if "medical" in interests or "healthcare" in interests:
        recommendations.append({
            "title": "Medical Officer",
            "match_percentage": 88,
            "description": "Serve in J&K healthcare system as a medical professional",
            "skills": ["Medical Knowledge", "Patient Care", "Emergency Response"],
            "salary_range": "₹6 - 12 LPA",
            "growth_rate": "10% annually"
        })
    
    if "teaching" in interests or "education" in interests:
        recommendations.append({
            "title": "Government Teacher",
            "match_percentage": 85,
            "description": "Teach in J&K government schools and colleges",
            "skills": ["Subject Expertise", "Communication", "Classroom Management"],
            "salary_range": "₹3 - 6 LPA",
            "growth_rate": "8% annually"
        })
    
    return {"recommendations": recommendations}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now()}

if __name__ == "__main__":
    print("Starting CareerPro J&K FastAPI Backend...")
    print("API Documentation available at: http://localhost:8000/docs")
    print("Chat endpoint: http://localhost:8000/chat")
    print("Colleges endpoint: http://localhost:8000/colleges")
    
    uvicorn.run(
        "fastapi_backend:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
