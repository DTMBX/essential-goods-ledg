interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.7 }} />
        </linearGradient>
      </defs>
      
      <circle cx="50" cy="50" r="46" fill="url(#logo-gradient)" opacity="0.12" />
      
      <path
        d="M 30 70 L 30 40 Q 30 30 40 30 L 50 30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      
      <path
        d="M 50 30 L 60 30 Q 70 30 70 40 L 70 70"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      
      <circle cx="50" cy="50" r="6" fill="currentColor" />
      
      <path
        d="M 25 75 L 75 75"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      <path
        d="M 35 45 L 40 50 L 35 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
      
      <path
        d="M 65 45 L 60 50 L 65 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}
