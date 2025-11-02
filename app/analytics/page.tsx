"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, RefreshCw } from "lucide-react"
import StatisticsPanel from "@/components/statistics-panel"
import Link from "next/link"

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

export default function AnalyticsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllAlerts()
  }, [])

  const fetchAllAlerts = async () => {
    try {
      setLoading(true)
      // Fetch all alerts including resolved ones for analytics
      const response = await fetch("/api/alerts")
      const data = await response.json()
      if (data.success) {
        // Add some sample resolved alerts for demo
        const sampleResolvedAlerts = [
          {
            id: "resolved_1",
            userId: "WOMEN456",
            lat: 13.0324,
            lng: 80.2702,
            type: "Stalking",
            nearestStation: "Mylapore Police Station",
            status: "Resolved" as const,
            timestamp: "2025-09-29T15:30:00Z",
          },
          {
            id: "resolved_2",
            userId: "WOMEN789",
            lat: 13.0065,
            lng: 80.2553,
            type: "Harassment",
            nearestStation: "Adyar Police Station",
            status: "Resolved" as const,
            timestamp: "2025-09-29T14:15:00Z",
          },
          {
            id: "resolved_3",
            userId: "WOMEN101",
            lat: 13.085,
            lng: 80.2101,
            type: "Assault",
            nearestStation: "Anna Nagar Police Station",
            status: "Resolved" as const,
            timestamp: "2025-09-29T13:45:00Z",
          },
        ]
        setAlerts([...data.data, ...sampleResolvedAlerts])
      }
    } catch (error) {
      console.error("Failed to fetch alerts:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Chennai Women Safety System Insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Live Dashboard
                </Button>
              </Link>
              <Button onClick={fetchAllAlerts} variant="outline" size="sm" disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading analytics data...</p>
            </div>
          </div>
        ) : (
          <StatisticsPanel alerts={alerts} />
        )}
      </div>
    </div>
  )
}
