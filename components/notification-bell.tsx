"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"
import { NotificationCenter } from "./notification-center"
import { notificationService } from "@/lib/notifications"

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Load unread count
    const notifications = notificationService.getFilteredNotifications()
    const readNotifications = JSON.parse(localStorage.getItem("careerpro-read-notifications") || "[]")
    const unread = notifications.filter((n) => !readNotifications.includes(n.id))
    setUnreadCount(unread.length)

    // Listen for new notifications
    const handleStorageChange = () => {
      const updatedNotifications = notificationService.getFilteredNotifications()
      const updatedReadNotifications = JSON.parse(localStorage.getItem("careerpro-read-notifications") || "[]")
      const updatedUnread = updatedNotifications.filter((n) => !updatedReadNotifications.includes(n.id))
      setUnreadCount(updatedUnread.length)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return (
    <>
      <div className="relative">
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </div>
      <NotificationCenter isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
