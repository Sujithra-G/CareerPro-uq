"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import { Navigation } from "@/components/navigation"
import {
  MapPin,
  Search,
  Filter,
  Star,
  GraduationCap,
  ExternalLink,
  Loader2,
  Phone,
  IndianRupee,
  Award,
  BookOpen,
  Calendar,
} from "lucide-react"

interface JKCollege {
  id: string
  name: string
  location: string
  district: string
  courses: string[]
  cutoffs: {
    general: string
    obc: string
    sc: string
    st: string
  }
  eligibility: string[]
  mediumOfInstruction: string[]
  fees: string
  type: "Government" | "Government Aided"
  established: number
  website: string
  phone: string
  description: string
  naacGrade: string
  rating: number
  studentCount: number
  placement: {
    percentage: number
    averagePackage: string
  }
}

// J&K Government Colleges focused on academic details
const jkGovernmentColleges: JKCollege[] = [
  {
    id: "gcw-srinagar",
    name: "Government College for Women, Srinagar",
    location: "Maulana Azad Road, Srinagar",
    district: "Srinagar",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc.", "M.Com", "BBA", "BCA"],
    cutoffs: {
      general: "75-85%",
      obc: "70-80%",
      sc: "65-75%",
      st: "60-70%",
    },
    eligibility: [
      "10+2 from recognized board",
      "Minimum 50% for general category",
      "Minimum 45% for reserved categories",
      "Age limit: 17-25 years",
    ],
    mediumOfInstruction: ["English", "Urdu"],
    fees: "₹8,000 - ₹15,000 per year",
    type: "Government",
    established: 1950,
    website: "https://gcwsrinagar.edu.in",
    phone: "+91-194-2452789",
    description: "Premier women's college in Kashmir offering quality education in arts, science, and commerce.",
    naacGrade: "B++",
    rating: 4.2,
    studentCount: 2500,
    placement: { percentage: 65, averagePackage: "₹3.5 LPA" },
  },
  {
    id: "gc-jammu",
    name: "Government College, Jammu",
    location: "Canal Road, Jammu",
    district: "Jammu",
    courses: ["B.A.", "B.Sc.", "B.Com", "BBA", "BCA", "M.A.", "M.Sc.", "M.Com"],
    cutoffs: {
      general: "80-90%",
      obc: "75-85%",
      sc: "70-80%",
      st: "65-75%",
    },
    eligibility: [
      "10+2 from J&K Board or equivalent",
      "Minimum 50% for general category",
      "Minimum 45% for reserved categories",
      "Domicile certificate required",
    ],
    mediumOfInstruction: ["English", "Hindi", "Urdu"],
    fees: "₹7,500 - ₹14,000 per year",
    type: "Government",
    established: 1943,
    website: "https://gcjammu.edu.in",
    phone: "+91-191-2546789",
    description: "One of the oldest and most prestigious colleges in Jammu region.",
    naacGrade: "A-",
    rating: 4.1,
    studentCount: 3200,
    placement: { percentage: 70, averagePackage: "₹4.2 LPA" },
  },
  {
    id: "gcet-jammu",
    name: "Government College of Engineering & Technology, Jammu",
    location: "Chak Bhalwal, Jammu",
    district: "Jammu",
    courses: ["B.Tech (CSE)", "B.Tech (ECE)", "B.Tech (ME)", "B.Tech (CE)", "M.Tech"],
    cutoffs: {
      general: "JEE Main Rank: 15,000-25,000",
      obc: "JEE Main Rank: 20,000-30,000",
      sc: "JEE Main Rank: 25,000-40,000",
      st: "JEE Main Rank: 30,000-50,000",
    },
    eligibility: [
      "10+2 with PCM (Physics, Chemistry, Mathematics)",
      "Minimum 75% in 10+2 for general category",
      "Minimum 65% for reserved categories",
      "Valid JEE Main score",
      "J&K domicile certificate",
    ],
    mediumOfInstruction: ["English"],
    fees: "₹45,000 - ₹65,000 per year",
    type: "Government",
    established: 1986,
    website: "https://gcetjammu.ac.in",
    phone: "+91-191-2434567",
    description: "Premier engineering college in J&K offering undergraduate and postgraduate technical education.",
    naacGrade: "A",
    rating: 4.3,
    studentCount: 1200,
    placement: { percentage: 85, averagePackage: "₹6.5 LPA" },
  },
  {
    id: "gmc-srinagar",
    name: "Government Medical College, Srinagar",
    location: "Karan Nagar, Srinagar",
    district: "Srinagar",
    courses: ["MBBS", "MD", "MS", "Diploma Courses"],
    cutoffs: {
      general: "NEET Rank: 1,000-5,000",
      obc: "NEET Rank: 3,000-8,000",
      sc: "NEET Rank: 5,000-15,000",
      st: "NEET Rank: 8,000-20,000",
    },
    eligibility: [
      "10+2 with PCB (Physics, Chemistry, Biology)",
      "Minimum 50% in 10+2 for general category",
      "Minimum 40% for reserved categories",
      "Valid NEET score",
      "Age limit: 17-25 years (30 for reserved)",
    ],
    mediumOfInstruction: ["English"],
    fees: "₹25,000 - ₹35,000 per year",
    type: "Government",
    established: 1959,
    website: "https://gmcsrinagar.edu.in",
    phone: "+91-194-2401234",
    description: "Leading medical college in Kashmir providing quality medical education and healthcare services.",
    naacGrade: "A+",
    rating: 4.5,
    studentCount: 800,
    placement: { percentage: 95, averagePackage: "₹8.5 LPA" },
  },
  {
    id: "gdc-baramulla",
    name: "Government Degree College, Baramulla",
    location: "Baramulla, Kashmir",
    district: "Baramulla",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A. (English)", "M.A. (Urdu)"],
    cutoffs: {
      general: "60-70%",
      obc: "55-65%",
      sc: "50-60%",
      st: "45-55%",
    },
    eligibility: [
      "10+2 from recognized board",
      "Minimum 45% for general category",
      "Minimum 40% for reserved categories",
      "Local domicile preferred",
    ],
    mediumOfInstruction: ["English", "Urdu"],
    fees: "₹6,000 - ₹12,000 per year",
    type: "Government",
    established: 1965,
    website: "https://gdcbaramulla.edu.in",
    phone: "+91-194-2456123",
    description:
      "Government college serving the Baramulla district with quality undergraduate and postgraduate programs.",
    naacGrade: "B+",
    rating: 3.9,
    studentCount: 1800,
    placement: { percentage: 55, averagePackage: "₹2.8 LPA" },
  },
  {
    id: "gdc-anantnag",
    name: "Government Degree College, Anantnag",
    location: "Anantnag, Kashmir",
    district: "Anantnag",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A. (History)", "M.Sc. (Mathematics)"],
    cutoffs: {
      general: "55-65%",
      obc: "50-60%",
      sc: "45-55%",
      st: "40-50%",
    },
    eligibility: [
      "10+2 from J&K Board or equivalent",
      "Minimum 45% for general category",
      "Minimum 40% for reserved categories",
      "Age limit: 17-22 years",
    ],
    mediumOfInstruction: ["English", "Urdu"],
    fees: "₹5,500 - ₹11,000 per year",
    type: "Government",
    established: 1972,
    website: "https://gdcanantnag.edu.in",
    phone: "+91-194-2234567",
    description: "Government college in South Kashmir providing affordable higher education.",
    naacGrade: "B",
    rating: 3.8,
    studentCount: 1500,
    placement: { percentage: 50, averagePackage: "₹2.5 LPA" },
  },
  {
    id: "gdc-rajouri",
    name: "Government Degree College, Rajouri",
    location: "Rajouri, Jammu",
    district: "Rajouri",
    courses: ["B.A.", "B.Sc.", "B.Com", "BBA"],
    cutoffs: {
      general: "58-68%",
      obc: "53-63%",
      sc: "48-58%",
      st: "43-53%",
    },
    eligibility: [
      "10+2 from recognized board",
      "Minimum 45% for general category",
      "Minimum 40% for reserved categories",
      "Tribal area certificate (if applicable)",
    ],
    mediumOfInstruction: ["English", "Hindi", "Urdu"],
    fees: "₹6,500 - ₹12,500 per year",
    type: "Government",
    established: 1978,
    website: "https://gdcrajouri.edu.in",
    phone: "+91-191-2634567",
    description: "Government college in Pir Panjal region providing higher education opportunities.",
    naacGrade: "B+",
    rating: 3.6,
    studentCount: 1400,
    placement: { percentage: 52, averagePackage: "₹2.6 LPA" },
  },
  {
    id: "gdc-kupwara",
    name: "Government Degree College, Kupwara",
    location: "Kupwara, Kashmir",
    district: "Kupwara",
    courses: ["B.A.", "B.Sc.", "B.Com"],
    cutoffs: {
      general: "50-60%",
      obc: "45-55%",
      sc: "40-50%",
      st: "35-45%",
    },
    eligibility: [
      "10+2 from recognized board",
      "Minimum 40% for general category",
      "Minimum 35% for reserved categories",
      "Border area certificate preferred",
    ],
    mediumOfInstruction: ["English", "Urdu"],
    fees: "₹5,000 - ₹10,000 per year",
    type: "Government",
    established: 1985,
    website: "https://gdckupwara.edu.in",
    phone: "+91-194-2567890",
    description: "Government college serving the border district of Kupwara with undergraduate programs.",
    naacGrade: "B",
    rating: 3.7,
    studentCount: 1200,
    placement: { percentage: 45, averagePackage: "₹2.2 LPA" },
  },
]

