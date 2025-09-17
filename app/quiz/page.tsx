"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { Navigation } from "@/components/navigation"
import { BookOpen, CheckCircle } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  category: "aptitude" | "interest"
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Do you enjoy solving complex mathematical problems?",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
    category: "aptitude",
  },
  {
    id: 2,
    question: "Are you comfortable working with technology and computers?",
    options: ["Very Comfortable", "Comfortable", "Somewhat", "Not Very", "Not At All"],
    category: "aptitude",
  },
  {
    id: 3,
    question: "Do you prefer working with people or working independently?",
    options: [
      "Strongly Prefer People",
      "Prefer People",
      "No Preference",
      "Prefer Independent",
      "Strongly Prefer Independent",
    ],
    category: "interest",
  },
  {
    id: 4,
    question: "How much do you enjoy creative activities like writing, art, or design?",
    options: ["Love It", "Enjoy It", "It's Okay", "Not Much", "Dislike It"],
    category: "interest",
  },
  {
    id: 5,
    question: "Are you interested in helping others solve their problems?",
    options: ["Very Interested", "Interested", "Somewhat", "Not Very", "Not At All"],
    category: "interest",
  },
  {
    id: 6,
    question: "Do you enjoy analyzing data and finding patterns?",
    options: ["Love It", "Enjoy It", "It's Okay", "Not Much", "Dislike It"],
    category: "aptitude",
  },
  {
    id: 7,
    question: "How comfortable are you with public speaking and presentations?",
    options: ["Very Comfortable", "Comfortable", "Somewhat", "Uncomfortable", "Very Uncomfortable"],
    category: "aptitude",
  },
  {
    id: 8,
    question: "Do you prefer structured environments or flexible work settings?",
    options: ["Highly Structured", "Somewhat Structured", "No Preference", "Somewhat Flexible", "Highly Flexible"],
    category: "interest",
  },
  {
    id: 9,
    question: "Are you interested in business and entrepreneurship?",
    options: ["Very Interested", "Interested", "Somewhat", "Not Very", "Not At All"],
    category: "interest",
  },
  {
    id: 10,
    question: "Do you enjoy learning about science and how things work?",
    options: ["Love It", "Enjoy It", "It's Okay", "Not Much", "Dislike It"],
    category: "interest",
  },
]

export default function QuizPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [quizQuestions[currentQuestion].id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call to Django backend
      const response = await fetch("/api/quiz/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          answers: answers,
        }),
      })

      if (response.ok) {
        setQuizCompleted(true)
        // Store quiz completion in localStorage for demo
        localStorage.setItem("quizCompleted", "true")
        localStorage.setItem("quizAnswers", JSON.stringify(answers))
      }
    } catch (error) {
      console.error("Error submitting quiz:", error)
      // For demo purposes, still mark as completed
      setQuizCompleted(true)
      localStorage.setItem("quizCompleted", "true")
      localStorage.setItem("quizAnswers", JSON.stringify(answers))
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const currentQ = quizQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === quizQuestions.length - 1
  const hasAnswer = answers[currentQ.id]

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-2xl mx-auto p-6">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-primary" />
              </div>
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
              <CardDescription>
                Thank you for completing the career aptitude and interest quiz. Your responses have been analyzed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Based on your answers, we'll generate personalized career recommendations for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => router.push("/recommendations")} className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>View Recommendations</span>
                </Button>
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Career Assessment Quiz</h1>
          <p className="text-muted-foreground">
            Answer these questions honestly to get personalized career recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                {currentQuestion + 1}
              </div>
              <span className="text-sm font-medium text-muted-foreground capitalize">{currentQ.category} Question</span>
            </div>
            <CardTitle className="text-xl leading-relaxed">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={answers[currentQ.id] || ""} onValueChange={handleAnswerChange} className="space-y-3">
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer py-2 text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </Button>

          <div className="flex space-x-2">
            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                disabled={!hasAnswer || isSubmitting}
                className="flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit Quiz</span>
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!hasAnswer}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
