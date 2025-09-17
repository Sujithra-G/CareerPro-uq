// Push notification service for J&K-specific events
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { app } from "@/lib/firebase"

export interface JKNotification {
  id: string
  title: string
  body: string
  type: "admission" | "scholarship" | "exam" | "counseling" | "document"
  priority: "high" | "normal" | "low"
  college?: string
  district?: string
  deadline?: string
  actionUrl?: string
  createdAt: Date
}

// J&K specific notification templates
export const jkNotificationTemplates = {
  admission: {
    title: "J&K College Admission Alert",
    body: "Admission deadline approaching for {college}",
    type: "admission" as const,
    priority: "high" as const,
  },
  scholarship: {
    title: "J&K Scholarship Available",
    body: "New scholarship opportunity: {scholarshipName}",
    type: "scholarship" as const,
    priority: "normal" as const,
  },
  exam: {
    title: "Entrance Exam Reminder",
    body: "{examName} registration deadline: {deadline}",
    type: "exam" as const,
    priority: "high" as const,
  },
  counseling: {
    title: "J&K Counseling Schedule",
    body: "Counseling for {course} starts on {date}",
    type: "counseling" as const,
    priority: "high" as const,
  },
  document: {
    title: "Document Verification",
    body: "Document verification for {college} on {date}",
    type: "document" as const,
    priority: "high" as const,
  },
}

// Mock J&K specific events and deadlines
export const jkEvents = [
  {
    id: "jee-main-2024",
    title: "JEE Main Registration",
    body: "JEE Main 2024 registration deadline: December 15, 2024",
    type: "exam" as const,
    priority: "high" as const,
    deadline: "2024-12-15",
    actionUrl: "https://jeemain.nta.nic.in",
    createdAt: new Date(),
  },
  {
    id: "neet-2024",
    title: "NEET Application",
    body: "NEET 2024 application deadline: December 20, 2024",
    type: "exam" as const,
    priority: "high" as const,
    deadline: "2024-12-20",
    actionUrl: "https://neet.nta.nic.in",
    createdAt: new Date(),
  },
  {
    id: "jk-scholarship-2024",
    title: "J&K Merit Scholarship",
    body: "Apply for J&K Merit Scholarship - Deadline: January 10, 2025",
    type: "scholarship" as const,
    priority: "normal" as const,
    deadline: "2025-01-10",
    actionUrl: "https://jkscholarships.gov.in",
    createdAt: new Date(),
  },
  {
    id: "gcet-admission-2024",
    title: "GCET Jammu Admission",
    body: "GCET Jammu B.Tech admission counseling starts December 25, 2024",
    type: "counseling" as const,
    priority: "high" as const,
    college: "GCET Jammu",
    district: "Jammu",
    deadline: "2024-12-25",
    actionUrl: "https://gcetjammu.ac.in",
    createdAt: new Date(),
  },
  {
    id: "gmc-document-verification",
    title: "GMC Srinagar Document Verification",
    body: "Document verification for MBBS admission at GMC Srinagar on December 30, 2024",
    type: "document" as const,
    priority: "high" as const,
    college: "GMC Srinagar",
    district: "Srinagar",
    deadline: "2024-12-30",
    actionUrl: "https://gmcsrinagar.edu.in",
    createdAt: new Date(),
  },
]

class NotificationService {
  private messaging: any = null
  private isSupported = false

  constructor() {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && "Notification" in window) {
      this.isSupported = true
      try {
        this.messaging = getMessaging(app)
      } catch (error) {
        console.error("Firebase messaging not available:", error)
        this.isSupported = false
      }
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!this.isSupported) {
      console.log("Notifications not supported")
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        console.log("Notification permission granted")
        return true
      } else {
        console.log("Notification permission denied")
        return false
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      return false
    }
  }

  async getToken(): Promise<string | null> {
    if (!this.isSupported || !this.messaging) {
      return null
    }

    try {
      const token = await getToken(this.messaging)
      console.log("FCM Token:", token)
      return token
    } catch (error) {
      console.error("Error getting FCM token:", error)
      return null
    }
  }

  setupMessageListener() {
    if (!this.isSupported || !this.messaging) {
      return
    }

    onMessage(this.messaging, (payload) => {
      console.log("Message received:", payload)
      this.showNotification(payload.notification?.title || "CareerPro", payload.notification?.body || "")
    })
  }

  showNotification(title: string, body: string, options?: NotificationOptions) {
    if (!this.isSupported) {
      return
    }

    const defaultOptions: NotificationOptions = {
      body,
      icon: "/icon-192x192.png",
      badge: "/icon-192x192.png",
      tag: "careerpro-notification",
      requireInteraction: true,
      actions: [
        {
          action: "view",
          title: "View Details",
        },
        {
          action: "dismiss",
          title: "Dismiss",
        },
      ],
    }

    new Notification(title, { ...defaultOptions, ...options })
  }

  // Schedule local notifications for J&K events
  scheduleJKNotifications() {
    const now = new Date()
    const upcomingEvents = jkEvents.filter((event) => {
      if (!event.deadline) return false
      const eventDate = new Date(event.deadline)
      const daysUntil = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return daysUntil > 0 && daysUntil <= 30 // Events in next 30 days
    })

    upcomingEvents.forEach((event) => {
      const eventDate = new Date(event.deadline!)
      const daysUntil = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

      // Schedule notifications for 7 days, 3 days, and 1 day before
      const notificationDays = [7, 3, 1]
      notificationDays.forEach((days) => {
        if (daysUntil <= days) {
          setTimeout(() => {
            this.showNotification(
              `${event.title} - ${days} day${days > 1 ? "s" : ""} left!`,
              `${event.body} - Don't miss the deadline!`,
              {
                tag: `${event.id}-${days}days`,
                data: { eventId: event.id, actionUrl: event.actionUrl },
              },
            )
          }, 1000) // Show immediately for demo, in real app would calculate proper delay
        }
      })
    })
  }

  // Get user's notification preferences
  getNotificationPreferences(): {
    enabled: boolean
    types: string[]
    districts: string[]
  } {
    if (typeof window === "undefined") {
      return { enabled: false, types: [], districts: [] }
    }

    const preferences = localStorage.getItem("careerpro-notification-preferences")
    if (preferences) {
      return JSON.parse(preferences)
    }

    return {
      enabled: true,
      types: ["admission", "scholarship", "exam", "counseling", "document"],
      districts: ["Srinagar", "Jammu", "Baramulla", "Anantnag"],
    }
  }

  // Save user's notification preferences
  saveNotificationPreferences(preferences: { enabled: boolean; types: string[]; districts: string[] }) {
    if (typeof window !== "undefined") {
      localStorage.setItem("careerpro-notification-preferences", JSON.stringify(preferences))
    }
  }

  // Get filtered notifications based on user preferences
  getFilteredNotifications(): JKNotification[] {
    const preferences = this.getNotificationPreferences()
    if (!preferences.enabled) return []

    return jkEvents.filter((event) => {
      // Filter by notification type
      if (!preferences.types.includes(event.type)) return false

      // Filter by district if specified
      if (event.district && preferences.districts.length > 0) {
        return preferences.districts.includes(event.district)
      }

      return true
    })
  }
}

export const notificationService = new NotificationService()

// Initialize notification service
if (typeof window !== "undefined") {
  notificationService.setupMessageListener()
}
