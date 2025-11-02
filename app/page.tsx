import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, MapPin, Users, BarChart3, Smartphone } from "lucide-react"
import Image from "next/image"
import HeroArt from "@/components/hero-art"
// import GovernmentBrandingNotice from "@/components/government-branding"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top utility bar: language selector + helpline (TN e-services style) */}
            {/* Top utility bar: language selector + helpline (TN e-services style) */}
      <div className="w-full bg-[#003366] text-white">
        <div className="w-full px-6 py-1 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Government of Tamil Nadu</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Digital Safety Commission</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-white/90">भाषा / மொழி</span>
              <select aria-label="Language" className="bg-transparent text-white border border-white/20 rounded px-2 py-0.5 text-sm">
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <div className="text-[13px] font-semibold">Women Safety Helpline</div>
                <div className="text-[13px]">044-28447705</div>
              </div>
              <a href="/login" className="text-white underline text-sm">Sign in</a>
            </div>
          </div>
        </div>
      </div>

      {/* Primary header with emblem and bilingual title */}
      <header className="bg-white border-b">
        <div className="w-full px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center border border-gray-200">
                <Image src="/logo.png" alt="Abhaya Logo" width={64} height={64} className="object-contain" priority />
              </div>
              <div>
                <h1 className="gov-heading text-2xl md:text-3xl">அப்ஹயா • ABHAYA</h1>
                <p className="text-sm text-gray-600">Chennai Women Safety System — Digital Safety Commission</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <a href="#home" className="text-gray-700 hover:text-[#003366] font-medium">Home</a>
              <a href="#features" className="text-gray-700 hover:text-[#003366] font-medium">Services</a>
              <a href="/api-docs" className="text-gray-700 hover:text-[#003366] font-medium">API Docs</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="/dashboard" className="inline-block bg-[#FF6600] text-white px-4 py-2 rounded shadow-sm hover:brightness-95">Access Dashboard</a>
            </div>
          </div>
        </div>
      </header>

      {/* Services Navigation Bar */}
      <nav className="bg-[#003366] text-white sticky top-0 z-50 shadow-md">
        <div className="w-full px-6 py-0 flex items-center justify-center overflow-x-auto">
          <div className="flex items-center gap-0 md:gap-2">
            <Link href="/dashboard" className="px-4 py-3 hover:bg-white/10 transition-colors whitespace-nowrap text-sm md:text-base font-medium border-b-4 border-transparent hover:border-[#FF6600]">
              Police Command Center
            </Link>
            <Link href="/analytics" className="px-4 py-3 hover:bg-white/10 transition-colors whitespace-nowrap text-sm md:text-base font-medium border-b-4 border-transparent hover:border-[#FF6600]">
              Analytics & Reports
            </Link>
            <Link href="/fir" className="px-4 py-3 hover:bg-white/10 transition-colors whitespace-nowrap text-sm md:text-base font-medium border-b-4 border-transparent hover:border-[#FF6600]">
              Register FIR
            </Link>
            <Link href="/cctv" className="px-4 py-3 hover:bg-white/10 transition-colors whitespace-nowrap text-sm md:text-base font-medium border-b-4 border-transparent hover:border-[#FF6600]">
              CCTV Intelligence
            </Link>
            <Link href="/mobile-simulator" className="px-4 py-3 hover:bg-white/10 transition-colors whitespace-nowrap text-sm md:text-base font-medium border-b-4 border-transparent hover:border-[#FF6600]">
              Mobile Demo
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4">
        {/* Government Style Hero Section - compact, two-column on larger screens so primary content fits above the fold */}
        <div className="grid md:grid-cols-2 items-center gap-6 mb-6 md:min-h-[52vh] lg:min-h-[48vh] hero-area">
          <HeroArt />
          <div className="flex flex-col items-start justify-center space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white border-4 border-orange-500 rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                <Image src="/logo.png" alt="Abhaya Logo" width={96} height={96} className="object-contain" priority />
              </div>
              <div>
                <h1 className="gov-heading text-2xl md:text-[28px] leading-tight">Chennai Women Safety System</h1>
                <div className="text-sm text-gray-700 mt-1">चेन्नई महिला सुरक्षा प्रणाली • சென்னை பெண்கள் பாதுகாப்பு அமைப்பு</div>
              </div>
            </div>

            <p className="gov-text text-base text-gray-700 mb-2 max-w-xl">
              A compact, accessible civic safety platform providing immediate SOS alerting, transparent response tracking, and operational analytics for Chennai.
            </p>

            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-base font-medium">Access Emergency Dashboard</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="px-4 py-2">Sign in</Button>
              </Link>
            </div>
          </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            <Link href="/dashboard">
              <Card className="gov-card p-4 cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Security Command Center</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">Real-time monitoring and dispatch tools for officers.</CardContent>
              </Card>
            </Link>
            <Link href="/analytics">
              <Card className="gov-card p-4 cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Analytics & Insights</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">Incident heatmaps, SLA dashboards and reporting for administrators.</CardContent>
              </Card>
            </Link>
            <Link href="/mobile-simulator">
              <Card className="gov-card p-4 cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Mobile App Simulator</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">Test SOS flows and notifications from the citizen experience.</CardContent>
              </Card>
            </Link>
            <Link href="/cctv">
              <Card className="gov-card p-4 cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">CCTV Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">Vision-based threat detection (prototype YOLO module) for proactive alerts.</CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Services Section */}
        <div id="features" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="gov-heading text-3xl mb-2">Platform Services</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
            <p className="gov-text text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital services for women&apos;s safety and emergency response management
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="gov-card hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="gov-heading text-xl mb-2">Police Command Center</CardTitle>
                <CardDescription className="gov-text text-gray-600">
                  Real-time emergency monitoring and response coordination system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Live alert tracking across Chennai districts</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Automated nearest police station assignment</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">CCTV surveillance integration</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Response status tracking system</span>
                  </div>
                </div>
                <Link href="/dashboard">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium">
                    Access Command Center
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="gov-card hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="gov-heading text-xl mb-2">Analytics & Reports</CardTitle>
                <CardDescription className="gov-text text-gray-600">
                  Statistical analysis and reporting for safety pattern monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Incident type classification reports</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Geographic distribution analysis</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Response time performance metrics</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Temporal pattern identification</span>
                  </div>
                </div>
                <Link href="/analytics">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    View Analytics Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="gov-card hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="gov-heading text-xl mb-2">Register FIR</CardTitle>
                <CardDescription className="gov-text text-gray-600">
                  File a First Information Report for quick police assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Multiple incident categories to file</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Quick forwarding to nearest police station</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Visible in Action Center for quick review</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">24-hour police contact for assessment</span>
                  </div>
                </div>
                <Link href="/fir">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium">
                    Register FIR Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* <Card className="gov-card hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="gov-heading text-xl mb-2">Developer Resources</CardTitle>
                <CardDescription className="gov-text text-gray-600">
                  API documentation and integration guidelines for developers
                </CardDescription>
              </CardHeader> */}
              {/* <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Emergency alert submission API</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Alert status retrieval endpoints</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Status update management API</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Police station directory service</span>
                  </div>
                </div>
                <Link href="/api-docs">
                  <Button variant="outline" className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium">
                    View Documentation
                  </Button>
                </Link>
              </CardContent> */}
            {/* </Card> */}
            {/* Mobile Application Demo moved into grid */}
            <Card className="gov-card hover:shadow-lg transition-shadow duration-200 bg-orange-50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Smartphone className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="gov-heading text-xl mb-2">Mobile Application Demo</CardTitle>
                <CardDescription className="gov-text text-gray-600">
                  Simulate citizen alert flow and device interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Send SOS with GPS coordinates</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">View status: New → Responding → Resolved</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Receive live notifications</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="gov-text text-sm text-gray-700">Demonstrates user experience</span>
                  </div>
                </div>
                <Link href="/mobile-simulator">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium">
                    Launch Mobile Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* End Services Section */}

        {/* System Statistics */}
        <div id="about" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="gov-heading text-3xl mb-2">System Performance</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
            <p className="gov-text text-gray-600 max-w-2xl mx-auto">
              Real-time operational statistics and system availability metrics
            </p>
          </div>
          
          <Card className="gov-card max-w-4xl mx-auto">
            <CardHeader className="text-center pb-6">
              <CardTitle className="gov-heading text-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                Live System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-4 border-r border-gray-200 last:border-r-0">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-3xl font-bold text-green-700">24/7</div>
                  </div>
                  <div className="gov-heading text-lg text-gray-900 mb-1">Continuous Monitoring</div>
                  <div className="gov-text text-sm text-gray-600">Round-the-clock emergency response coverage</div>
                </div>
                <div className="p-4 border-r border-gray-200 last:border-r-0">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-3xl font-bold text-blue-700">15</div>
                  </div>
                  <div className="gov-heading text-lg text-gray-900 mb-1">Police Stations</div>
                  <div className="gov-text text-sm text-gray-600">Connected emergency response centers</div>
                </div>
                <div className="p-4">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-3xl font-bold text-purple-700">50+</div>
                  </div>
                  <div className="gov-heading text-lg text-gray-900 mb-1">CCTV Networks</div>
                  <div className="gov-text text-sm text-gray-600">Integrated surveillance monitoring points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Government Footer */}
        <footer id="contact" className="bg-gray-100 -mx-4 px-4 py-12 mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <h3 className="gov-heading text-lg">अभया</h3>
                    <p className="gov-text text-sm text-gray-600">City Women Safety Chennai</p>
                  </div>
                </div>
                <p className="gov-text text-sm text-gray-600 leading-relaxed">
                  A flagship initiative by the Government of Tamil Nadu&apos;s Digital Safety Commission 
                  for comprehensive women&apos;s safety and emergency response services.
                </p>
              </div>
              <div>
                <h4 className="gov-heading text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2 gov-text text-sm">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Citizen Services</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Safety Guidelines</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Emergency Contacts</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Report an Issue</a></li>
                </ul>
              </div>
              <div>
                <h4 className="gov-heading text-lg mb-4">Contact Information</h4>
                <div className="gov-text text-sm space-y-2">
                  <p>Digital Safety Commission</p>
                  <p>Government of Tamil Nadu</p>
                  <p>Phone: 1800-XXX-XXXX</p>
                  <p>Email: support@chennaiwomensafety.gov.in</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-6 text-center">
              <p className="gov-text text-sm text-gray-600">
                © 2025 Government of Tamil Nadu - Digital Safety Commission. All rights reserved.
              </p>
              <p className="gov-text text-xs text-gray-500 mt-2">
                Last updated: September 29, 2025 | Best viewed in latest browsers
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
