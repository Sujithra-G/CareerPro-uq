"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import { Navigation } from "@/components/navigation"
import {
  Brain,
  TrendingUp,
  Users,
  Code,
  Palette,
  Calculator,
  Heart,
  RefreshCw,
  MapPin,
  Star,
  Phone,
  Globe,
  GraduationCap,
  IndianRupee,
  Clock,
} from "lucide-react"

interface Career {
  title: string
  description: string
  matchPercentage: number
  skills: string[]
  averageSalary: string
  growthRate: string
  icon: string
}

interface Course {
  name: string
  duration: string
  level: string
  description: string
}

interface JKCollege {
  name: string
  location: string
  district: string
  type: "Government" | "Government Aided"
  established: number
  rating: number
  fees: string
  courses: string[]
  eligibility: string
  website: string
  phone: string
  facilities: string[]
  admissionProcess: string
  scholarships: string[]
  placement: {
    percentage: number
    averagePackage: string
  }
  hostel: boolean
  naacGrade: string
  distance?: number // Will be calculated based on user location
}

interface RecommendationData {
  stream: string
  careers: Career[]
  courses: Course[]
  confidence: number
}

const careerIcons: Record<string, any> = {
  code: Code,
  palette: Palette,
  calculator: Calculator,
  heart: Heart,
  users: Users,
  brain: Brain,
}

// Mock J&K Government Colleges data
const jkGovernmentColleges: JKCollege[] = [
  {
    name: "Government College for Women, Srinagar",
    location: "Maulana Azad Road, Srinagar",
    district: "Srinagar",
    type: "Government",
    established: 1950,
    rating: 4.2,
    fees: "₹8,000 - ₹15,000 per year",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc.", "M.Com"],
    eligibility: "10+2 for UG, Graduation for PG",
    website: "https://gcwsrinagar.edu.in",
    phone: "+91-194-2452789",
    facilities: ["Library", "Computer Lab", "Sports Complex", "Canteen", "Medical Room"],
    admissionProcess: "Merit-based admission through J&K BOPEE",
    scholarships: ["Merit Scholarship", "SC/ST Scholarship", "Minority Scholarship"],
    placement: {
      percentage: 65,
      averagePackage: "₹3.5 LPA",
    },
    hostel: true,
    naacGrade: "B++",
  },
  {
    name: "Government College, Jammu",
    location: "Canal Road, Jammu",
    district: "Jammu",
    type: "Government",
    established: 1943,
    rating: 4.1,
    fees: "₹7,500 - ₹14,000 per year",
    courses: ["B.A.", "B.Sc.", "B.Com", "BBA", "BCA", "M.A.", "M.Sc.", "M.Com"],
    eligibility: "10+2 for UG, Graduation for PG",
    website: "https://gcjammu.edu.in",
    phone: "+91-191-2546789",
    facilities: ["Central Library", "IT Center", "Auditorium", "Sports Ground", "Cafeteria"],
    admissionProcess: "Merit-based through J&K BOPEE counseling",
    scholarships: ["Chief Minister's Scholarship", "Merit-cum-Means", "Post-Matric Scholarship"],
    placement: {
      percentage: 70,
      averagePackage: "₹4.2 LPA",
    },
    hostel: true,
    naacGrade: "A-",
  },
  {
    name: "Government Degree College, Baramulla",
    location: "Baramulla, Kashmir",
    district: "Baramulla",
    type: "Government",
    established: 1965,
    rating: 3.9,
    fees: "₹6,000 - ₹12,000 per year",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A. (English)", "M.A. (Urdu)"],
    eligibility: "10+2 for UG, Graduation for PG",
    website: "https://gdcbaramulla.edu.in",
    phone: "+91-194-2456123",
    facilities: ["Library", "Science Labs", "Computer Center", "Sports Facilities"],
    admissionProcess: "Merit-based admission",
    scholarships: ["State Scholarship", "Minority Scholarship"],
    placement: {
      percentage: 55,
      averagePackage: "₹2.8 LPA",
    },
    hostel: false,
    naacGrade: "B+",
  },
  {
    name: "Government College of Engineering & Technology, Jammu",
    location: "Chak Bhalwal, Jammu",
    district: "Jammu",
    type: "Government",
    established: 1986,
    rating: 4.3,
    fees: "₹45,000 - ₹65,000 per year",
    courses: ["B.Tech (CSE)", "B.Tech (ECE)", "B.Tech (ME)", "B.Tech (CE)", "M.Tech"],
    eligibility: "JEE Main for B.Tech, GATE for M.Tech",
    website: "https://gcetjammu.ac.in",
    phone: "+91-191-2434567",
    facilities: ["Modern Labs", "Workshop", "Library", "Hostel", "Placement Cell"],
    admissionProcess: "JEE Main counseling through J&K BOPEE",
    scholarships: ["Technical Education Scholarship", "Merit Scholarship"],
    placement: {
      percentage: 85,
      averagePackage: "₹6.5 LPA",
    },
    hostel: true,
    naacGrade: "A",
  },
  {
    name: "Government Medical College, Srinagar",
    location: "Karan Nagar, Srinagar",
    district: "Srinagar",
    type: "Government",
    established: 1959,
    rating: 4.5,
    fees: "₹25,000 - ₹35,000 per year",
    courses: ["MBBS", "MD", "MS", "Diploma Courses"],
    eligibility: "NEET for MBBS, NEET PG for MD/MS",
    website: "https://gmcsrinagar.edu.in",
    phone: "+91-194-2401234",
    facilities: ["Hospital", "Medical Library", "Research Labs", "Hostels"],
    admissionProcess: "NEET counseling through MCC/State quota",
    scholarships: ["State Medical Scholarship", "Merit Scholarship"],
    placement: {
      percentage: 95,
      averagePackage: "₹8.5 LPA",
    },
    hostel: true,
    naacGrade: "A+",
  },
  {
    name: "Government Degree College, Anantnag",
    location: "Anantnag, Kashmir",
    district: "Anantnag",
    type: "Government",
    established: 1972,
    rating: 3.8,
    fees: "₹5,500 - ₹11,000 per year",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A. (History)", "M.Sc. (Mathematics)"],
    eligibility: "10+2 for UG, Graduation for PG",
    website: "https://gdcanantnag.edu.in",
    phone: "+91-194-2234567",
    facilities: ["Library", "Computer Lab", "Science Labs", "Sports Ground"],
    admissionProcess: "Merit-based admission",
    scholarships: ["State Scholarship", "Minority Development Scholarship"],
    placement: {
      percentage: 50,
      averagePackage: "₹2.5 LPA",
    },
    hostel: false,
    naacGrade: "B",
  },
]

