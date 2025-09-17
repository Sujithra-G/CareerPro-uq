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
  Users,
  GraduationCap,
  ExternalLink,
  Loader2,
  AlertCircle,
  Phone,
  NavigationIcon,
  IndianRupee,
  Award,
} from "lucide-react"

interface JKCollege {
  id: string
  name: string
  location: string
  district: string
  coordinates: { lat: number; lng: number }
  distance?: number
  rating: number
  studentCount: number
  courses: string[]
  fees: string
  type: "Government" | "Government Aided"
  established: number
  website: string
  phone: string
  description: string
  naacGrade: string
  facilities: string[]
  hostel: boolean
  scholarships: string[]
  placement: {
    percentage: number
    averagePackage: string
  }
}

// J&K Government Colleges with coordinates
const jkGovernmentColleges: JKCollege[] = [
  {
    id: "gcw-srinagar",
    name: "Government College for Women, Srinagar",
    location: "Maulana Azad Road, Srinagar",
    district: "Srinagar",
    coordinates: { lat: 34.0837, lng: 74.7973 },
    rating: 4.2,
    studentCount: 2500,
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc.", "M.Com", "BBA", "BCA"],
    fees: "₹8,000 - ₹15,000 per year",
    type: "Government",
    established: 1950,
    website: "https://gcwsrinagar.edu.in",
    phone: "+91-194-2452789",
    description: "Premier women's college in Kashmir offering quality education in arts, science, and commerce.",
    naacGrade: "B++",
    facilities: ["Library", "Computer Lab", "Sports Complex", "Canteen", "Medical Room"],
    hostel: true,
    scholarships: ["Merit Scholarship", "SC/ST Scholarship", "Minority Scholarship"],
    placement: { percentage: 65, averagePackage: "₹3.5 LPA" },
  },
  {
    id: "gc-jammu",
    name: "Government College, Jammu",
    location: "Canal Road, Jammu",
    district: "Jammu",
    coordinates: { lat: 32.7266, lng: 74.857 },
    rating: 4.1,
    studentCount: 3200,
    courses: ["B.A.", "B.Sc.", "B.Com", "BBA", "BCA", "M.A.", "M.Sc.", "M.Com"],
    fees: "₹7,500 - ₹14,000 per year",
    type: "Government",
    established: 1943,
    website: "https://gcjammu.edu.in",
    phone: "+91-191-2546789",
    description: "One of the oldest and most prestigious colleges in Jammu region.",
    naacGrade: "A-",
    facilities: ["Central Library", "IT Center", "Auditorium", "Sports Ground", "Cafeteria"],
    hostel: true,
    scholarships: ["Chief Minister's Scholarship", "Merit-cum-Means", "Post-Matric Scholarship"],
    placement: { percentage: 70, averagePackage: "₹4.2 LPA" },
  },
  {
    id: "gdc-baramulla",
    name: "Government Degree College, Baramulla",
    location: "Baramulla, Kashmir",
    district: "Baramulla",
    coordinates: { lat: 34.2097, lng: 74.3436 },
    rating: 3.9,
    studentCount: 1800,
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A. (English)", "M.A. (Urdu)"],
    fees: "₹6,000 - ₹12,000 per year",
    type: "Government",
    established: 1965,
    website: "https://gdcbaramulla.edu.in",
    phone: "+91-194-2456123",
    description:
      "Government college serving the Baramulla district with quality undergraduate and postgraduate programs.",
    naacGrade: "B+",
    facilities: ["Library", "Science Labs", "Computer Center", "Sports Facilities"],
    hostel: false,
    scholarships: ["State Scholarship", "Minority Scholarship"],
    placement: { percentage: 55, averagePackage: "₹2.8 LPA" },
  },
  {
    id: "gcet-jammu",
    name: "Government College of Engineering & Technology, Jammu",
    location: "Chak Bhalwal, Jammu",
    district: "Jammu",
    coordinates: { lat: 32.691, lng: 74.8306 },
    rating: 4.3,
    studentCount: 1200,
    courses: ["B.Tech (CSE)", "B.Tech (ECE)", "B.Tech (ME)", "B.Tech (CE)", "M.Tech"],
    fees: "₹45,000 - ₹65,000 per year",
    type: "Government",
    established: 1986,
    website: "https://gcetjammu.ac.in",
    phone: "+91-191-2434567",
    description: "Premier engineering college in J&K offering undergraduate and postgraduate technical education.",
    naacGrade: "A",
    facilities: ["Modern Labs", "Workshop", "Library", "Hostel", "Placement Cell"],
    hostel: true,
    scholarships: ["Technical Education Scholarship", "Merit Scholarship"],
    placement: { percentage: 85, averagePackage: "₹6.5 LPA" },
  },
  {
    id: "gmc-srinagar",
    name: "Government Medical College, Srinagar",
    location: "Karan Nagar, Srinagar",
    district: "Srinagar",
    coordinates: { lat: 34.0479, lng: 74.7864 },
    rating: 4.5,
    studentCount: 800,
    courses: ["MBBS", "MD", "MS", "Diploma Courses"],
    fees: "₹25,000 - ₹35,000 per year",
    type: "Government",
    established: 1959,
    website: "https://gmcsrinagar.edu.in",
    phone: "+91-194-2401234",
    description: "Leading medical college in Kashmir providing quality medical education and healthcare services.",
    naacGrade: "A+",
    facilities: ["Hospital", "Medical Library", "Research Labs", "Hostels"],
    hostel: true,
    scholarships: ["State Medical Scholarship", "Merit Scholarship"],
    placement: { percentage: 95, averagePackage: "₹8.5 LPA" },
  },
  {
    id: "gdc-anantnag",
    name: "Government Degree College, Anantnag",
    location: "Anantnag, Kashmir",
    district: "Anantnag",
    coordinates: { lat: 33.7311, lng: 75.148 },
    rating: 3.8,
    studentCount: 1500,
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A. (History)", "M.Sc. (Mathematics)"],
    fees: "₹5,500 - ₹11,000 per year",
    type: "Government",
    established: 1972,
    website: "https://gdcanantnag.edu.in",
    phone: "+91-194-2234567",
    description: "Government college in South Kashmir providing affordable higher education.",
    naacGrade: "B",
    facilities: ["Library", "Computer Lab", "Science Labs", "Sports Ground"],
    hostel: false,
    scholarships: ["State Scholarship", "Minority Development Scholarship"],
    placement: { percentage: 50, averagePackage: "₹2.5 LPA" },
  },
  {
    id: "gdc-kupwara",
    name: "Government Degree College, Kupwara",
    location: "Kupwara, Kashmir",
    district: "Kupwara",
    coordinates: { lat: 34.5267, lng: 74.2551 },
    rating: 3.7,
    studentCount: 1200,
    courses: ["B.A.", "B.Sc.", "B.Com"],
    fees: "₹5,000 - ₹10,000 per year",
    type: "Government",
    established: 1985,
    website: "https://gdckupwara.edu.in",
    phone: "+91-194-2567890",
    description: "Government college serving the border district of Kupwara with undergraduate programs.",
    naacGrade: "B",
    facilities: ["Library", "Computer Lab", "Sports Ground"],
    hostel: false,
    scholarships: ["Border Area Scholarship", "State Scholarship"],
    placement: { percentage: 45, averagePackage: "₹2.2 LPA" },
  },
  {
    id: "gdc-rajouri",
    name: "Government Degree College, Rajouri",
    location: "Rajouri, Jammu",
    district: "Rajouri",
    coordinates: { lat: 33.3783, lng: 74.3117 },
    rating: 3.6,
    studentCount: 1400,
    courses: ["B.A.", "B.Sc.", "B.Com", "BBA"],
    fees: "₹6,500 - ₹12,500 per year",
    type: "Government",
    established: 1978,
    website: "https://gdcrajouri.edu.in",
    phone: "+91-191-2634567",
    description: "Government college in Pir Panjal region providing higher education opportunities.",
    naacGrade: "B+",
    facilities: ["Library", "Computer Center", "Science Labs", "Canteen"],
    hostel: false,
    scholarships: ["Tribal Area Scholarship", "Merit Scholarship"],
    placement: { percentage: 52, averagePackage: "₹2.6 LPA" },
  },
]

