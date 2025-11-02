"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, AlertTriangle, Clock } from "lucide-react"
import { toast } from "sonner"

interface Notification {
  id: string
  userId: string
  alertId: string
  type: string
  title: string
  message: string
  timestamp: string
  read: boolean
}

interface NotificationPanelProps {
  userId: string
  isPolling: boolean
}

export default function NotificationPanel({ userId, isPolling }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  // Track which notification IDs have already triggered a toast (persists across re-renders & remounts)
  const shownNotificationIds = useRef<Set<string>>(new Set())
  const initializedRef = useRef(false)

  // Load previously shown IDs from localStorage (so navigating away & back doesn't re-toast)
  useEffect(() => {
    if (!initializedRef.current) {
      try {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('shownNotificationIds') : null
        if (stored) {
          shownNotificationIds.current = new Set(JSON.parse(stored))
        }
      } catch {
        // ignore storage errors
      } finally {
        initializedRef.current = true
      }
    }
  }, [])

  const persistShownIds = () => {
    try {
      localStorage.setItem('shownNotificationIds', JSON.stringify(Array.from(shownNotificationIds.current)))
    } catch {
      // ignore
    }
  }

  const fetchNotifications = useCallback(async () => {
    if (!userId) return

    try {
      const response = await fetch(`/api/notifications?userId=${userId}`)
      const data = await response.json()

      if (data.success) {
        const newNotifications: Notification[] = data.data

        // Only toast for notifications not yet shown
        newNotifications.forEach((notification) => {
          if (!shownNotificationIds.current.has(notification.id)) {
            // Mark as shown BEFORE triggering toast to avoid race conditions
            shownNotificationIds.current.add(notification.id)
            persistShownIds()
            if (notification.type === 'status_update') {
              toast.success(notification.title, {
                description: notification.message,
                duration: 5000,
              })
            }
          }
        })

        setNotifications(newNotifications)
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }, [userId])

  useEffect(() => {
    if (isPolling) {
      fetchNotifications()
      const interval = setInterval(fetchNotifications, 2000) // Poll every 2 seconds
      return () => clearInterval(interval)
    }
  }, [isPolling, fetchNotifications])

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId })
      })
      
      if (response.ok) {
        setNotifications(prev => prev.filter(notification => notification.id !== notificationId))
        // Optionally keep it in shownNotificationIds so toast will NOT reappear if backend re-sends it
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "status_update":
        return <Bell className="h-6 w-6 text-blue-600" />
      default:
        return <AlertTriangle className="h-6 w-6 text-orange-600" />
    }
  }

  const getNotificationColor = (message: string) => {
    if (message.includes("on their way") || message.includes("Dispatched")) {
      return "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300"
    }
    if (message.includes("Resolved")) {
      return "bg-gradient-to-r from-green-50 to-green-100 border-green-300"
    }
    return "bg-gradient-to-r from-orange-50 to-yellow-100 border-orange-300"
  }

  if (!isPolling || notifications.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base">Live Notifications</h3>
            <p className="text-xs text-gray-500">Real-time updates from police</p>
          </div>
        </div>
        <Badge variant="default" className="bg-blue-600 text-white rounded-full px-3">
          {notifications.length}
        </Badge>
      </div>
      
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div 
            key={notification.id}
            className={`${getNotificationColor(notification.message)} border-2 rounded-lg p-4 shadow-md transition-all hover:shadow-lg`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="h-6 w-6 p-0 flex-shrink-0 hover:bg-white/50 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-300/30">
                  <Clock className="h-3 w-3 text-gray-600" />
                  <span className="text-xs text-gray-600 font-medium">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </span>
                  {index === 0 && (
                    <span className="ml-auto text-xs font-semibold bg-white/60 px-2 py-1 rounded text-gray-700">
                      Just now
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}