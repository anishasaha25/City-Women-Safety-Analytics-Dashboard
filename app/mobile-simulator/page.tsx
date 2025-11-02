"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Smartphone, MapPin, AlertTriangle, CheckCircle, Send } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import NotificationPanel from "@/components/notification-panel"

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

export default function MobileSimulatorPage() {
  const [userId, setUserId] = useState("WOMEN123")
  const [alertType, setAlertType] = useState("Harassment")
  const [location, setLocation] = useState({ lat: 13.0827, lng: 80.2707 })
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [sentAlert, setSentAlert] = useState<Alert | null>(null)
  const [isPolling, setIsPolling] = useState(false)

  // Simulate getting current location
  const getCurrentLocation = () => {
    setIsGettingLocation(true)
    // Simulate GPS delay
    setTimeout(() => {
      // Random location in Chennai
      const chennaiLocations = [
        { lat: 13.0827, lng: 80.2707, area: "T Nagar" },
        { lat: 13.0324, lng: 80.2702, area: "Mylapore" },
        { lat: 13.0065, lng: 80.2553, area: "Adyar" },
        { lat: 13.0878, lng: 80.2785, area: "Anna Nagar" },
        { lat: 13.0569, lng: 80.2425, area: "Guindy" },
      ]
      const randomLocation = chennaiLocations[Math.floor(Math.random() * chennaiLocations.length)]
      setLocation(randomLocation)
      toast.success(`Location detected: ${randomLocation.area}`)
      setIsGettingLocation(false)
    }, 2000)
  }

  // Send SOS alert
  const sendSOSAlert = async () => {
    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          lat: location.lat,
          lng: location.lng,
          type: alertType,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setSentAlert(data.data)
        toast.success("SOS Alert sent successfully!")
        startPolling(data.data.id)
      } else {
        toast.error("Failed to send alert")
      }
    } catch (error) {
      console.error("Failed to send alert:", error)
      toast.error("Failed to send alert")
    }
  }

  // Poll for alert status updates
  const startPolling = (alertId: string) => {
    setIsPolling(true)
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/alerts/${alertId}/status`)
        const data = await response.json()
        if (data.success && data.data.status !== sentAlert?.status) {
          setSentAlert(data.data)
          if (data.data.status === "Responding") {
            toast.success("Police are on the way!")
          } else if (data.data.status === "Resolved") {
            toast.success("Alert has been resolved")
            clearInterval(pollInterval)
            setIsPolling(false)
          }
        }
      } catch (error) {
        console.error("Failed to poll alert status:", error)
      }
    }, 5000) // Poll every 5 seconds

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval)
      setIsPolling(false)
    }, 300000)
  }

  const resetSimulator = () => {
    setSentAlert(null)
    setIsPolling(false)
    toast.info("Simulator reset")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <div className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Smartphone className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mobile App Simulator
              </h1>
              <p className="text-gray-600 text-sm">Chennai Women Safety App Experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Frame */}
        <div className="max-w-sm mx-auto">
          <div className="relative">
            {/* Phone Frame */}
            <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
              <div className="bg-black rounded-[2rem] overflow-hidden">
                {/* Notch */}
                <div className="h-6 bg-black relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
                </div>
                
                {/* Screen Content */}
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 min-h-[600px] relative overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-2 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
                      <div className="w-6 h-2 bg-white rounded-sm"></div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="px-6 py-4 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <Image src="/logo.png" alt="Abhaya Logo" width={64} height={64} className="object-contain" />
                    </div>
                    <h2 className="text-white text-xl font-bold mb-1">Abhaya</h2>
                    <p className="text-purple-100 text-sm">Your Safety Companion</p>
                  </div>

                  {/* Main Content */}
                  <div className="px-4 flex-1 overflow-y-auto">
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center text-lg">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                          Emergency Alert
                        </CardTitle>
                      </CardHeader>
            <CardContent className="p-6 space-y-6">
              {!sentAlert ? (
                <>
                  {/* User ID Input */}
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <Input
                      id="userId"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Enter your user ID"
                    />
                  </div>

                  {/* Alert Type Selection */}
                  <div className="space-y-2">
                    <Label>Alert Type</Label>
                    <Select value={alertType} onValueChange={setAlertType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Harassment">Harassment</SelectItem>
                        <SelectItem value="Stalking">Stalking</SelectItem>
                        <SelectItem value="Assault">Assault</SelectItem>
                        <SelectItem value="Theft">Theft</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Section */}
                  <div className="space-y-3">
                    <Label>Current Location</Label>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        GPS Coordinates
                      </div>
                      <div className="font-mono text-sm">
                        {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                      </div>
                    </div>
                    <Button
                      onClick={getCurrentLocation}
                      variant="outline"
                      className="w-full bg-transparent"
                      disabled={isGettingLocation}
                    >
                      {isGettingLocation ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                          Getting Location...
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Current Location
                        </>
                      )}
                    </Button>
                  </div>

                  {/* SOS Button */}
                  <Button
                    onClick={sendSOSAlert}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold"
                    size="lg"
                  >
                    <Send className="h-6 w-6 mr-2" />
                    SEND SOS ALERT
                  </Button>
                </>
              ) : (
                <>
                  {/* Alert Sent Confirmation */}
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-600">Alert Sent Successfully!</h3>
                    <p className="text-gray-600 text-sm">Your SOS alert has been sent to the nearest police station.</p>
                  </div>

                  {/* Alert Status Card */}
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Alert ID</span>
                      <span className="text-sm font-mono bg-white px-2 py-1 rounded text-gray-900">{sentAlert.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Alert Type</span>
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-red-100 text-red-700">{sentAlert.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Nearest Station</span>
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">{sentAlert.nearestStation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Time</span>
                      <span className="text-sm text-gray-600">{new Date(sentAlert.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="h-px bg-gray-300"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Location</span>
                      <div className="text-right">
                        <div className="text-xs text-gray-600 font-mono">{sentAlert.lat.toFixed(4)}, {sentAlert.lng.toFixed(4)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Status Messages */}
                  {sentAlert.status === "New" && (
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-yellow-900">Alert Received</div>
                          <div className="text-sm text-yellow-800 mt-1">Police have been notified. Waiting for dispatch confirmation...</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {sentAlert.status === "Responding" && (
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-blue-900">Police Responding</div>
                          <div className="text-sm text-blue-800 mt-1">Officers are on their way to your location. Stay safe and keep the line open.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {sentAlert.status === "Resolved" && (
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-green-900">Alert Resolved</div>
                          <div className="text-sm text-green-800 mt-1">The situation has been handled by police. Thank you for using Abhaya.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Polling Indicator */}
                  {isPolling && (
                    <div className="flex items-center justify-center gap-2 text-sm text-purple-600 p-3 bg-purple-50 rounded-lg">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                      <span className="font-medium">Checking for updates...</span>
                    </div>
                  )}

                  {/* Reset Button */}
                  <Button onClick={resetSimulator} variant="outline" className="w-full bg-white hover:bg-gray-50 border-gray-300">
                    Send Another Alert
                  </Button>
                </>
              )}
            </CardContent>
                    </Card>

                    {/* Notification Panel - Separate Card */}
                    {sentAlert && sentAlert.status !== "Resolved" && isPolling && (
                      <div className="mt-4">
                        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                          <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-blue-500">
                            <CardTitle className="flex items-center text-lg text-white">
                              <AlertTriangle className="h-5 w-5 mr-2" />
                              Live Update Notifications
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <NotificationPanel userId={userId} isPolling={isPolling} />
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-2xl mx-auto mt-8">
          <Card>
            <CardHeader>
              <CardTitle>How to Use the Simulator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div>1. Enter your User ID (default: WOMEN123)</div>
              <div>2. Select the type of emergency</div>
              <div>3. Click &quot;Get Current Location&quot; to simulate GPS</div>
              <div>4. Press the red &quot;SEND SOS ALERT&quot; button</div>
              <div>5. The app will automatically check for police response updates</div>
              <div>6. Open the Police Dashboard in another tab to see the alert and respond to it</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