export default function CollegesPage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [colleges, setColleges] = useState<JKCollege[]>([])
  const [filteredColleges, setFilteredColleges] = useState<JKCollege[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "pending">("pending")
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "name">("distance")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      requestLocation()
    }
  }, [user])

  useEffect(() => {
    filterAndSortColleges()
  }, [colleges, searchTerm, selectedCourse, selectedDistrict, sortBy, userLocation])

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLng = (lng2 - lng1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Math.round(R * c)
  }

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationPermission("granted")
          loadCollegesWithDistance(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationPermission("denied")
          // Use Srinagar as default location for J&K
          loadCollegesWithDistance(34.0837, 74.7973)
        },
      )
    } else {
      setLocationPermission("denied")
      loadCollegesWithDistance(34.0837, 74.7973)
    }
  }

  const loadCollegesWithDistance = (userLat: number, userLng: number) => {
    setIsLoading(true)
    setError("")

    try {
      const collegesWithDistance = jkGovernmentColleges.map((college) => ({
        ...college,
        distance: calculateDistance(userLat, userLng, college.coordinates.lat, college.coordinates.lng),
      }))

      setColleges(collegesWithDistance)
    } catch (err) {
      console.error("Error loading colleges:", err)
      setError("Failed to load colleges. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortColleges = () => {
    let filtered = colleges

    if (searchTerm) {
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCourse) {
      filtered = filtered.filter((college) =>
        college.courses.some((course) => course.toLowerCase().includes(selectedCourse.toLowerCase())),
      )
    }

    if (selectedDistrict) {
      filtered = filtered.filter((college) => college.district === selectedDistrict)
    }

    // Sort colleges
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return (a.distance || 0) - (b.distance || 0)
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredColleges(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCourse("")
    setSelectedDistrict("")
    setSortBy("distance")
  }

  const openInMaps = (college: JKCollege) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${college.coordinates.lat},${college.coordinates.lng}`
    window.open(url, "_blank")
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Finding J&K Government Colleges near you...</p>
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
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => loadCollegesWithDistance(34.0837, 74.7973)}>Try Again</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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
            <h1 className="text-3xl font-bold text-foreground">J&K Government Colleges</h1>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>
                {locationPermission === "granted"
                  ? "Showing colleges near your location"
                  : "Showing all J&K Government Colleges"}
              </span>
            </div>
            <Badge variant="outline">{colleges.length} colleges available</Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Search & Filter</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search colleges, districts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {availableCourses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {availableDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value: "distance" | "rating" | "name") => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredColleges.length} of {colleges.length} J&K Government Colleges
            {sortBy === "distance" && locationPermission === "granted" && " (sorted by distance)"}
          </p>
        </div>

        {/* College Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{college.name}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{college.district}</span>
                      </div>
                      {college.distance && (
                        <>
                          <span>•</span>
                          <span>{college.distance} km away</span>
                        </>
                      )}
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{college.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant="default">{college.type}</Badge>
                    <Badge variant="outline" className="text-xs">
                      NAAC {college.naacGrade}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed">{college.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{college.studentCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-secondary" />
                      <span>Est. {college.established}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-accent" />
                      <span>{college.placement.percentage}% placed</span>
                    </div>
                  </div>

                  {/* Courses */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">Available Courses</h4>
                    <div className="flex flex-wrap gap-1">
                      {college.courses.slice(0, 4).map((course, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
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
                    <h4 className="font-semibold text-sm text-foreground mb-2">Facilities</h4>
                    <div className="flex flex-wrap gap-1">
                      {college.facilities.slice(0, 3).map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                      {college.hostel && (
                        <Badge variant="outline" className="text-xs">
                          Hostel
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Fees and Actions */}
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center space-x-1 mb-3">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">Fees: </span>
                      <span className="text-sm text-muted-foreground">{college.fees}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => window.open(college.website, "_blank", "noopener,noreferrer")}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Website
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <a href={`tel:${college.phone}`}>
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => openInMaps(college)}
                      >
                        <NavigationIcon className="w-3 h-3 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && !isLoading && (
          <Card className="text-center py-12">
            <CardContent>
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No colleges found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters.</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
