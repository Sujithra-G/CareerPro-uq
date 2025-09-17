"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bell, BellOff, Calendar, GraduationCap, Award, FileText, ExternalLink, Settings } from "lucide-react"
import { notificationService, type JKNotification } from "@/lib/notifications"
import { useLanguage } from "@/hooks/use-language"

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { t } = useLanguage()
  const [notifications, setNotifications] = useState<JKNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  useEffect(() => {
    loadNotifications()
    checkNotificationPermission()
  }, [])

  const loadNotifications = () => {
    const filteredNotifications = notificationService.getFilteredNotifications()
    setNotifications(filteredNotifications)

    // Count unread notifications (for demo, all are unread)
    const unread = filteredNotifications.filter((n) => {
      const readNotifications = JSON.parse(localStorage.getItem("careerpro-read-notifications") || "[]")
      return !readNotifications.includes(n.id)
    })
    setUnreadCount(unread.length)
  }

  const checkNotificationPermission = () => {
    if ("Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted")
    }
  }

  const enableNotifications = async () => {
    const granted = await notificationService.requestPermission()
    if (granted) {
      setNotificationsEnabled(true)
      await notificationService.getToken()
      notificationService.scheduleJKNotifications()
    }
  }

  const markAsRead = (notificationId: string) => {
    const readNotifications = JSON.parse(localStorage.getItem("careerpro-read-notifications") || "[]")
    if (!readNotifications.includes(notificationId)) {
      readNotifications.push(notificationId)
      localStorage.setItem("careerpro-read-notifications", JSON.stringify(readNotifications))
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "admission":
        return <GraduationCap className="w-4 h-4" />
      case "scholarship":
        return <Award className="w-4 h-4" />
      case "exam":
        return <FileText className="w-4 h-4" />
      case "counseling":
        return <Calendar className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "admission":
        return "bg-blue-500"
      case "scholarship":
        return "bg-green-500"
      case "exam":
        return "bg-orange-500"
      case "counseling":
        return "bg-purple-500"
      case "document":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date()
    const eventDate = new Date(deadline)
    const daysUntil = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="fixed right-4 top-20 w-96 max-h-[80vh] bg-background border border-border rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">J&K Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </div>

        <ScrollArea className="max-h-96">
          <div className="p-4">
            {!notificationsEnabled && (
              <Card className="mb-4">
                <CardContent className="pt-4">
                  <div className="text-center space-y-3">
                    <BellOff className="w-8 h-8 text-muted-foreground mx-auto" />
                    <div>
                      <p className="font-medium text-foreground">Enable Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Get alerts for J&K admission deadlines, scholarships, and exam schedules
                      </p>
                    </div>
                    <Button onClick={enableNotifications} size="sm">
                      Enable Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No notifications available</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const isRead = JSON.parse(localStorage.getItem("careerpro-read-notifications") || "[]").includes(
                    notification.id,
                  )
                  const daysUntil = notification.deadline ? getDaysUntilDeadline(notification.deadline) : null

                  return (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-colors ${!isRead ? "bg-muted/50 border-primary/20" : ""}`}
                      onClick={() => {
                        markAsRead(notification.id)
                        if (notification.actionUrl) {
                          window.open(notification.actionUrl, "_blank")
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getNotificationColor(notification.type)}`}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-foreground text-sm truncate">{notification.title}</p>
                              {daysUntil !== null && (
                                <Badge
                                  variant={daysUntil <= 3 ? "destructive" : daysUntil <= 7 ? "default" : "secondary"}
                                  className="text-xs ml-2"
                                >
                                  {daysUntil <= 0 ? "Today" : `${daysUntil}d left`}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{notification.body}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs capitalize">
                                  {notification.type}
                                </Badge>
                                {notification.district && (
                                  <Badge variant="outline" className="text-xs">
                                    {notification.district}
                                  </Badge>
                                )}
                              </div>
                              {notification.actionUrl && <ExternalLink className="w-3 h-3 text-muted-foreground" />}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </div>
        </ScrollArea>

        <Separator />
        <div className="p-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
            onClick={() => (window.location.href = "/settings")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
