"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { AlertTriangle, Bell } from "lucide-react"

interface Alert {
  id: string
  userId: string
  lat: number
  lng: number
  type: string
  nearestStation: string
  status: "New" | "Responding" | "Resolved"
  timestamp: string
}

interface RealTimeAlertsProps {
  onNewAlert: (alert: Alert) => void
  onAlertUpdate: (alert: Alert) => void
}

export default function RealTimeAlerts({ onNewAlert, onAlertUpdate }: RealTimeAlertsProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [lastAlertCount, setLastAlertCount] = useState(0)

  useEffect(() => {
    // Simulate WebSocket connection for real-time updates
    // In production, this would be a real WebSocket connection
    const simulateRealTime = () => {
      const interval = setInterval(async () => {
        try {
          const response = await fetch("/api/alerts")
          const data = await response.json()

          if (data.success) {
            const currentAlertCount = data.data.length

            // Check for new alerts
            if (currentAlertCount > lastAlertCount && lastAlertCount > 0) {
              const newAlerts = data.data.slice(lastAlertCount)
              newAlerts.forEach((alert: Alert) => {
                // Show notification for new alert
                toast.error(`New ${alert.type} Alert`, {
                  description: `Location: ${alert.nearestStation}`,
                  icon: <AlertTriangle className="h-4 w-4" />,
                  duration: 10000,
                  action: {
                    label: "View",
                    onClick: () => onNewAlert(alert),
                  },
                })

                // Play notification sound (in production)
                if (typeof window !== "undefined" && "Notification" in window) {
                  if (Notification.permission === "granted") {
                    new Notification("New Safety Alert", {
                      body: `${alert.type} reported near ${alert.nearestStation}`,
                      icon: "/favicon.ico",
                    })
                  }
                }

                onNewAlert(alert)
              })
            }

            setLastAlertCount(currentAlertCount)
          }
        } catch (error) {
          console.error("Failed to fetch real-time updates:", error)
          setIsConnected(false)
        }
      }, 5000) // Check every 5 seconds

      return interval
    }

    // Request notification permission
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission()
      }
    }

    setIsConnected(true)
    const interval = simulateRealTime()

    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [lastAlertCount, onNewAlert, onAlertUpdate])

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${
          isConnected
            ? "bg-green-100 text-green-800 border border-green-200"
            : "bg-red-100 text-red-800 border border-red-200"
        }`}
      >
        <Bell className={`h-4 w-4 ${isConnected ? "animate-pulse" : ""}`} />
        <span>{isConnected ? "Live Monitoring" : "Disconnected"}</span>
      </div>
    </div>
  )
}
