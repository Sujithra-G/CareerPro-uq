"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import { Navigation } from "@/components/navigation"
import { MessageCircle, Send, Bot, User, Loader2, Lightbulb, BookOpen, MapPin, Calendar } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  typing?: boolean
}

const quickSuggestions = [
  "What career is best for me?",
  "Tell me about engineering careers",
  "How do I choose a college?",
  "What scholarships are available?",
  "When are the next exam dates?",
  "Help me with career planning",
]

export default function ChatbotPage() {
  const { user, loading } = useAuth()
  const { t, language } = useLanguage()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: t("chatWelcome"),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [user, messages.length, t])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          userId: user?.uid,
          language: language,
          conversationHistory: messages.slice(-5),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        throw new Error("Failed to get response")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t("chatError"),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("chatbot")}</h1>
              <p className="text-muted-foreground">{t("chatbotTitle")}</p>
            </div>
          </div>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b border-border">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">CareerPro</CardTitle>
                <p className="text-sm text-muted-foreground">{isTyping ? t("chatTyping") : t("chatOnline")}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end space-x-2 max-w-[80%]`}>
                  {message.sender === "bot" && (
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        <Bot className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        <User className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      <Bot className="w-3 h-3" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("quickSuggestions")}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t("chatPlaceholder")}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage(inputMessage)
                  }
                }}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={() => sendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isLoading}
                size="icon"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button variant="outline" onClick={() => router.push("/recommendations")} className="justify-start">
            <BookOpen className="w-4 h-4 mr-2" />
            {t("viewCareerRecommendations")}
          </Button>
          <Button variant="outline" onClick={() => router.push("/colleges")} className="justify-start">
            <MapPin className="w-4 h-4 mr-2" />
            {t("findNearbyColleges")}
          </Button>
          <Button variant="outline" onClick={() => router.push("/timeline")} className="justify-start">
            <Calendar className="w-4 h-4 mr-2" />
            {t("checkImportantDates")}
          </Button>
        </div>
      </div>
    </div>
  )
}
