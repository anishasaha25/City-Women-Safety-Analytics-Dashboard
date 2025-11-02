"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { ArrowLeft, AlertCircle, Home } from "lucide-react"
import Link from "next/link"

const FIR_CATEGORIES = [
  "Domestic Violence",
  "Sexual Harassment",
  "Stalking/Harassment",
  "Eve Teasing",
  "Cyber Harassment",
  "Sexual Assault",
  "Human Trafficking",
  "Dowry Harassment",
  "Acid Attack",
  "Abduction",
  "False Accusation",
  "Workplace Harassment",
]

const POLICE_STATIONS = [
  { name: "T Nagar Police Station", lat: 13.0415, lng: 80.2345 },
  { name: "Mylapore Police Station", lat: 13.0324, lng: 80.2702 },
  { name: "Adyar Police Station", lat: 13.0065, lng: 80.2553 },
  { name: "Marina Police Station", lat: 13.05, lng: 80.2824 },
  { name: "Egmore Police Station", lat: 13.0732, lng: 80.2609 },
]

interface FIRFormData {
  name: string
  phone: string
  email: string
  category: string
  description: string
  location: string
  date: string
  time: string
  station: string
}

interface FIRResponse {
  success: boolean
  data: { id: string }
  message: string
}

export default function FIRRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedFIR, setSubmittedFIR] = useState<{ id: string } | null>(null)
  const [formData, setFormData] = useState<FIRFormData>({
    name: "",
    phone: "",
    email: "",
    category: FIR_CATEGORIES[0],
    description: "",
    location: "",
    date: "",
    time: "",
    station: POLICE_STATIONS[0].name,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name")
      return false
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error("Please enter a valid 10-digit phone number")
      return false
    }
    if (!formData.description.trim() || formData.description.length < 20) {
      toast.error("Please provide incident description (minimum 20 characters)")
      return false
    }
    if (!formData.location.trim()) {
      toast.error("Please enter incident location")
      return false
    }
    if (!formData.date) {
      toast.error("Please select incident date")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const station = POLICE_STATIONS.find(s => s.name === formData.station)
      const lat = station?.lat || 13.0415
      const lng = station?.lng || 80.2345

      const response = await fetch("/api/fir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "WOMAN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          category: formData.category.toLowerCase().replace(/\s+/g, "-"),
          description: formData.description,
          incidentLocation: formData.location,
          incidentDate: formData.date,
          lat,
          lng,
          preferredStation: formData.station,
        }),
      })

      const data = (await response.json()) as FIRResponse
      if (!response.ok || !data.success) {
        throw new Error(data?.message || "Failed to register FIR")
      }

      setSubmittedFIR(data.data)
      toast.success("FIR registered successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to register FIR")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success Screen
  if (submittedFIR) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="w-full bg-[#003366] text-white py-4 border-b-4 border-[#FF6600]">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-xl font-bold">FIR Registration Successful</h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader className="bg-green-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl">FIR Successfully Registered</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="bg-white border-2 border-green-200 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 font-semibold mb-2">Reference Number</p>
                <p className="text-3xl font-bold text-green-700 font-mono">{submittedFIR.id}</p>
                <p className="text-xs text-gray-500 mt-2">Save this number for your records</p>
              </div>

              <div className="space-y-3 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="font-semibold text-blue-900">Next Steps</p>
                <ul className="text-sm text-blue-900 space-y-2">
                  <li className="flex gap-2">
                    <span className="font-bold">1.</span>
                    <span>FIR forwarded to police station for assessment</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">2.</span>
                    <span>Police will contact you within 24 hours</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">3.</span>
                    <span>View case status in Action Center</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded p-4">
                <p className="text-sm font-semibold text-orange-900">Emergency Helpline</p>
                <p className="text-lg font-bold text-orange-900 font-mono">044-28447705</p>
              </div>

              <div className="flex gap-3">
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full bg-[#0052CC] hover:bg-[#003D99]">
                    View Action Center
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Form Screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="w-full bg-[#003366] text-white py-4 border-b-4 border-[#FF6600] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold">First Information Report (FIR) Registration</h1>
            <p className="text-xs text-white/80">File your complaint for immediate police assessment</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-7 space-y-4">
            {/* Contact Section */}
            <Card className="border border-gray-200">
              <CardHeader className="bg-gray-50 border-b py-3">
                <CardTitle className="text-sm font-semibold">Complainant Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div>
                  <Label className="text-xs font-semibold">Full Name <span className="text-red-600">*</span></Label>
                  <Input
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-sm h-8 mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-semibold">Phone <span className="text-red-600">*</span></Label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="10-digit"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleChange}
                      className="text-sm h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Optional"
                      value={formData.email}
                      onChange={handleChange}
                      className="text-sm h-8 mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Incident Section */}
            <Card className="border border-gray-200">
              <CardHeader className="bg-gray-50 border-b py-3">
                <CardTitle className="text-sm font-semibold">Incident Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div>
                  <Label className="text-xs font-semibold">Category <span className="text-red-600">*</span></Label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs mt-1"
                  >
                    {FIR_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-xs font-semibold">Description <span className="text-red-600">*</span></Label>
                  <textarea
                    name="description"
                    placeholder="Describe incident in detail..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs mt-1 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-0.5">Minimum 20 characters</p>
                </div>

                <div>
                  <Label className="text-xs font-semibold">Location <span className="text-red-600">*</span></Label>
                  <Input
                    name="location"
                    placeholder="Address or location"
                    value={formData.location}
                    onChange={handleChange}
                    className="text-xs h-8 mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-semibold">Date <span className="text-red-600">*</span></Label>
                    <Input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Time</Label>
                    <Input
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="text-xs h-8 mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {/* Police Station */}
            <Card className="border border-gray-200">
              <CardHeader className="bg-gray-50 border-b py-3">
                <CardTitle className="text-sm font-semibold">Police Station</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <Label className="text-xs font-semibold">Preferred Station <span className="text-red-600">*</span></Label>
                <select
                  name="station"
                  value={formData.station}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs mt-1"
                >
                  {POLICE_STATIONS.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader className="bg-blue-100 border-b border-blue-200 py-3">
                <CardTitle className="text-xs font-semibold text-blue-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Important
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3 text-xs text-blue-900">
                <ul className="space-y-1">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Verify all information is accurate</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>False information may result in legal action</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Your information remains confidential</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Helpline */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-orange-900">Emergency Helpline</p>
              <p className="text-sm font-bold text-orange-900 font-mono mt-1">044-28447705</p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="col-span-12 flex gap-3 sticky bottom-0 bg-white pt-3 border-t">
            <Link href="/dashboard" className="flex-1">
              <Button type="button" variant="outline" className="w-full h-9">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#FF6600] hover:bg-[#E55A00] text-white h-9 text-sm font-semibold"
            >
              {isSubmitting ? "Processing..." : "Submit FIR"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
