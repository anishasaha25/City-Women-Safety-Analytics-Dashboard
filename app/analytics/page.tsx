"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, RefreshCw, BarChart3, TrendingUp } from "lucide-react"
import StatisticsPanel from "@/components/statistics-panel"
import Link from "next/link"
import Image from "next/image"

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
    <div className="min-h-screen bg-white">
      {/* Government Header Bar */}
      <div className="w-full bg-[#003366] text-white">
        <div className="container mx-auto px-6 py-1 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="font-medium">தமிழ்நாடு அரசு | Government of Tamil Nadu</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs">Screen Reader | A+ | A | A-</span>
          </div>
        </div>
      </div>

      {/* Tricolor Accent Bar */}
      <div className="w-full h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      {/* Main Header with Government Branding */}
      <div className="bg-gradient-to-r from-blue-50 to-white border-b-2 border-blue-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image 
                src="/logo.png" 
                alt="Abhaya Logo" 
                width={64} 
                height={64} 
                className="drop-shadow-md"
              />
              <div>
                <h1 className="text-3xl font-bold text-[#003366] flex items-center">
                  अभया Analytics Dashboard
                  <BarChart3 className="h-8 w-8 text-orange-600 ml-3" />
                </h1>
                <p className="text-[#0052CC] font-medium mt-1">Chennai Women Safety System - Data Insights & Performance Metrics</p>
                <p className="text-sm text-gray-600 mt-1">Digital Safety Commission | Government of Tamil Nadu</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Live Dashboard
                </Button>
              </Link>
              <Button 
                onClick={fetchAllAlerts} 
                variant="outline" 
                size="sm" 
                disabled={loading}
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tricolor Accent Bar */}
      <div className="w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      {/* Main Content with Government Background */}
      <div 
        className="container mx-auto px-4 py-8 relative"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f4f8 100%)',
          minHeight: 'calc(100vh - 200px)'
        }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 51, 102, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 102, 0, 0.2) 0%, transparent 50%)',
          backgroundSize: '100% 100%'
        }}></div>

        <div className="relative z-10">
          {/* Page Title Section */}
          <div className="text-center mb-8 pb-6 border-b-2 border-gradient-to-r from-orange-500 via-white to-green-600">
            <h2 className="text-3xl font-bold text-[#003366] mb-2">System Analytics & Insights</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-white to-green-600 mx-auto mb-3"></div>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Comprehensive data analysis and performance metrics for the Chennai Women Safety Analytics System
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <TrendingUp className="h-4 w-4 inline mr-1" />
              Real-time data updated: {new Date().toLocaleString('en-IN', { 
                dateStyle: 'medium', 
                timeStyle: 'short',
                timeZone: 'Asia/Kolkata' 
              })}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md border-2 border-blue-200">
              <div className="text-center">
                <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-[#0052CC]" />
                <p className="text-gray-700 font-semibold text-lg">Loading analytics data...</p>
                <p className="text-gray-600 text-sm mt-2">Please wait while we fetch the latest insights</p>
              </div>
            </div>
          ) : (
            <StatisticsPanel alerts={alerts} />
          )}
        </div>
      </div>

      {/* Government Footer Strip */}
      <div className="w-full bg-[#003366] text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Digital Safety Commission, Government of Tamil Nadu | All Rights Reserved
          </p>
          <p className="text-xs mt-1 text-gray-300">
            Best viewed in Chrome, Firefox, Safari, or Edge | Last updated: November 3, 2025
          </p>
        </div>
      </div>
    </div>
  )
}
