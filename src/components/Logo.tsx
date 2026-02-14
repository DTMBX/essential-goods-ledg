import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  size?: number
  animated?: boolean
}

export function Logo({ className = "", size = 40, animated = false }: LogoProps) {
  if (animated) {
    return <AnimatedLogo className={className} size={size} />
  }

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

function AnimatedLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <defs>
        <linearGradient id="logo-gradient-animated" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.7 }} />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="50"
        cy="50"
        r="46"
        fill="url(#logo-gradient-animated)"
        opacity="0.12"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.12, 0.18, 0.12]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.path
        d="M 30 70 L 30 40 Q 30 30 40 30 L 50 30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      <motion.path
        d="M 50 30 L 60 30 Q 70 30 70 40 L 70 70"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      />
      
      <motion.circle
        cx="50"
        cy="50"
        r="6"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 200 }}
      />
      
      <motion.path
        d="M 25 75 L 75 75"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      />
      
      <motion.path
        d="M 35 45 L 40 50 L 35 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 0.6 }}
        transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
      />
      
      <motion.path
        d="M 65 45 L 60 50 L 65 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
        initial={{ x: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 0.6 }}
        transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
      />
    </motion.svg>
  )
}

export function LogoSpinner({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <defs>
        <linearGradient id="logo-gradient-spinner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke="url(#logo-gradient-spinner)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="60 200"
        fill="none"
        animate={{
          strokeDashoffset: [0, -260]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.8" />
    </motion.svg>
  )
}

export function LogoPulse({ className = "", size = 40 }: { className?: string; size?: number }) {
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
        <linearGradient id="logo-gradient-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.7 }} />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="50"
        cy="50"
        r="46"
        fill="url(#logo-gradient-pulse)"
        opacity="0.12"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.25, 0.12]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
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
      
      <motion.circle
        cx="50"
        cy="50"
        r="6"
        fill="currentColor"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0.7, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <path
        d="M 25 75 L 75 75"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      <motion.path
        d="M 35 45 L 40 50 L 35 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
        animate={{
          x: [-2, 0, -2]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.path
        d="M 65 45 L 60 50 L 65 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
        animate={{
          x: [2, 0, 2]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </svg>
  )
}