export default function RecommendationsPage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseParam = searchParams.get("course")

  const [recommendations, setRecommendations] = useState<RecommendationData | null>(null)
  const [colleges, setColleges] = useState<JKCollege[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingColleges, setIsLoadingColleges] = useState(false)
  const [error, setError] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      if (courseParam) {
        fetchCollegesForCourse(courseParam)
      } else {
        fetchRecommendations()
      }
    }
  }, [user, courseParam])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied:", error)
        },
      )
    }
  }, [])

  const fetchRecommendations = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Check if quiz is completed
      const quizCompleted = localStorage.getItem("quizCompleted")
      if (!quizCompleted) {
        router.push("/quiz")
        return
      }

      const mockRecommendations: RecommendationData = {
        stream: "Technology & Engineering",
        confidence: 87,
        careers: [
          {
            title: "Software Developer",
            description: "Develop applications and software solutions for government and private sector in J&K",
            matchPercentage: 92,
            skills: ["Programming", "Problem Solving", "Database Management"],
            averageSalary: "₹4.5 - 8 LPA",
            growthRate: "15% annually",
            icon: "code",
          },
          {
            title: "Civil Engineer",
            description: "Work on infrastructure development projects across Jammu & Kashmir",
            matchPercentage: 88,
            skills: ["AutoCAD", "Project Management", "Structural Design"],
            averageSalary: "₹3.5 - 6 LPA",
            growthRate: "12% annually",
            icon: "calculator",
          },
          {
            title: "Government Officer (Technical)",
            description: "Join J&K government services in technical departments",
            matchPercentage: 85,
            skills: ["Administration", "Technical Knowledge", "Communication"],
            averageSalary: "₹4 - 7 LPA",
            growthRate: "8% annually",
            icon: "users",
          },
        ],
        courses: [
          {
            name: "B.Tech Computer Science",
            duration: "4 years",
            level: "Undergraduate",
            description: "Comprehensive computer science program with focus on software development",
          },
          {
            name: "B.Tech Civil Engineering",
            duration: "4 years",
            level: "Undergraduate",
            description: "Civil engineering program focusing on infrastructure development",
          },
          {
            name: "Bachelor of Computer Applications (BCA)",
            duration: "3 years",
            level: "Undergraduate",
            description: "Computer applications program for software development careers",
          },
        ],
      }

      setRecommendations(mockRecommendations)
    } catch (err) {
      console.error("Error fetching recommendations:", err)
      setError("Failed to load recommendations. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCollegesForCourse = async (course: string) => {
    setIsLoadingColleges(true)
    setError("")

    try {
      const filteredColleges = jkGovernmentColleges.filter((college) =>
        college.courses.some(
          (c) => c.toLowerCase().includes(course.toLowerCase()) || course.toLowerCase().includes(c.toLowerCase()),
        ),
      )

      setColleges(filteredColleges)
    } catch (err) {
      console.error("Error fetching colleges:", err)
      setError("Failed to load colleges. Please try again.")
    } finally {
      setIsLoadingColleges(false)
      setIsLoading(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                {courseParam
                  ? "Loading J&K Government Colleges..."
                  : "Analyzing your responses and generating recommendations..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto p-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="text-destructive mb-4">{error}</p>
              <Button
                onClick={courseParam ? () => fetchCollegesForCourse(courseParam) : fetchRecommendations}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (courseParam && colleges.length > 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">J&K Government Colleges</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                Course: {courseParam}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {colleges.length} colleges found
              </Badge>
              <Button variant="outline" onClick={() => router.push("/recommendations")}>
                Back to Recommendations
              </Button>
            </div>
          </div>

          {/* Colleges Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {colleges.map((college, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{college.name}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{college.district}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{college.rating}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {college.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    Established {college.established} • NAAC Grade: {college.naacGrade}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-foreground flex items-center space-x-1">
                          <IndianRupee className="w-3 h-3" />
                          <span>Fees:</span>
                        </span>
                        <p className="text-muted-foreground">{college.fees}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">Placement:</span>
                        <p className="text-muted-foreground">
                          {college.placement.percentage}% • {college.placement.averagePackage}
                        </p>
                      </div>
                    </div>

                    {/* Courses */}
                    <div>
                      <span className="font-semibold text-sm text-foreground">Available Courses:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {college.courses.slice(0, 4).map((course, courseIndex) => (
                          <Badge key={courseIndex} variant="secondary" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                        {college.courses.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{college.courses.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Facilities */}
                    <div>
                      <span className="font-semibold text-sm text-foreground">Facilities:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {college.facilities.slice(0, 3).map((facility, facilityIndex) => (
                          <Badge key={facilityIndex} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {college.hostel && (
                          <Badge variant="outline" className="text-xs">
                            Hostel Available
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Scholarships */}
                    <div>
                      <span className="font-semibold text-sm text-foreground">Scholarships:</span>
                      <p className="text-xs text-muted-foreground">{college.scholarships.join(", ")}</p>
                    </div>

                    {/* Contact */}
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => window.open(college.website, "_blank")}
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        Website
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => window.open(`tel:${college.phone}`, "_blank")}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!recommendations) return null

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">AI Career Recommendations</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Recommended Stream: {recommendations.stream}
            </Badge>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{recommendations.confidence}% confidence match</span>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">
            Focused on opportunities in Jammu & Kashmir government sector and local industries
          </p>
        </div>

        {/* Career Recommendations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Top Career Matches for J&K</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.careers.map((career, index) => {
              const IconComponent = careerIcons[career.icon] || Brain
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="w-8 h-8 text-primary" />
                      <Badge variant="outline" className="text-primary">
                        {career.matchPercentage}% match
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{career.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{career.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Key Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {career.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-foreground">Avg. Salary:</span>
                          <p className="text-muted-foreground">{career.averageSalary}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-foreground">Growth:</span>
                          <p className="text-muted-foreground">{career.growthRate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Course Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Recommended Courses in J&K Colleges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.courses.map((course, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {course.duration}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/recommendations?course=${encodeURIComponent(course.name)}`)}
                    >
                      View J&K Colleges
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.push("/colleges")} className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>Explore J&K Colleges</span>
          </Button>
          <Button variant="outline" onClick={() => router.push("/timeline")}>
            View Admission Timeline
          </Button>
          <Button variant="outline" onClick={() => router.push("/quiz")}>
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  )
}
