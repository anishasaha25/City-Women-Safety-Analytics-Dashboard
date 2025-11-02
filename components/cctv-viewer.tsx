"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, MapPin, Maximize2, Minimize2 } from "lucide-react"

interface CCTVLocation {
  id: string
  name: string
  lat: number
  lng: number
  feedUrl: string
  status: "active" | "inactive"
}

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

interface CCTVViewerProps {
  selectedAlert: Alert | null
}

export default function CCTVViewer({ selectedAlert }: CCTVViewerProps) {
  const [cctvLocations, setCctvLocations] = useState<CCTVLocation[]>([])
  const [nearestCCTV, setNearestCCTV] = useState<CCTVLocation | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showVideo, setShowVideo] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCCTVLocations()
  }, [])

  useEffect(() => {
    if (selectedAlert && cctvLocations.length > 0) {
      findNearestCCTV(selectedAlert.lat, selectedAlert.lng)
    } else {
      setNearestCCTV(null)
    }
  }, [selectedAlert, cctvLocations])

  const fetchCCTVLocations = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/cctv")
      const data = await response.json()
      if (data.success) {
        setCctvLocations(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch CCTV locations:", error)
    } finally {
      setLoading(false)
    }
  }

  const findNearestCCTV = (alertLat: number, alertLng: number) => {
    if (cctvLocations.length === 0) return

    let nearest = cctvLocations[0]
    let minDistance = calculateDistance(alertLat, alertLng, nearest.lat, nearest.lng)

    for (const cctv of cctvLocations) {
      const distance = calculateDistance(alertLat, alertLng, cctv.lat, cctv.lng)
      if (distance < minDistance && cctv.status === "active") {
        minDistance = distance
        nearest = cctv
      }
    }

    setNearestCCTV(nearest)
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  if (!selectedAlert || !nearestCCTV) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            CCTV Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            {loading ? "Loading CCTV data..." : "Select an alert to view nearest CCTV feed"}
          </div>
        </CardContent>
      </Card>
    )
  }

  const distance = calculateDistance(selectedAlert.lat, selectedAlert.lng, nearestCCTV.lat, nearestCCTV.lng)

  return (
    <Card className={isExpanded ? "fixed inset-4 z-50 bg-white" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            CCTV Feed - {nearestCCTV.name}
          </span>
          <div className="flex items-center space-x-2">
            <Badge variant={nearestCCTV.status === "active" ? "default" : "secondary"}>{nearestCCTV.status}</Badge>
            <Button variant="ghost" size="sm" onClick={() => setShowVideo(!showVideo)}>
              {showVideo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Distance: {distance.toFixed(2)} km from alert
            </div>
            <div>Camera ID: {nearestCCTV.id}</div>
          </div>

          {showVideo ? (
            <div className={`bg-black rounded-lg overflow-hidden ${isExpanded ? "h-96" : "h-64"}`}>
              {nearestCCTV.status === "active" ? (
                <div className="relative w-full h-full">
                  {/* Simulated CCTV feed - in production this would be a real video stream */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-lg font-semibold">Live CCTV Feed</p>
                      <p className="text-sm opacity-75">{nearestCCTV.name}</p>
                      <p className="text-xs opacity-50 mt-2">{new Date().toLocaleTimeString()} - Recording</p>
                    </div>
                  </div>

                  {/* Simulated video overlay */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    LIVE
                  </div>

                  <div className="absolute bottom-4 left-4 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                    {new Date().toLocaleString()}
                  </div>

                  <div className="absolute bottom-4 right-4 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                    Alert #{selectedAlert.id}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <EyeOff className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Camera Offline</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <EyeOff className="h-12 w-12 mx-auto mb-4" />
                <p>Video feed hidden</p>
              </div>
            </div>
          )}

          {/* CCTV Controls */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                Record
              </Button>
              <Button size="sm" variant="outline">
                Snapshot
              </Button>
              <Button size="sm" variant="outline">
                Pan/Tilt
              </Button>
            </div>
            <div className="text-xs text-gray-500">Quality: HD • FPS: 30 • Zoom: 1x</div>
          </div>

          {/* Additional CCTV Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-gray-600">Location</div>
              <div>
                {nearestCCTV.lat.toFixed(4)}, {nearestCCTV.lng.toFixed(4)}
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-600">Coverage</div>
              <div>360° • Night Vision</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
