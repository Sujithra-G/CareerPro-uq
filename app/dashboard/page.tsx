"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language" // Added translation hook
import { Navigation } from "@/components/navigation"
import {
  Brain,
  BookOpen,
  MapPin,
  Calendar,
  MessageCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  ChevronRight,
  Loader2,
  GraduationCap,
} from "lucide-react"

interface DashboardData {
  user: {
    name: string
    completedQuiz: boolean
    quizScore: number
    recommendedStream: string
  }
  quickStats: {
    totalRecommendations: number
    nearbyColleges: number
    upcomingDeadlines: number
    scholarshipsAvailable: number
  }
  recentRecommendations: Array<{
    title: string
    matchPercentage: number
    type: string
  }>
  upcomingEvents: Array<{
    title: string
    date: string
    type: string
    daysLeft: number
  }>
  progressData: {
    profileCompletion: number
    careerExploration: number
  }
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage() // Added translation hook
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Check local storage for quiz completion
      const quizCompleted = localStorage.getItem("quizCompleted") === "true"
      const quizAnswers = localStorage.getItem("quizAnswers")

      // Mock dashboard data - in a real app, this would come from your backend
      const mockData: DashboardData = {
        user: {
          name: user?.email?.split("@")[0] || "Student",
          completedQuiz: quizCompleted,
          quizScore: quizCompleted ? 87 : 0,
          recommendedStream: quizCompleted ? "Technology & Engineering" : "",
        },
        quickStats: {
          totalRecommendations: quizCompleted ? 6 : 0,
          nearbyColleges: 12,
          upcomingDeadlines: 4,
          scholarshipsAvailable: 8,
        },
        recentRecommendations: quizCompleted
          ? [
              { title: "Software Developer", matchPercentage: 92, type: "Career" },
              { title: "Data Scientist", matchPercentage: 88, type: "Career" },
              { title: "UX/UI Designer", matchPercentage: 85, type: "Career" },
            ]
          : [],
        upcomingEvents: [
          { title: "JEE Main Registration", date: "2024-12-01", type: "exam", daysLeft: 5 },
          { title: "NEET Application Deadline", date: "2024-12-15", type: "deadline", daysLeft: 19 },
          { title: "Merit Scholarship", date: "2024-12-20", type: "scholarship", daysLeft: 24 },
        ],
        progressData: {
          profileCompletion: quizCompleted ? 75 : 25,
          careerExploration: quizCompleted ? 60 : 10,
        },
      }

