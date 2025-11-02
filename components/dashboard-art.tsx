"use client"

export default function DashboardArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
      <svg viewBox="0 0 1200 160" className="w-full h-full">
        <defs>
          <linearGradient id="da1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#003366" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#FF6600" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="1200" height="160" fill="url(#da1)" />
        <g opacity="0.14" fill="none" stroke="#ffffff" strokeWidth="1">
          <path d="M0,80 C200,20 400,20 600,80 C800,140 1000,140 1200,80" />
          <path d="M0,110 C200,60 400,60 600,110 C800,160 1000,160 1200,110" />
        </g>
      </svg>
    </div>
  )
}
