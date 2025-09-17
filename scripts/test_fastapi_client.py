"""
Test client for CareerPro J&K FastAPI backend
Demonstrates API usage and functionality
"""

import requests
import json
from datetime import datetime

# API Base URL
BASE_URL = "http://localhost:8000"

def test_chat_endpoint():
    """Test the chat endpoint with various queries"""
    print("🤖 Testing Chat Endpoint")
    print("=" * 50)
    
    test_messages = [
        {
            "message": "Hello, I need help with career guidance",
            "user_id": "test_user_1",
            "language": "english"
        },
        {
            "message": "Tell me about engineering colleges in J&K",
            "user_id": "test_user_1",
            "language": "english"
        },
        {
            "message": "What scholarships are available for students?",
            "user_id": "test_user_1",
            "language": "english"
        },
        {
            "message": "मुझे जम्मू-कश्मीर के कॉलेजों के बारे में बताएं",
            "user_id": "test_user_1",
            "language": "hindi"
        }
    ]
    
    for i, message_data in enumerate(test_messages, 1):
        print(f"\n{i}. Testing: {message_data['message']}")
        print(f"   Language: {message_data['language']}")
        
        try:
            response = requests.post(f"{BASE_URL}/chat", json=message_data)
            if response.status_code == 200:
                data = response.json()
                print(f"   ✅ Response: {data['response'][:100]}...")
                print(f"   📝 Suggestions: {len(data['suggestions'])} available")
                print(f"   🔗 Resources: {len(data['resources'])} provided")
            else:
                print(f"   ❌ Error: {response.status_code}")
        except Exception as e:
            print(f"   ❌ Connection Error: {e}")

def test_colleges_endpoint():
    """Test the colleges endpoint"""
    print("\n🏫 Testing Colleges Endpoint")
    print("=" * 50)
    
    # Test all colleges
    try:
        response = requests.get(f"{BASE_URL}/colleges")
        if response.status_code == 200:
            colleges = response.json()
            print(f"✅ Found {len(colleges)} J&K government colleges")
            for college in colleges:
                print(f"   • {college['name']} ({college['district']})")
        else:
            print(f"❌ Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")
    
    # Test filtered by district
    print("\n🔍 Testing district filter (Srinagar):")
    try:
        response = requests.get(f"{BASE_URL}/colleges?district=Srinagar")
        if response.status_code == 200:
            colleges = response.json()
            print(f"✅ Found {len(colleges)} colleges in Srinagar")
            for college in colleges:
                print(f"   • {college['name']}")
        else:
            print(f"❌ Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")

def test_scholarships_endpoint():
    """Test the scholarships endpoint"""
    print("\n💰 Testing Scholarships Endpoint")
    print("=" * 50)
    
    try:
        response = requests.get(f"{BASE_URL}/scholarships")
        if response.status_code == 200:
            scholarships = response.json()
            print(f"✅ Found {len(scholarships)} scholarships available")
            for scholarship in scholarships:
                print(f"   • {scholarship['name']}: {scholarship['amount']}")
                print(f"     Deadline: {scholarship['deadline']}")
        else:
            print(f"❌ Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")

def test_entrance_exams_endpoint():
    """Test the entrance exams endpoint"""
    print("\n📝 Testing Entrance Exams Endpoint")
    print("=" * 50)
    
    try:
        response = requests.get(f"{BASE_URL}/entrance-exams")
        if response.status_code == 200:
            exams = response.json()
            print(f"✅ Found {len(exams)} entrance exams")
            for exam in exams:
                print(f"   • {exam['name']} for {exam['for']}")
                print(f"     Registration Deadline: {exam['registration_deadline']}")
        else:
            print(f"❌ Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")

def test_recommendations_endpoint():
    """Test the career recommendations endpoint"""
    print("\n🎯 Testing Career Recommendations Endpoint")
    print("=" * 50)
    
    test_user_data = {
        "user_id": "test_user_1",
        "interests": ["technology", "engineering"],
        "academic_performance": "good",
        "location_preference": "jammu_kashmir"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/recommendations", json=test_user_data)
        if response.status_code == 200:
            data = response.json()
            recommendations = data.get("recommendations", [])
            print(f"✅ Generated {len(recommendations)} career recommendations")
            for rec in recommendations:
                print(f"   • {rec['title']} ({rec['match_percentage']}% match)")
                print(f"     Salary: {rec['salary_range']}")
                print(f"     Growth: {rec['growth_rate']}")
        else:
            print(f"❌ Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")

def test_health_endpoint():
    """Test the health check endpoint"""
    print("\n❤️ Testing Health Check Endpoint")
    print("=" * 50)
    
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API Status: {data['status']}")
            print(f"   Timestamp: {data['timestamp']}")
        else:
            print(f"❌ Error: {response.status_code}")
    except Exception as e:
        print(f"❌ Connection Error: {e}")

def main():
    """Run all API tests"""
    print("🚀 CareerPro J&K FastAPI Backend Test Suite")
    print("=" * 60)
    print(f"Testing API at: {BASE_URL}")
    print(f"Test started at: {datetime.now()}")
    
    # Test all endpoints
    test_health_endpoint()
    test_chat_endpoint()
    test_colleges_endpoint()
    test_scholarships_endpoint()
    test_entrance_exams_endpoint()
    test_recommendations_endpoint()
    
    print("\n" + "=" * 60)
    print("✅ Test Suite Completed!")
    print("\n💡 To start the FastAPI server, run:")
    print("   python scripts/fastapi_backend.py")
    print("\n📚 API Documentation available at:")
    print("   http://localhost:8000/docs")

if __name__ == "__main__":
    main()
