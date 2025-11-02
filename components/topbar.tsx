"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import useAuth from "@/components/fake-auth"
import Link from "next/link"
import { Home } from "lucide-react"

export default function TopBar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  // Hide the global top bar on the root homepage
  if (!pathname || pathname === "/") return null

  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white border-b-4 border-orange-600 shadow-md">
      <div className="px-6 py-3 flex items-center justify-between gap-4 min-h-16">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-white/10">
              <Home className="w-4 h-4" />
              <span className="text-xs font-semibold whitespace-nowrap">Home</span>
            </div>
          </Link>
          
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white p-1 flex items-center justify-center shadow-lg flex-shrink-0">
            <Image src="/logo.png" alt="Abhaya Logo" fill className="object-contain" sizes="40px" />
          </div>
          <div className="leading-tight whitespace-nowrap">
            <div className="text-xs font-bold bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">ABHAYA – Women Safety</div>
            <div className="text-xs text-blue-100">Chennai • Tamil Nadu</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {user ? (
            <>
              <span className="text-xs text-blue-100 font-semibold">{user.role.toUpperCase()}</span>
              <span className="text-xs text-blue-200 font-mono bg-white/10 px-1 py-0.5 rounded">{user.regId}</span>
              <button
                onClick={() => {
                  logout()
                  router.push("/")
                }}
                className="text-xs text-white/90 hover:text-orange-300 transition-colors font-semibold whitespace-nowrap ml-1"
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => router.push("/login")} className="text-xs text-white/90 hover:text-orange-300 transition-colors font-semibold whitespace-nowrap">
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