      setDashboardData(mockData)
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
      setError("Failed to load dashboard. Please try again.")
    } finally {
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
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">{t("loading")}</p> {/* Added translation */}
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
              <Button onClick={fetchDashboardData}>Try Again</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!dashboardData) return null

  const quickActions = [
    {
      title: t("quizTitle"),
      description: t("quizDescription"),
      icon: BookOpen,
      href: "/quiz",
      color: "bg-primary",
      completed: dashboardData.user.completedQuiz,
    },
    {
      title: t("recommendations"),
      description: "AI-powered career suggestions",
      icon: Brain,
      href: "/recommendations",
      color: "bg-secondary",
      disabled: !dashboardData.user.completedQuiz,
    },
    {
      title: t("colleges"),
      description: "Explore nearby institutions",
      icon: MapPin,
      href: "/colleges",
      color: "bg-accent",
    },
    {
      title: t("timeline"),
      description: "Important dates & deadlines",
      icon: Calendar,
      href: "/timeline",
      color: "bg-chart-1",
    },
    {
      title: t("chatbot"),
      description: "Chat with AI assistant",
      icon: MessageCircle,
      href: "/chatbot",
      color: "bg-chart-2",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("welcome")}, {dashboardData.user.name}! {/* Added translation */}
          </h1>
          <p className="text-muted-foreground">{t("welcomeMessage")}</p> {/* Added translation */}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{dashboardData.quickStats.totalRecommendations}</p>
                  <p className="text-xs text-muted-foreground">{t("recommendations")}</p> {/* Added translation */}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{dashboardData.quickStats.nearbyColleges}</p>
                  <p className="text-xs text-muted-foreground">{t("nearbyColleges")}</p> {/* Added translation */}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{dashboardData.quickStats.upcomingDeadlines}</p>
                  <p className="text-xs text-muted-foreground">{t("upcomingDeadlines")}</p> {/* Added translation */}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-chart-1" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{dashboardData.quickStats.scholarshipsAvailable}</p>
                  <p className="text-xs text-muted-foreground">{t("scholarshipsAvailable")}</p>{" "}
                  {/* Added translation */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>{t("yourProgress")}</span> {/* Added translation */}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">{t("profileCompletion")}</span>{" "}
                    {/* Added translation */}
                    <span className="text-sm text-muted-foreground">
                      {dashboardData.progressData.profileCompletion}%
                    </span>
                  </div>
                  <Progress value={dashboardData.progressData.profileCompletion} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">{t("careerExploration")}</span>{" "}
                    {/* Added translation */}
                    <span className="text-sm text-muted-foreground">
                      {dashboardData.progressData.careerExploration}%
                    </span>
                  </div>
                  <Progress value={dashboardData.progressData.careerExploration} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{t("quickActions")}</CardTitle> {/* Added translation */}
                <CardDescription>{t("getStartedWithCareerExploration")}</CardDescription> {/* Added translation */}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 justify-start bg-transparent"
                        onClick={() => router.push(action.href)}
                        disabled={action.disabled}
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-foreground truncate">{action.title}</p>
                              {action.completed && <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{action.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Recommendations */}
            {dashboardData.recentRecommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>{t("yourTopCareerMatches")}</span> {/* Added translation */}
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={() => router.push("/recommendations")}>
                      {t("viewAll")}
                    </Button>
                  </div>
                  <CardDescription>{t("basedOnYourQuizResults")}</CardDescription> {/* Added translation */}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.recentRecommendations.map((rec, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{rec.title}</p>
                          <p className="text-sm text-muted-foreground">{rec.type}</p>
                        </div>
                        <Badge variant="secondary">
                          {rec.matchPercentage}% {t("match")}
                        </Badge>{" "}
                        {/* Added translation */}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      onClick={() => router.push("/jk-colleges")}
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {t("viewJKColleges")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quiz Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("careerAssessment")}</CardTitle> {/* Added translation */}
              </CardHeader>
              <CardContent>
                {dashboardData.user.completedQuiz ? (
                  <div className="text-center space-y-3">
                    <CheckCircle className="w-12 h-12 text-primary mx-auto" />
                    <div>
                      <p className="font-medium text-foreground">{t("quizCompleted")}</p> {/* Added translation */}
                      <p className="text-sm text-muted-foreground">
                        {t("score")}: {dashboardData.user.quizScore}%
                      </p>{" "}
                      {/* Added translation */}
                    </div>
                    <Badge variant="secondary">{dashboardData.user.recommendedStream}</Badge>
                    <Button size="sm" variant="outline" onClick={() => router.push("/quiz")}>
                      {t("retakeQuiz")}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="font-medium text-foreground">{t("takeYourCareerQuiz")}</p> {/* Added translation */}
                      <p className="text-sm text-muted-foreground">Find your ideal career path</p>
                    </div>
                    <Button onClick={() => router.push("/quiz")}>{t("startQuiz")}</Button> {/* Added translation */}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{t("upcomingEvents")}</CardTitle> {/* Added translation */}
                  <Button variant="outline" size="sm" onClick={() => router.push("/timeline")}>
                    {t("viewAll")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={event.daysLeft <= 7 ? "destructive" : "outline"} className="text-xs">
                          {event.daysLeft}d {t("left")}
                        </Badge>{" "}
                        {/* Added translation */}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("needHelp")}</CardTitle> {/* Added translation */}
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => router.push("/chatbot")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t("chatWithCareerBuddy")}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t("browseHelpArticles")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
