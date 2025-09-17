// Service Worker for push notifications
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
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
      data: data.data,
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "view") {
    // Open the app or specific URL
    const urlToOpen = event.notification.data?.actionUrl || "/dashboard"
    event.waitUntil(clients.openWindow(urlToOpen))
  }
})

// Handle background sync for offline notifications
self.addEventListener("sync", (event) => {
  if (event.tag === "jk-notifications-sync") {
    event.waitUntil(syncJKNotifications())
  }
})

async function syncJKNotifications() {
  // Sync J&K specific notifications when back online
  try {
    const response = await fetch("/api/notifications/jk-events")
    const notifications = await response.json()

    // Store notifications for offline access
    const cache = await caches.open("jk-notifications-v1")
    await cache.put("/api/notifications/jk-events", new Response(JSON.stringify(notifications)))
  } catch (error) {
    console.error("Failed to sync J&K notifications:", error)
  }
}
