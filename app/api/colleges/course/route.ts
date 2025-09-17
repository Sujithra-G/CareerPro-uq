import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const course = searchParams.get("course")

    if (!course) {
      return NextResponse.json({ error: "Course parameter is required" }, { status: 400 })
    }

    const mockColleges = [
      {
        name: "Indian Institute of Technology Delhi",
        location: "New Delhi, India",
        rating: 4.8,
        fees: "₹2.5L per year",
        duration: "4 years",
        eligibility: "JEE Advanced qualified",
        website: "https://home.iitd.ac.in/",
      },
      {
        name: "Indian Institute of Science",
        location: "Bangalore, India",
        rating: 4.9,
        fees: "₹3L per year",
        duration: "4 years",
        eligibility: "JEE Advanced/KVPY qualified",
        website: "https://iisc.ac.in/",
      },
      {
        name: "Delhi Technological University",
        location: "Delhi, India",
        rating: 4.3,
        fees: "₹1.5L per year",
        duration: "4 years",
        eligibility: "JEE Main qualified",
        website: "https://dtu.ac.in/",
      },
      {
        name: "Birla Institute of Technology and Science",
        location: "Pilani, India",
        rating: 4.5,
        fees: "₹4L per year",
        duration: "4 years",
        eligibility: "BITSAT qualified",
        website: "https://www.bits-pilani.ac.in/",
      },
      {
        name: "Vellore Institute of Technology",
        location: "Vellore, India",
        rating: 4.2,
        fees: "₹2L per year",
        duration: "4 years",
        eligibility: "VITEEE qualified",
        website: "https://vit.ac.in/",
      },
      {
        name: "Manipal Institute of Technology",
        location: "Manipal, India",
        rating: 4.1,
        fees: "₹3.5L per year",
        duration: "4 years",
        eligibility: "MET qualified",
        website: "https://manipal.edu/",
      },
    ]

    // Filter colleges based on course (in real implementation, this would be more sophisticated)
    const filteredColleges = mockColleges.filter(() => Math.random() > 0.3) // Random filtering for demo

    return NextResponse.json({
      success: true,
      course,
      colleges: filteredColleges.slice(0, 6), // Return top 6 colleges
    })
  } catch (error) {
    console.error("Error fetching course colleges:", error)
    return NextResponse.json({ error: "Failed to fetch colleges for course" }, { status: 500 })
  }
}
