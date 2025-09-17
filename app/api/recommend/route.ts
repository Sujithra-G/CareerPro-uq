import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, quizAnswers } = body

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI recommendation based on quiz answers
    // In a real app, this would connect to your FastAPI backend with ML models
    const mockRecommendations = {
      stream: "Technology & Engineering",
      confidence: 87,
      careers: [
        {
          title: "Software Developer",
          description:
            "Design, develop, and maintain software applications and systems using various programming languages and frameworks.",
          matchPercentage: 92,
          skills: ["Programming", "Problem Solving", "Algorithms", "Database Design"],
          averageSalary: "$75,000 - $120,000",
          growthRate: "22% (Much faster than average)",
          icon: "code",
        },
        {
          title: "Data Scientist",
          description:
            "Analyze complex data to help organizations make informed business decisions using statistical methods and machine learning.",
          matchPercentage: 88,
          skills: ["Statistics", "Python/R", "Machine Learning", "Data Visualization"],
          averageSalary: "$80,000 - $130,000",
          growthRate: "31% (Much faster than average)",
          icon: "brain",
        },
        {
          title: "UX/UI Designer",
          description:
            "Create intuitive and visually appealing user interfaces for websites, mobile apps, and software applications.",
          matchPercentage: 85,
          skills: ["Design Thinking", "Prototyping", "User Research", "Visual Design"],
          averageSalary: "$65,000 - $110,000",
          growthRate: "13% (Faster than average)",
          icon: "palette",
        },
        {
          title: "Product Manager",
          description:
            "Guide the development and strategy of products from conception to launch, working with cross-functional teams.",
          matchPercentage: 82,
          skills: ["Strategy", "Communication", "Analytics", "Leadership"],
          averageSalary: "$85,000 - $140,000",
          growthRate: "19% (Much faster than average)",
          icon: "users",
        },
        {
          title: "Financial Analyst",
          description:
            "Evaluate investment opportunities, analyze financial data, and provide recommendations for business decisions.",
          matchPercentage: 78,
          skills: ["Financial Modeling", "Excel", "Analysis", "Reporting"],
          averageSalary: "$60,000 - $95,000",
          growthRate: "6% (As fast as average)",
          icon: "calculator",
        },
        {
          title: "Healthcare Administrator",
          description:
            "Manage healthcare facilities, coordinate patient care, and ensure efficient operations in medical settings.",
          matchPercentage: 75,
          skills: ["Healthcare Knowledge", "Management", "Communication", "Compliance"],
          averageSalary: "$70,000 - $115,000",
          growthRate: "32% (Much faster than average)",
          icon: "heart",
        },
      ],
      courses: [
        {
          name: "Bachelor of Computer Science",
          duration: "4 years",
          level: "Undergraduate",
          description:
            "Comprehensive program covering programming, algorithms, software engineering, and computer systems.",
        },
        {
          name: "Bachelor of Information Technology",
          duration: "4 years",
          level: "Undergraduate",
          description:
            "Focus on practical application of technology in business environments and system administration.",
        },
        {
          name: "Data Science Certification",
          duration: "6-12 months",
          level: "Professional",
          description: "Intensive program covering statistics, machine learning, and data analysis tools.",
        },
        {
          name: "UX Design Bootcamp",
          duration: "3-6 months",
          level: "Professional",
          description: "Hands-on training in user experience design, prototyping, and user research methods.",
        },
      ],
    }

    console.log("AI Recommendations generated for user:", userId)

    return NextResponse.json(mockRecommendations, { status: 200 })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
