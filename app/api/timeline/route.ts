import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock timeline events - in a real app, this would query your Django backend
    const mockEvents = [
      {
        id: "1",
        title: "JEE Main 2024 Registration",
        description: "Joint Entrance Examination for engineering admissions opens for registration.",
        date: "2024-12-01",
        endDate: "2024-12-30",
        type: "exam" as const,
        priority: "high" as const,
        status: "ongoing" as const,
        institution: "National Testing Agency",
        eligibility: ["12th Pass", "Physics, Chemistry, Math"],
        link: "https://jeemain.nta.nic.in",
      },
      {
        id: "2",
        title: "NEET 2024 Application Deadline",
        description: "Last date to apply for National Eligibility cum Entrance Test for medical courses.",
        date: "2024-12-15",
        type: "deadline" as const,
        priority: "high" as const,
        status: "upcoming" as const,
        institution: "National Testing Agency",
        eligibility: ["12th Pass", "Biology, Physics, Chemistry"],
        link: "https://neet.nta.nic.in",
      },
      {
        id: "3",
        title: "Merit Scholarship for Engineering Students",
        description: "Government scholarship program for meritorious students pursuing engineering degrees.",
        date: "2024-12-20",
        type: "scholarship" as const,
        priority: "medium" as const,
        status: "upcoming" as const,
        amount: "₹50,000 per year",
        eligibility: ["Engineering Student", "Minimum 85% marks", "Family income < ₹8 LPA"],
        link: "https://scholarships.gov.in",
      },
      {
        id: "4",
        title: "IIT Admissions 2024",
        description: "Admission process begins for Indian Institutes of Technology based on JEE Advanced scores.",
        date: "2024-12-25",
        endDate: "2025-01-15",
        type: "admission" as const,
        priority: "high" as const,
        status: "upcoming" as const,
        institution: "Indian Institutes of Technology",
        eligibility: ["JEE Advanced Qualified", "Top 2,50,000 in JEE Main"],
        link: "https://jeeadv.ac.in",
      },
      {
        id: "5",
        title: "CBSE Board Exam Registration",
        description: "Registration for Class 12 board examinations opens for private candidates.",
        date: "2025-01-05",
        type: "exam" as const,
        priority: "medium" as const,
        status: "upcoming" as const,
        institution: "Central Board of Secondary Education",
        eligibility: ["Class 12 Student", "Private Candidate"],
        link: "https://cbse.gov.in",
      },
      {
        id: "6",
        title: "State University Counseling",
        description: "Counseling process for state university admissions based on entrance exam scores.",
        date: "2025-01-10",
        endDate: "2025-01-25",
        type: "admission" as const,
        priority: "medium" as const,
        status: "upcoming" as const,
        institution: "State Universities",
        eligibility: ["State Entrance Exam Qualified", "Domicile Certificate"],
        link: "https://stateuniversity.edu.in",
      },
      {
        id: "7",
        title: "Minority Scholarship Application",
        description: "Scholarship program for students from minority communities pursuing higher education.",
        date: "2025-01-15",
        type: "scholarship" as const,
        priority: "low" as const,
        status: "upcoming" as const,
        amount: "₹30,000 per year",
        eligibility: ["Minority Community", "Merit-based", "Family income < ₹6 LPA"],
        link: "https://minorityaffairs.gov.in",
      },
      {
        id: "8",
        title: "CAT 2023 Results",
        description: "Common Admission Test results declared for MBA admissions.",
        date: "2023-12-21",
        type: "exam" as const,
        priority: "high" as const,
        status: "past" as const,
        institution: "Indian Institutes of Management",
        eligibility: ["Graduate Degree", "50% marks"],
        link: "https://iimcat.ac.in",
      },
    ]

    console.log("Timeline API called")

    return NextResponse.json(
      {
        events: mockEvents,
        totalCount: mockEvents.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error fetching timeline:", error)
    return NextResponse.json({ error: "Failed to fetch timeline events" }, { status: 500 })
  }
}
