"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { Navigation } from "@/components/navigation"
import {
  Calendar,
  Clock,
  AlertCircle,
  BookOpen,
  DollarSign,
  GraduationCap,
  Bell,
  Filter,
  ChevronRight,
  Loader2,
} from "lucide-react"

interface TimelineEvent {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  type: "admission" | "scholarship" | "exam" | "deadline"
  priority: "high" | "medium" | "low"
  status: "upcoming" | "ongoing" | "past"
  institution?: string
  amount?: string
  eligibility?: string[]
  link?: string
}

const eventTypeConfig = {
  admission: { icon: GraduationCap, color: "bg-primary", label: "Admission" },
  scholarship: { icon: DollarSign, color: "bg-secondary", label: "Scholarship" },
  exam: { icon: BookOpen, color: "bg-accent", label: "Exam" },
  deadline: { icon: AlertCircle, color: "bg-destructive", label: "Deadline" },
}

const priorityConfig = {
  high: { color: "destructive", label: "High Priority" },
  medium: { color: "secondary", label: "Medium Priority" },
  low: { color: "outline", label: "Low Priority" },
}

export default function TimelinePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchTimelineEvents()
    }
  }, [user])

  useEffect(() => {
    filterEvents()
  }, [events, selectedType, selectedStatus])

  const fetchTimelineEvents = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/timeline/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setEvents(data.events)
        setFilteredEvents(data.events)
      } else {
        throw new Error("Failed to fetch timeline events")
      }
    } catch (err) {
      console.error("Error fetching timeline:", err)
      setError("Failed to load timeline. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const filterEvents = () => {
    let filtered = events

    if (selectedType !== "all") {
      filtered = filtered.filter((event) => event.type === selectedType)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((event) => event.status === selectedStatus)
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    setFilteredEvents(filtered)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysUntil = (dateString: string) => {
    const today = new Date()
    const eventDate = new Date(dateString)
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your timeline...</p>
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
              <Button onClick={fetchTimelineEvents}>Try Again</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const upcomingEvents = filteredEvents.filter((event) => event.status === "upcoming").slice(0, 3)
  const ongoingEvents = filteredEvents.filter((event) => event.status === "ongoing")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Academic Timeline</h1>
          </div>
          <p className="text-muted-foreground">Stay on top of important dates, deadlines, and opportunities</p>
        </div>

        {/* Quick Alerts */}
        {(upcomingEvents.length > 0 || ongoingEvents.length > 0) && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Bell className="w-5 h-5" />
                <span>Urgent Reminders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ongoingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium text-foreground">{event.title}</p>
                        <p className="text-sm text-muted-foreground">Ongoing until {formatDate(event.endDate!)}</p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                ))}
                {upcomingEvents.map((event) => {
                  const daysUntil = getDaysUntil(event.date)
                  return (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {daysUntil > 0 ? `${daysUntil} days left` : "Today"}
                          </p>
                        </div>
                      </div>
                      <Badge variant={daysUntil <= 7 ? "destructive" : "secondary"}>{formatDate(event.date)}</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters and Tabs */}
        <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList className="grid w-full sm:w-auto grid-cols-4">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1 border border-border rounded-md bg-background text-foreground text-sm"
              >
                <option value="all">All Types</option>
                <option value="admission">Admissions</option>
                <option value="scholarship">Scholarships</option>
                <option value="exam">Exams</option>
                <option value="deadline">Deadlines</option>
              </select>
            </div>
          </div>

          <TabsContent value={selectedStatus} className="mt-0">
            {/* Timeline Events */}
            <div className="space-y-6">
              {filteredEvents.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters to see more events.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredEvents.map((event, index) => {
                  const EventIcon = eventTypeConfig[event.type].icon
                  const daysUntil = getDaysUntil(event.date)

                  return (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${eventTypeConfig[event.type].color}`}
                            >
                              <EventIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <CardTitle className="text-xl">{event.title}</CardTitle>
                                <Badge variant={priorityConfig[event.priority].color as any}>
                                  {priorityConfig[event.priority].label}
                                </Badge>
                              </div>
                              <CardDescription className="text-sm leading-relaxed mb-2">
                                {event.description}
                              </CardDescription>
                              {event.institution && (
                                <p className="text-sm text-muted-foreground">{event.institution}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-2">
                              {eventTypeConfig[event.type].label}
                            </Badge>
                            <p className="text-sm font-medium text-foreground">{formatDate(event.date)}</p>
                            {event.status === "upcoming" && (
                              <p className="text-xs text-muted-foreground">
                                {daysUntil > 0 ? `${daysUntil} days left` : "Today"}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {event.amount && (
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">Amount: {event.amount}</span>
                            </div>
                          )}
                          {event.eligibility && event.eligibility.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-2">Eligibility:</h4>
                              <div className="flex flex-wrap gap-1">
                                {event.eligibility.map((criteria, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {criteria}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {event.link && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={event.link} target="_blank" rel="noopener noreferrer">
                                Learn More
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
