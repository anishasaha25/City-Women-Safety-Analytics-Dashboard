"use client"

import { useState, useEffect } from "react"
import useAuth from "@/components/fake-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin, Shield, Eye, Clock, CheckCircle, RefreshCw } from "lucide-react"
import dynamic from "next/dynamic"
import RealTimeAlerts from "@/components/real-time-alerts"
import CCTVViewer from "@/components/cctv-viewer"
import FIRsPanel from "@/components/firs-panel"
import { toast } from "sonner"
import DashboardArt from '@/components/dashboard-art'

// Dynamically import the map component to avoid SSR issues
const DashboardMap = dynamic(() => import("@/components/dashboard-map"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>,
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
    <div className="min-h-screen bg-gray-50">
      {!authChecked || !user ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-gray-600">Redirecting to login...</div>
        </div>
      ) : null}
      <RealTimeAlerts onNewAlert={handleNewAlert} onAlertUpdate={handleAlertUpdate} />

      {/* Government Header - compact (render only after authChecked & user to avoid hydration mismatch) */}
      {authChecked && user ? (
        <div className="gov-header sticky top-0 z-40">
          <div className="relative">
            <DashboardArt />
            <div className="container mx-auto px-4 py-2 relative z-10">
              <div className="flex items-center justify-between gap-8">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Shield className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-white text-2xl font-bold truncate">
                      {user?.role === "police" ? "Police Command Center" : user?.role === "ngo" ? "NGO Partner Dashboard" : "Women Safety Administration"}
                    </h1>
                    <p className="text-orange-100 text-sm truncate">
                      {user?.role === "police" ? "Chennai Women Safety Monitoring System" : user?.role === "ngo" ? "Registered NGO Partner View" : "Government oversight & analytics"}
                    </p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="flex items-center space-x-4 flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/10 backdrop-blur-sm text-white p-2 rounded border border-white/20 text-center min-w-[60px]">
                      <div className="text-xl font-bold">{newAlerts.length}</div>
                      <div className="text-[11px] opacity-90">New</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm text-white p-2 rounded border border-white/20 text-center min-w-[60px]">
                      <div className="text-xl font-bold">{respondingAlerts.length}</div>
                      <div className="text-[11px] text-gray-600">Resp</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">{activeAlerts.length}</div>
                      <div className="text-[11px] text-gray-600">Active</div>
                    </div>
                  </div>
                  <Button onClick={fetchAlerts} variant="outline" size="sm" disabled={isRefreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>

                {/* User Info - positioned left from right */}
                <div className="flex items-center space-x-3 mr-64 flex-shrink-0">
                  <span className="text-sm text-white font-semibold">{user?.role.toUpperCase()}</span>
                  <span className="text-xs text-orange-100">{user?.regId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

  <div className="container mx-auto px-4 py-6 dashboard-bg">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="dashboard-card relative overflow-hidden">
              <div className="map-panel-accent" />
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="h-5 w-5 mr-2 text-orange-600" />
                  <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">Live Alert Map</span>
                  <span className="ml-2 text-gray-500 font-normal">Chennai</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DashboardMap alerts={alerts} onAlertSelect={setSelectedAlert} selectedAlert={selectedAlert} />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* CCTV Viewer */}
            <CCTVViewer selectedAlert={selectedAlert} />

            {/* Selected Alert Details */}
            {selectedAlert && (
              <Card className="dashboard-card relative overflow-hidden">
                <div className="panel-accent" />
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">Alert Details</span>
                    </span>
                    <Badge variant={getStatusColor(selectedAlert.status)} className="flex items-center gap-1">
                      {getStatusIcon(selectedAlert.status)}
                      {selectedAlert.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-600">Alert ID</div>
                    <div className="text-lg font-mono">{selectedAlert.id}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Type</div>
                    <div className="text-lg">{selectedAlert.type}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Location</div>
                    <div className="text-sm">
                      {selectedAlert.lat.toFixed(4)}, {selectedAlert.lng.toFixed(4)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Nearest Station</div>
                    <div className="text-sm">{selectedAlert.nearestStation}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Time</div>
                    <div className="text-sm">{new Date(selectedAlert.timestamp).toLocaleString()}</div>
                  </div>

                  {user?.role === "police" ? (
                    <>
                      {selectedAlert.status === "New" && (
                        <div className="space-y-2">
                          <Button
                            onClick={() => updateAlertStatus(selectedAlert.id, "Responding")}
                            className="w-full"
                            size="sm"
                          >
                            Mark as Responding
                          </Button>
                        </div>
                      )}

                      {selectedAlert.status === "Responding" && (
                        <div className="space-y-2">
                          <Button
                            onClick={() => updateAlertStatus(selectedAlert.id, "Resolved")}
                            variant="outline"
                            className="w-full"
                            size="sm"
                          >
                            Mark as Resolved
                          </Button>
                        </div>
                      )}
                    </>
                  ) : user?.role === "ngo" ? (
                    <div className="space-y-2">
                      <Button
                        onClick={async () => {
                          try {
                            // For prototype: just show a toast and simulate a request to dispatch
                            await fetch('/api/notifications', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                userId: 'POLICE_DISPATCH',
                                alertId: selectedAlert.id,
                                type: 'ngo_flag',
                                title: 'NGO Requested Police Response',
                                message: `NGO ${user?.regId} requests police response for alert #${selectedAlert.id}`,
                              }),
                            })
                            toast.success('Police notified of NGO request')
                          } catch (e) {
                            console.error(e)
                            toast.error('Failed to notify police')
                          }
                        }}
                        className="w-full"
                        size="sm"
                      >
                        Request Police Response
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="p-3 bg-white/5 rounded">Government users can view analytics and manage policies.</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Active Alerts List */}
            <Card className="dashboard-card relative overflow-hidden">
              <div className="panel-accent" />
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Active Alerts</span>
                  <span className="ml-2 font-normal text-gray-500">({activeAlerts.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4 text-gray-500">Loading alerts...</div>
                ) : activeAlerts.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">No active alerts</div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {activeAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedAlert?.id === alert.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Alert #{alert.id}</div>
                          <Badge variant={getStatusColor(alert.status)} className="flex items-center gap-1 text-xs">
                            {getStatusIcon(alert.status)}
                            {alert.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>{alert.type}</div>
                          <div>{alert.nearestStation}</div>
                          <div>{new Date(alert.timestamp).toLocaleTimeString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Registered FIRs Section */}
            <FIRsPanel showOnly={5} />
          </div>
        </div>
      </div>
    </div>
  )
}
