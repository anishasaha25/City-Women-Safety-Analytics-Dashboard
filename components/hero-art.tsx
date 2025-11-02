export default function HeroArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-10 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <linearGradient id="g1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#003366" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#0052CC" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FF6600" stopOpacity="0.06" />
          </linearGradient>
          <radialGradient id="g2" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FF9933" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#FF6600" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
        </defs>

        <g filter="url(#blur)">
          <path d="M1200 120C1100 40 950 10 820 30C690 50 560 120 430 150C300 180 170 160 80 120C-10 80 -30 30 40 10C110 -10 240 10 360 20C480 30 620 40 760 60C900 80 1200 200 1200 120Z" fill="url(#g1)" />
          <ellipse cx="900" cy="160" rx="260" ry="120" fill="url(#g2)" opacity="0.65" />
        </g>

        <g opacity="0.25">
          <path d="M100 400 C220 340 380 360 520 420 C660 480 820 500 980 460 L1200 420 L1200 600 L0 600 L0 480 Z" fill="#0052CC" />
        </g>
      </svg>
    </div>
  )
}
