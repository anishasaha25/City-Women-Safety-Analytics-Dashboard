"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { ArrowLeft, AlertCircle, Home, FileText, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
    <div className="min-h-screen bg-white flex flex-col">
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
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image 
                src="/logo.png" 
                alt="Abhaya Logo" 
                width={56} 
                height={56} 
                className="drop-shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold text-[#003366] flex items-center">
                  अभया FIR Registration
                  <FileText className="h-7 w-7 text-orange-600 ml-3" />
                </h1>
                <p className="text-[#0052CC] font-medium mt-1">First Information Report - File Your Complaint Online</p>
                <p className="text-xs text-gray-600 mt-1">Digital Safety Commission | Government of Tamil Nadu</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Link href="/">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tricolor Accent Bar */}
      <div className="w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      {/* Form Content - Compact Layout */}
      <div 
        className="flex-1 py-4"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f4f8 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
            {/* Left Column - Contact & Incident */}
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-2 gap-4">
                {/* Complainant Information */}
                <Card className="border-2 border-blue-200 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b py-2">
                    <CardTitle className="text-sm font-bold text-[#003366]">Complainant Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3 space-y-2">
                    <div>
                      <Label className="text-xs font-semibold">Full Name <span className="text-red-600">*</span></Label>
                      <Input
                        name="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">Phone <span className="text-red-600">*</span></Label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="10-digit mobile"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleChange}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">Email (Optional)</Label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Incident Information */}
                <Card className="border-2 border-blue-200 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b py-2">
                    <CardTitle className="text-sm font-bold text-[#003366]">Incident Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3 space-y-2">
                    <div>
                      <Label className="text-xs font-semibold">Category <span className="text-red-600">*</span></Label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs mt-1 bg-white"
                      >
                        {FIR_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">Location <span className="text-red-600">*</span></Label>
                      <Input
                        name="location"
                        placeholder="Incident address"
                        value={formData.location}
                        onChange={handleChange}
                        className="text-xs h-8 mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
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

                {/* Description - Full Width */}
                <Card className="col-span-2 border-2 border-blue-200 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b py-2">
                    <CardTitle className="text-sm font-bold text-[#003366]">Incident Description</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <Label className="text-xs font-semibold">Detailed Description <span className="text-red-600">*</span></Label>
                    <textarea
                      name="description"
                      placeholder="Describe the incident in detail (minimum 20 characters)..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs mt-1 resize-none"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Station & Important Info */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              {/* Police Station */}
              <Card className="border-2 border-blue-200 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b py-2">
                  <CardTitle className="text-sm font-bold text-[#003366]">Police Station</CardTitle>
                </CardHeader>
                <CardContent className="pt-3">
                  <Label className="text-xs font-semibold">Select Station <span className="text-red-600">*</span></Label>
                  <select
                    name="station"
                    value={formData.station}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs mt-1 bg-white"
                  >
                    {POLICE_STATIONS.map(s => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </CardContent>
              </Card>

              {/* Important Notice */}
              <Card className="border-2 border-orange-300 bg-orange-50 shadow-sm">
                <CardHeader className="bg-orange-100 border-b border-orange-200 py-2">
                  <CardTitle className="text-xs font-bold text-orange-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Important Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3 text-xs text-orange-900 space-y-1.5">
                  <div className="flex gap-2">
                    <span>•</span>
                    <span>All fields marked with * are mandatory</span>
                  </div>
                  <div className="flex gap-2">
                    <span>•</span>
                    <span>Verify information accuracy before submission</span>
                  </div>
                  <div className="flex gap-2">
                    <span>•</span>
                    <span>False information may result in legal action</span>
                  </div>
                  <div className="flex gap-2">
                    <span>•</span>
                    <span>Your information remains strictly confidential</span>
                  </div>
                </CardContent>
              </Card>

              {/* Helpline */}
              <Card className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 shadow-sm">
                <CardContent className="pt-3 text-center">
                  <p className="text-xs font-semibold text-red-900">24/7 Emergency Helpline</p>
                  <p className="text-2xl font-bold text-red-900 font-mono mt-1">100</p>
                  <p className="text-xs text-red-800 mt-1">044-28447705</p>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF6600] hover:bg-[#E55A00] text-white h-10 text-sm font-bold shadow-md"
              >
                {isSubmitting ? "Processing FIR..." : "Submit FIR Registration"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Government Footer Strip */}
      <div className="w-full bg-[#003366] text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs">
            © 2025 Digital Safety Commission, Government of Tamil Nadu | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  )
}
