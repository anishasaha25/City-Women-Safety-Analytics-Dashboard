"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, MapPin, Shield, RefreshCw, Maximize2, Video, Activity } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CCTVLocation {
  id: string
  name: string
  lat: number
  lng: number
  feedUrl: string
  status: "active" | "inactive"
}

export default function CCTVPage() {
  const [cctvLocations, setCctvLocations] = useState<CCTVLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCamera, setSelectedCamera] = useState<CCTVLocation | null>(null)

  useEffect(() => {
    fetchCCTVLocations()
  }, [])

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

  const activeCameras = cctvLocations.filter((camera) => camera.status === "active")
  const inactiveCameras = cctvLocations.filter((camera) => camera.status === "inactive")

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
                  अभया CCTV Monitoring
                  <Video className="h-8 w-8 text-orange-600 ml-3" />
                </h1>
                <p className="text-[#0052CC] font-medium mt-1">Chennai Women Safety Camera Network - Live Surveillance System</p>
                <p className="text-sm text-gray-600 mt-1">Digital Safety Commission | Government of Tamil Nadu</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-3">
              <div className="flex items-center space-x-6 bg-white rounded-lg px-4 py-2 border-2 border-blue-200 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{activeCameras.length}</div>
                  <div className="text-xs text-gray-600 font-medium">Active</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{inactiveCameras.length}</div>
                  <div className="text-xs text-gray-600 font-medium">Offline</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{cctvLocations.length}</div>
                  <div className="text-xs text-gray-600 font-medium">Total</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link href="/dashboard">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={fetchCCTVLocations} 
                  variant="outline" 
                  size="sm" 
                  disabled={loading}
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
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
            <h2 className="text-3xl font-bold text-[#003366] mb-2">Live Camera Surveillance Network</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-white to-green-600 mx-auto mb-3"></div>
            <p className="text-gray-700 max-w-3xl mx-auto">
              24/7 surveillance monitoring system for enhanced women safety across Chennai city zones
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <Activity className="h-4 w-4 inline mr-1" />
              System Status: Online | Last updated: {new Date().toLocaleString('en-IN', { 
                dateStyle: 'medium', 
                timeStyle: 'short',
                timeZone: 'Asia/Kolkata' 
              })}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Camera Grid */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-blue-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b-2 border-blue-100">
                  <CardTitle className="flex items-center text-[#003366]">
                    <Eye className="h-5 w-5 mr-2 text-orange-600" />
                    Camera Network Grid
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading cameras...</div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {cctvLocations.map((camera) => (
                      <div
                        key={camera.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedCamera?.id === camera.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedCamera(camera)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-sm">{camera.name}</h3>
                          <Badge variant={camera.status === "active" ? "default" : "secondary"}>{camera.status}</Badge>
                        </div>

                        <div className="bg-black rounded aspect-video mb-3 relative overflow-hidden">
                          {camera.status === "active" ? (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                              <div className="text-center text-white">
                                <Eye className="h-8 w-8 mx-auto mb-2 opacity-75" />
                                <p className="text-xs">Live Feed</p>
                              </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                              <div className="text-center text-gray-400">
                                <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p className="text-xs">Offline</p>
                              </div>
                            </div>
                          )}

                          {camera.status === "active" && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white px-1 py-0.5 rounded text-xs font-semibold flex items-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></div>
                              LIVE
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {camera.lat.toFixed(3)}, {camera.lng.toFixed(3)}
                          </div>
                          <div>{camera.id}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Camera Details */}
          <div className="space-y-6">
            {selectedCamera ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Camera Details
                    </span>
                    <Button variant="ghost" size="sm">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-600">Camera Name</div>
                    <div className="text-lg">{selectedCamera.name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Status</div>
                    <Badge variant={selectedCamera.status === "active" ? "default" : "secondary"}>
                      {selectedCamera.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Location</div>
                    <div className="text-sm">
                      {selectedCamera.lat.toFixed(4)}, {selectedCamera.lng.toFixed(4)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Camera ID</div>
                    <div className="text-sm font-mono">{selectedCamera.id}</div>
                  </div>

                  <div className="bg-black rounded aspect-video relative overflow-hidden">
                    {selectedCamera.status === "active" ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-lg font-semibold">Live Feed</p>
                          <p className="text-sm opacity-75">{selectedCamera.name}</p>
                          <p className="text-xs opacity-50 mt-2">{new Date().toLocaleTimeString()} - Recording</p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Camera Offline</p>
                        </div>
                      </div>
                    )}

                    {selectedCamera.status === "active" && (
                      <>
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                          LIVE
                        </div>
                        <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                          {new Date().toLocaleString()}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Record
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Snapshot
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Camera Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">Select a camera to view details</div>
                </CardContent>
              </Card>
            )}

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Network Status</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Recording</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Storage</span>
                    <span className="text-sm">78% Used</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Update</span>
                    <span className="text-sm">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
