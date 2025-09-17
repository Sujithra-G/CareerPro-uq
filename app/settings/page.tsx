"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Globe, Bell, MapPin, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"

export default function SettingsPage() {
  const { user } = useAuth()
  const { t, language: currentLanguage } = useLanguage()
  const [language, setLanguage] = useState("english")
  const [notifications, setNotifications] = useState(true)
  const [locationPermission, setLocationPermission] = useState(false)

  useEffect(() => {
    // Load saved settings from localStorage
    const savedLanguage = localStorage.getItem("careerpro-language") || "english"
    const savedNotifications = localStorage.getItem("careerpro-notifications") !== "false"
    setLanguage(savedLanguage)
    setNotifications(savedNotifications)

    // Check location permission status
    if (navigator.geolocation) {
      navigator.permissions?.query({ name: "geolocation" }).then((result) => {
        setLocationPermission(result.state === "granted")
      })
    }
  }, [])

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem("careerpro-language", newLanguage)
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent("languageChange", { detail: newLanguage }))
  }

  const handleNotificationToggle = (enabled: boolean) => {
    setNotifications(enabled)
    localStorage.setItem("careerpro-notifications", enabled.toString())

    if (enabled && "Notification" in window) {
      Notification.requestPermission()
    }
  }

  const requestLocationPermission = async () => {
    if (navigator.geolocation) {
      try {
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        setLocationPermission(true)
      } catch (error) {
        console.error("Location permission denied:", error)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t("settingsTitle")}</h1>
        <p className="text-muted-foreground">{t("settingsDescription")}</p>
      </div>

      <div className="grid gap-6">
        {/* User Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {t("profile")}
            </CardTitle>
            <CardDescription>{t("profileDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">{t("email")}</Label>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">{t("region")}</Label>
                <p className="text-sm text-muted-foreground">{t("regionValue")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {t("languageTitle")}
            </CardTitle>
            <CardDescription>{t("languageDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={language} onValueChange={handleLanguageChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="english" />
                <Label htmlFor="english" className="cursor-pointer">
                  English
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hindi" id="hindi" />
                <Label htmlFor="hindi" className="cursor-pointer">
                  हिंदी (Hindi)
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Location Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t("locationServices")}
            </CardTitle>
            <CardDescription>{t("locationDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>{t("locationPermission")}</Label>
                <p className="text-sm text-muted-foreground">
                  {locationPermission ? t("locationGranted") : t("locationRequired")}
                </p>
              </div>
              {!locationPermission && (
                <Button onClick={requestLocationPermission} variant="outline">
                  {t("enableLocation")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {t("notifications")}
            </CardTitle>
            <CardDescription>{t("notificationsDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>{t("pushNotifications")}</Label>
                  <p className="text-sm text-muted-foreground">{t("pushNotificationsDescription")}</p>
                </div>
                <Switch checked={notifications} onCheckedChange={handleNotificationToggle} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("notificationTypes")}</Label>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {currentLanguage === "hindi" ? (
                    <>
                      <li>• जम्मू-कश्मीर सरकारी कॉलेज प्रवेश</li>
                      <li>• छात्रवृत्ति आवेदन की अंतिम तिथि</li>
                      <li>• JEE, NEET, और राज्य प्रवेश परीक्षाएं</li>
                      <li>• काउंसलिंग कार्यक्रम अपडेट</li>
                      <li>• दस्तावेज सत्यापन तिथियां</li>
                    </>
                  ) : (
                    <>
                      <li>• J&K Government College Admissions</li>
                      <li>• Scholarship Application Deadlines</li>
                      <li>• JEE, NEET, and State Entrance Tests</li>
                      <li>• Counseling Schedule Updates</li>
                      <li>• Document Verification Dates</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t("aboutCareerPro")}</CardTitle>
            <CardDescription>{t("aboutDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t("version")}</p>
              <p>{t("focusedOn")}</p>
              <p>{t("poweredBy")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
