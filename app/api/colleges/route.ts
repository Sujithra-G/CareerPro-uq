import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = Number.parseFloat(searchParams.get("lat") || "0")
    const lng = Number.parseFloat(searchParams.get("lng") || "0")
    const course = searchParams.get("course") || ""

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock college data - in a real app, this would query your Django backend
    const mockColleges = [
      {
        id: "1",
        name: "Indian Institute of Technology Chennai",
        location: "Chennai, Tamil Nadu",
        city: "Chennai",
        state: "Tamil Nadu",
        distance: 5.2,
        rating: 4.8,
        studentCount: 8500,
        courses: ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
        fees: "₹2,50,000/year",
        type: "Public" as const,
        established: 1959,
        website: "https://www.iitm.ac.in",
        description:
          "Premier engineering institute known for excellence in technical education and research with world-class faculty.",
      },
      {
        id: "2",
        name: "Anna University",
        location: "Chennai, Tamil Nadu",
        city: "Chennai",
        state: "Tamil Nadu",
        distance: 8.1,
        rating: 4.3,
        studentCount: 45000,
        courses: ["Engineering", "Technology", "Architecture", "Applied Sciences"],
        fees: "₹1,20,000/year",
        type: "Public" as const,
        established: 1978,
        website: "https://www.annauniv.edu",
        description:
          "State technical university offering diverse engineering and technology programs with strong industry connections.",
      },
      {
        id: "3",
        name: "Loyola College",
        location: "Chennai, Tamil Nadu",
        city: "Chennai",
        state: "Tamil Nadu",
        distance: 12.3,
        rating: 4.5,
        studentCount: 12000,
        courses: ["Commerce", "Science", "Arts", "Management"],
        fees: "₹85,000/year",
        type: "Private" as const,
        established: 1925,
        website: "https://www.loyolacollege.edu",
        description:
          "Prestigious autonomous college known for academic excellence and holistic development of students.",
      },
      {
        id: "4",
        name: "Stella Maris College",
        location: "Chennai, Tamil Nadu",
        city: "Chennai",
        state: "Tamil Nadu",
        distance: 15.7,
        rating: 4.4,
        studentCount: 8000,
        courses: ["Arts", "Science", "Commerce", "Social Work"],
        fees: "₹75,000/year",
        type: "Private" as const,
        established: 1947,
        website: "https://www.stellamariscollege.edu.in",
        description:
          "Women's college renowned for quality education and empowering women through comprehensive academic programs.",
      },
      {
        id: "5",
        name: "SRM Institute of Science and Technology",
        location: "Chennai, Tamil Nadu",
        city: "Chennai",
        state: "Tamil Nadu",
        distance: 18.9,
        rating: 4.2,
        studentCount: 38000,
        courses: ["Engineering", "Medicine", "Management", "Science"],
        fees: "₹2,75,000/year",
        type: "Private" as const,
        established: 1985,
        website: "https://www.srmist.edu.in",
        description:
          "Multi-disciplinary university offering diverse programs with modern infrastructure and research facilities.",
      },
      {
        id: "6",
        name: "Vellore Institute of Technology",
        location: "Vellore, Tamil Nadu",
        city: "Vellore",
        state: "Tamil Nadu",
        distance: 135.4,
        rating: 4.6,
        studentCount: 35000,
        courses: ["Engineering", "Technology", "Management", "Applied Sciences"],
        fees: "₹1,98,000/year",
        type: "Private" as const,
        established: 1984,
        website: "https://vit.ac.in",
        description: "Leading private university known for innovative teaching methods and strong placement records.",
      },
    ]

    // Filter by course if specified
    let filteredColleges = mockColleges
    if (course) {
      filteredColleges = mockColleges.filter((college) =>
        college.courses.some((c) => c.toLowerCase().includes(course.toLowerCase())),
      )
    }

    console.log(`Colleges API called for location: ${lat}, ${lng}, course: ${course}`)

    return NextResponse.json(
      {
        colleges: filteredColleges,
        location: { lat, lng },
        totalCount: filteredColleges.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error fetching colleges:", error)
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 })
  }
}
