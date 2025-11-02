import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { Suspense } from "react"
import dynamic from "next/dynamic"
const TopBar = dynamic(() => import("@/components/topbar"), { ssr: false })
import "./globals.css"

export const metadata: Metadata = {
  title: "Chennai Women Safety System",
  description: "Real-time safety monitoring and alert system for Chennai",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" style={{fontFamily: 'Noto Sans, sans-serif'}}>
        <div className="min-h-screen bg-gray-50 site-bg">
          <TopBar />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 gov-text">Loading...</p>
              </div>
            </div>
          }>
            <div className="content-layer">{children}</div>
            <Toaster 
              position="top-right" 
              richColors 
              toastOptions={{
                style: {
                  fontFamily: 'Noto Sans, sans-serif',
                  background: 'white',
                  border: '1px solid #ddd',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }
              }}
            />
          </Suspense>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
