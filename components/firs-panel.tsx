"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Calendar, MapPin, User, Phone, FileText, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface FIR {
  id: string
  userId: string
  name: string
  phone: string
  email?: string
  category: string
  description: string
  incidentLocation: string
  incidentDate: string
  lat: number
  lng: number
  preferredStation: string
  status: "New" | "Under Review" | "Registered" | "Resolved"
  timestamp: string
  updatedAt?: string
}

interface FIRsPanelProps {
  showOnly?: number
}

const FIR_CATEGORY_INFO: Record<string, { label: string; color: string }> = {
  "domestic-violence": { label: "Domestic Violence", color: "bg-red-100 text-red-800 border-red-300" },
  "sexual-harassment": { label: "Sexual Harassment", color: "bg-pink-100 text-pink-800 border-pink-300" },
  "stalking": { label: "Stalking/Harassment", color: "bg-orange-100 text-orange-800 border-orange-300" },
  "eve-teasing": { label: "Eve Teasing", color: "bg-amber-100 text-amber-800 border-amber-300" },
  "cyber-harassment": { label: "Cyber Harassment", color: "bg-purple-100 text-purple-800 border-purple-300" },
  "rape": { label: "Sexual Assault", color: "bg-red-200 text-red-900 border-red-400" },
  "trafficking": { label: "Human Trafficking", color: "bg-slate-200 text-slate-900 border-slate-400" },
  "dowry-abuse": { label: "Dowry Harassment", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  "acid-attack": { label: "Acid Attack", color: "bg-red-300 text-red-900 border-red-500" },
  "abduction": { label: "Abduction", color: "bg-indigo-100 text-indigo-800 border-indigo-300" },
  "false-accusation": { label: "False Accusation", color: "bg-blue-100 text-blue-800 border-blue-300" },
  "workplace-harassment": { label: "Workplace Harassment", color: "bg-cyan-100 text-cyan-800 border-cyan-300" },
}

const STATUS_COLORS: Record<FIR["status"], string> = {
  "New": "bg-red-100 text-red-800 border-red-300",
  "Under Review": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Registered": "bg-blue-100 text-blue-800 border-blue-300",
  "Resolved": "bg-green-100 text-green-800 border-green-300",
}

export default function FIRsPanel({ showOnly = 5 }: FIRsPanelProps) {
  const [firs, setFirs] = useState<FIR[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFIR, setSelectedFIR] = useState<FIR | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchFIRs()
  }, [])

  const fetchFIRs = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/fir")
      const data = await response.json()
      if (data.success) {
        setFirs(data.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch FIRs:", error)
      toast.error("Failed to fetch FIRs")
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  const updateFIRStatus = async (firId: string, status: FIR["status"]) => {
    try {
      const response = await fetch(`/api/fir/${firId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setFirs(prev => prev.map(fir => fir.id === firId ? { ...fir, status } : fir))
        if (selectedFIR?.id === firId) {
          setSelectedFIR({ ...selectedFIR, status })
        }
        toast.success(`FIR #${firId} status updated to ${status}`)
      }
    } catch (error) {
      console.error("Failed to update FIR status:", error)
      toast.error("Failed to update FIR status")
    }
  }

  const displayFIRs = firs.slice(0, showOnly)

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading FIRs...</div>
  }

  if (firs.length === 0) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Registered FIRs
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No FIRs registered yet</p>
            <p className="text-sm">FIRs will appear here when citizens file complaints</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Registered FIRs ({firs.length})
        </CardTitle>
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={() => fetchFIRs()}
          disabled={isRefreshing}
        >
          <CheckCircle className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {displayFIRs.map(fir => {
            const categoryInfo = FIR_CATEGORY_INFO[fir.category] || { label: fir.category, color: "bg-gray-100", icon: "📋" }
            return (
              <div
                key={fir.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedFIR(fir)}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${categoryInfo.color}`}>{categoryInfo.label}</Badge>
                      <Badge className={`${STATUS_COLORS[fir.status]}`}>{fir.status}</Badge>
                    </div>
                    <p className="font-semibold text-sm flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {fir.name}
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">{fir.id}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{fir.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{new Date(fir.incidentDate).toLocaleDateString()}</span>
                  </div>
                  <div className="col-span-2 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 line-clamp-1">{fir.incidentLocation}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3 bg-gray-50 p-2 rounded">{fir.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Station: <span className="font-semibold">{fir.preferredStation}</span>
                  </div>
                  {fir.status !== "Resolved" && (
                    <div className="flex gap-1">
                      {fir.status === "New" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateFIRStatus(fir.id, "Under Review")
                          }}
                        >
                          Start Review
                        </Button>
                      )}
                      {fir.status === "Under Review" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 border-green-200 text-green-700 hover:bg-green-50"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateFIRStatus(fir.id, "Registered")
                          }}
                        >
                          Register
                        </Button>
                      )}
                      {(fir.status === "New" || fir.status === "Registered") && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 border-gray-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateFIRStatus(fir.id, "Resolved")
                          }}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {firs.length > showOnly && (
          <Button variant="outline" className="w-full mt-4">
            View All FIRs ({firs.length})
          </Button>
        )}

        {selectedFIR && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              FIR Details: {selectedFIR.id}
            </h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Complainant:</span> {selectedFIR.name}</p>
              <p><span className="font-semibold">Contact:</span> {selectedFIR.phone}</p>
              {selectedFIR.email && <p><span className="font-semibold">Email:</span> {selectedFIR.email}</p>}
              <p><span className="font-semibold">Category:</span> {FIR_CATEGORY_INFO[selectedFIR.category]?.label || selectedFIR.category}</p>
              <p><span className="font-semibold">Incident Date:</span> {new Date(selectedFIR.incidentDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Incident Location:</span> {selectedFIR.incidentLocation}</p>
              <p><span className="font-semibold">Police Station:</span> {selectedFIR.preferredStation}</p>
              <p><span className="font-semibold">Status:</span> <Badge className={STATUS_COLORS[selectedFIR.status]}>{selectedFIR.status}</Badge></p>
              <p><span className="font-semibold">Filed on:</span> {new Date(selectedFIR.timestamp).toLocaleString()}</p>
              <div className="mt-4">
                <p className="font-semibold mb-2">Description:</p>
                <p className="bg-gray-50 p-3 rounded text-gray-700">{selectedFIR.description}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
