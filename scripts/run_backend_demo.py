"""
Demo script to showcase CareerPro J&K FastAPI backend
Runs the server and demonstrates key features
"""

import subprocess
import time
import threading
import requests
from datetime import datetime

def start_fastapi_server():
    """Start the FastAPI server in a separate process"""
    print("🚀 Starting CareerPro J&K FastAPI Backend...")
    try:
        # Start the FastAPI server
        process = subprocess.Popen([
            "python", "scripts/fastapi_backend.py"
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Wait for server to start
        time.sleep(3)
        
        # Check if server is running
        try:
            response = requests.get("http://localhost:8000/health")
            if response.status_code == 200:
                print("✅ FastAPI server started successfully!")
                print("📚 API Documentation: http://localhost:8000/docs")
                return process
            else:
                print("❌ Server health check failed")
                return None
        except:
            print("❌ Could not connect to server")
            return None
            
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        return None

def demo_chat_functionality():
    """Demonstrate the chat functionality"""
    print("\n🤖 CareerPro J&K Chat Demo")
    print("=" * 40)
    
    demo_conversations = [
        {
            "user": "Hello! I'm a 12th grade student from Srinagar",
            "context": "Student introduction"
        },
        {
            "user": "I'm interested in engineering. What colleges are available in J&K?",
            "context": "Engineering college inquiry"
        },
        {
            "user": "Tell me about scholarships for engineering students",
            "context": "Scholarship information"
        },
        {
            "user": "When is the JEE Main registration deadline?",
            "context": "Entrance exam dates"
        },
        {
            "user": "मुझे हिंदी में जानकारी चाहिए",
            "context": "Language switch to Hindi"
        }
    ]
    
    for i, conv in enumerate(demo_conversations, 1):
        print(f"\n{i}. User: {conv['user']}")
        
        try:
            response = requests.post("http://localhost:8000/chat", json={
                "message": conv['user'],
                "user_id": "demo_user",
                "language": "hindi" if "हिंदी" in conv['user'] else "english"
            })
            
            if response.status_code == 200:
                data = response.json()
                print(f"   🤖 CareerPro: {data['response']}")
                if data['suggestions']:
                    print(f"   💡 Suggestions: {', '.join(data['suggestions'][:2])}...")
                if data['resources']:
                    print(f"   🔗 Resources: {len(data['resources'])} available")
            else:
                print(f"   ❌ Error: {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ Connection error: {e}")
        
        time.sleep(1)  # Small delay for readability

def demo_api_endpoints():
    """Demonstrate other API endpoints"""
    print("\n🔗 API Endpoints Demo")
    print("=" * 40)
    
    endpoints = [
        {
            "name": "J&K Government Colleges",
            "url": "http://localhost:8000/colleges",
            "method": "GET"
        },
        {
            "name": "Available Scholarships",
            "url": "http://localhost:8000/scholarships",
            "method": "GET"
        },
        {
            "name": "Entrance Exams",
            "url": "http://localhost:8000/entrance-exams",
            "method": "GET"
        },
        {
            "name": "Career Recommendations",
            "url": "http://localhost:8000/recommendations",
            "method": "POST",
            "data": {"interests": ["technology", "engineering"]}
        }
    ]
    
    for endpoint in endpoints:
        print(f"\n📡 Testing: {endpoint['name']}")
        try:
            if endpoint['method'] == 'GET':
                response = requests.get(endpoint['url'])
            else:
                response = requests.post(endpoint['url'], json=endpoint.get('data', {}))
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    print(f"   ✅ Retrieved {len(data)} items")
                elif isinstance(data, dict):
                    if 'recommendations' in data:
                        print(f"   ✅ Generated {len(data['recommendations'])} recommendations")
                    else:
                        print(f"   ✅ Response received with {len(data)} fields")
                else:
                    print(f"   ✅ Response: {str(data)[:100]}...")
            else:
                print(f"   ❌ Error: {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ Connection error: {e}")

def main():
    """Run the complete backend demo"""
    print("🎓 CareerPro J&K FastAPI Backend Demo")
    print("=" * 50)
    print(f"Demo started at: {datetime.now()}")
    
    # Start the FastAPI server
    server_process = start_fastapi_server()
    
    if server_process:
        try:
            # Demo chat functionality
            demo_chat_functionality()
            
            # Demo API endpoints
            demo_api_endpoints()
            
            print("\n" + "=" * 50)
            print("✅ Demo completed successfully!")
            print("\n🌐 Key Features Demonstrated:")
            print("   • J&K-specific career guidance chat")
            print("   • Government college information")
            print("   • Scholarship and exam details")
            print("   • Multilingual support (English/Hindi)")
            print("   • Career recommendations")
            
            print("\n📚 Access the API documentation at:")
            print("   http://localhost:8000/docs")
            
            print("\n⚠️  Server is still running. Press Ctrl+C to stop.")
            
            # Keep the demo running
            try:
                server_process.wait()
            except KeyboardInterrupt:
                print("\n🛑 Stopping server...")
                server_process.terminate()
                server_process.wait()
                print("✅ Server stopped.")
                
        except Exception as e:
            print(f"❌ Demo error: {e}")
            if server_process:
                server_process.terminate()
    else:
        print("❌ Could not start FastAPI server. Please check the setup.")

if __name__ == "__main__":
    main()