export default function JKCollegesPage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [colleges, setColleges] = useState<JKCollege[]>(jkGovernmentColleges)
  const [filteredColleges, setFilteredColleges] = useState<JKCollege[]>(jkGovernmentColleges)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedDistrict, setSelectedDistrict] = useState("all")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  useEffect(() => {
    filterColleges()
  }, [searchTerm, selectedCourse, selectedDistrict])

  const filterColleges = () => {
    let filtered = colleges

    if (searchTerm) {
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCourse !== "all") {
      filtered = filtered.filter((college) =>
        college.courses.some((course) => course.toLowerCase().includes(selectedCourse.toLowerCase())),
      )
    }

    if (selectedDistrict !== "all") {
      filtered = filtered.filter((college) => college.district === selectedDistrict)
    }

    setFilteredColleges(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCourse("all")
    setSelectedDistrict("all")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">{t("loadingColleges")}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  const availableCourses = Array.from(new Set(colleges.flatMap((college) => college.courses))).sort()
  const availableDistricts = Array.from(new Set(colleges.map((college) => college.district))).sort()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">{t("jkCollegesTitle")}</h1>
          </div>
          <p className="text-muted-foreground mb-4">{t("jkCollegesDescription")}</p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Badge variant="outline">
              {colleges.length} {t("governmentColleges")}
            </Badge>
            <Badge variant="outline">{t("updatedCutoffs")}</Badge>
            <Badge variant="outline">{t("multipleLanguages")}</Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>{t("searchAndFilter")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectCourse")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allCourses")}</SelectItem>
                  {availableCourses.map((course) => (
                    <SelectItem key={course} value={course.toLowerCase()}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectDistrict")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allDistricts")}</SelectItem>
                  {availableDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={clearFilters}>
                {t("clearFilters")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {t("showing")} {filteredColleges.length} {t("of")} {colleges.length} {t("jkCollegesTitle")}{" "}
            {t("sortedByDistance")}
          </p>
        </div>

        {/* College Cards */}
        <div className="space-y-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{college.name}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{college.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{college.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {t("established")} {college.established}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant="default">{t("government")}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {t("naacGrade")} {college.naacGrade}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed">{college.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Available Degree Programs */}
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{t("availableDegreePrograms")}</span>
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {college.courses.map((course, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Medium of Instruction */}
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">{t("mediumOfInstruction")}</h4>
                      <div className="flex flex-wrap gap-1">
                        {college.mediumOfInstruction.map((medium, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {medium}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Fees */}
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center space-x-1">
                        <IndianRupee className="w-4 h-4" />
                        <span>{t("annualFees")}</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">{college.fees}</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Cut-offs */}
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">{t("cutoffsAndEligibility")}</h4>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-muted p-2 rounded">
                            <span className="font-medium">{t("general")}:</span> {college.cutoffs.general}
                          </div>
                          <div className="bg-muted p-2 rounded">
                            <span className="font-medium">{t("obc")}:</span> {college.cutoffs.obc}
                          </div>
                          <div className="bg-muted p-2 rounded">
                            <span className="font-medium">{t("sc")}:</span> {college.cutoffs.sc}
                          </div>
                          <div className="bg-muted p-2 rounded">
                            <span className="font-medium">{t("st")}:</span> {college.cutoffs.st}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Eligibility Criteria */}
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">{t("eligibilityCriteria")}</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {college.eligibility.map((criteria, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span className="text-primary">•</span>
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-border mt-6">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => window.open(college.website, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {t("visitWebsite")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => window.open(`tel:${college.phone}`, "_self")}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      {t("contactCollege")}
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="flex-1"
                      onClick={() => router.push(`/college-details/${college.id}`)}
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {t("viewDetails")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredColleges.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{t("noCollegesFound")}</h3>
              <p className="text-muted-foreground mb-4">{t("tryAdjusting")}</p>
              <Button onClick={clearFilters}>{t("clearAllFilters")}</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
