"use client"

import { useState, useEffect } from "react"
import useAuth from "@/components/fake-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin, Shield, Eye, Clock, CheckCircle, RefreshCw, Activity } from "lucide-react"
import dynamic from "next/dynamic"
import RealTimeAlerts from "@/components/real-time-alerts"
import CCTVViewer from "@/components/cctv-viewer"
import FIRsPanel from "@/components/firs-panel"
import { toast } from "sonner"
import Image from "next/image"

// Dynamically import the map component to avoid SSR issues
const DashboardMap = dynamic(() => import("@/components/dashboard-map"), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center text-xs">Loading map...</div>,
})

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

export default function DashboardPage() {
  const [authChecked, setAuthChecked] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If no user, redirect to login
    if (typeof window !== "undefined") {
      setAuthChecked(true)
      if (!user) {
        router.replace("/login")
      }
    }
  }, [user, router])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/alerts")
      const data = await response.json()
      if (data.success) {
        setAlerts(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch alerts:", error)
      toast.error("Failed to fetch alerts")
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  const updateAlertStatus = async (alertId: string, status: string) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        // Update local state immediately for better UX
        setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: status as Alert['status'] } : alert)))

        if (selectedAlert?.id === alertId) {
          setSelectedAlert({ ...selectedAlert, status: status as Alert['status'] })
        }

        toast.success(`Alert #${alertId} marked as ${status}`)
      } else {
        let info: Record<string, unknown> = { error: 'Failed to update alert status' }
        try {
          const parsed = await response.json()
          if (parsed && typeof parsed === 'object') info = parsed as Record<string, unknown>
        } catch {}
        let errMsg = 'Failed to update alert status'
        if (info && typeof info === 'object') {
          const maybeError = (info as Record<string, unknown>)['error']
          const maybeMessage = (info as Record<string, unknown>)['message']
          if (typeof maybeError === 'string') errMsg = maybeError
          else if (typeof maybeMessage === 'string') errMsg = maybeMessage
        }
        toast.error(errMsg)
      }
    } catch (error) {
      console.error("Failed to update alert status:", error)
      toast.error("Failed to update alert status")
    }
  }

  const handleNewAlert = (newAlert: Alert) => {
    setAlerts((prev) => {
      // Check if alert already exists to avoid duplicates
      if (prev.some((alert) => alert.id === newAlert.id)) {
        return prev
      }
      return [newAlert, ...prev]
    })
  }

  const handleAlertUpdate = (updatedAlert: Alert) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === updatedAlert.id ? updatedAlert : alert)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "destructive"
      case "Responding":
        return "default"
      case "Resolved":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "New":
        return <AlertTriangle className="h-4 w-4" />
      case "Responding":
        return <Clock className="h-4 w-4" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const activeAlerts = alerts.filter((alert) => alert.status !== "Resolved")
  const newAlerts = alerts.filter((alert) => alert.status === "New")
  const respondingAlerts = alerts.filter((alert) => alert.status === "Responding")

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!authChecked || !user ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-gray-600">Redirecting to login...</div>
        </div>
      ) : null}
      <RealTimeAlerts onNewAlert={handleNewAlert} onAlertUpdate={handleAlertUpdate} />

      {/* Government Header - Compact */}
      {authChecked && user ? (
        <>
          {/* Government Top Bar */}
          <div className="w-full bg-[#003366] text-white">
            <div className="container mx-auto px-6 py-1 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                <span className="font-medium">தமிழ்நாடு அரசு | Government of Tamil Nadu</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="uppercase font-semibold">{user?.role} | {user?.regId}</span>
              </div>
            </div>
          </div>

          {/* Tricolor Accent Bar */}
          <div className="w-full h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

          {/* Main Header */}
          <div className="bg-gradient-to-r from-blue-50 to-white border-b-2 border-blue-200">
            <div className="container mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image 
                    src="/logo.png" 
                    alt="Abhaya Logo" 
                    width={48} 
                    height={48} 
                    className="drop-shadow-md"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-[#003366] flex items-center">
                      अभया Security Command Center
                      <Shield className="h-7 w-7 text-orange-600 ml-3" />
                    </h1>
                    <p className="text-[#0052CC] font-medium text-sm">
                      {user?.role === "police" ? "Police Monitoring System" : user?.role === "ngo" ? "NGO Partner Dashboard" : "Government Oversight"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 border-2 border-blue-200 shadow-sm">
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-600">{newAlerts.length}</div>
                      <div className="text-[10px] text-gray-600 font-medium">New</div>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-amber-600">{respondingAlerts.length}</div>
                      <div className="text-[10px] text-gray-600 font-medium">Responding</div>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">{activeAlerts.length}</div>
                      <div className="text-[10px] text-gray-600 font-medium">Active</div>
                    </div>
                  </div>
                  <Button 
                    onClick={fetchAlerts} 
                    variant="outline" 
                    size="sm" 
                    disabled={isRefreshing}
                    className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tricolor Accent Bar */}
          <div className="w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
        </>
      ) : null}

      {/* Dashboard Content - Compact Layout */}
      <div 
        className="flex-1 py-3"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f4f8 100%)',
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-4">
            {/* Map Section - 5 columns */}
            <div className="lg:col-span-5">
              <Card className="border-2 border-blue-200 shadow-md h-full">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b py-2">
                  <CardTitle className="flex items-center text-sm text-[#003366]">
                    <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                    Live Alert Map - Chennai
                    <Activity className="h-3 w-3 ml-2 text-green-600 animate-pulse" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3 pb-3">
                  <div className="h-[calc(100vh-280px)]">
                    <DashboardMap alerts={alerts} onAlertSelect={setSelectedAlert} selectedAlert={selectedAlert} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle Section - CCTV & Alert Details - 4 columns */}
            <div className="lg:col-span-4 flex flex-col gap-3 h-[calc(100vh-280px)]">
              {/* CCTV Viewer */}
              <div className="flex-1 min-h-0">
                <CCTVViewer selectedAlert={selectedAlert} />
              </div>

              {/* Selected Alert Details */}
              {selectedAlert && (
                <Card className="border-2 border-orange-200 shadow-sm flex-shrink-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b py-2">
                    <CardTitle className="flex items-center justify-between text-sm text-[#003366]">
                      <span className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                        Alert #{selectedAlert.id}
                      </span>
                      <Badge variant={getStatusColor(selectedAlert.status)} className="flex items-center gap-1 text-[10px]">
                        {getStatusIcon(selectedAlert.status)}
                        {selectedAlert.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2 pb-2 space-y-1.5">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Type:</span>
                        <span className="font-semibold">{selectedAlert.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Station:</span>
                        <span className="text-xs">{selectedAlert.nearestStation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Time:</span>
                        <span>{new Date(selectedAlert.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    {user?.role === "police" && (
                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateAlertStatus(selectedAlert.id, "Responding")}
                          disabled={selectedAlert.status !== "New"}
                          className="flex-1 h-7 text-xs"
                        >
                          Respond
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateAlertStatus(selectedAlert.id, "Resolved")}
                          disabled={selectedAlert.status === "Resolved"}
                          className="flex-1 h-7 text-xs"
                        >
                          Resolve
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Panel - Active Alerts & FIRs - 3 columns */}
            <div className="lg:col-span-3 flex flex-col gap-3 h-[calc(100vh-280px)]">
              {/* Active Alerts List */}
              <Card className="border-2 border-red-200 shadow-sm flex-1 min-h-0 flex flex-col">
                <CardHeader className="bg-gradient-to-r from-red-50 to-white border-b py-2 flex-shrink-0">
                  <CardTitle className="flex items-center text-sm text-[#003366]">
                    <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                    Active Alerts ({activeAlerts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3 flex-1 min-h-0 overflow-hidden">
                  {loading ? (
                    <div className="text-center py-4 text-gray-500 text-xs">Loading...</div>
                  ) : activeAlerts.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 text-xs">No active alerts</div>
                  ) : (
                    <div className="h-full overflow-y-auto space-y-2">
                      {activeAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-2 border rounded cursor-pointer transition-colors text-xs ${
                            selectedAlert?.id === alert.id ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedAlert(alert)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-semibold text-xs">#{alert.id}</div>
                            <Badge variant={getStatusColor(alert.status)} className="text-[9px] h-4 px-1">
                              {alert.status}
                            </Badge>
                          </div>
                          <div className="text-[10px] text-gray-600 space-y-0.5">
                            <div className="font-medium">{alert.type}</div>
                            <div className="truncate">{alert.nearestStation}</div>
                            <div>{new Date(alert.timestamp).toLocaleTimeString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Registered FIRs Section - Compact */}
              <div className="flex-shrink-0">
                <FIRsPanel showOnly={3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Government Footer Strip */}
      <div className="w-full bg-[#003366] text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs">
            © 2025 Digital Safety Commission, Government of Tamil Nadu | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  )
}
