import React from "react"
import { cn } from "@/lib/utils"

interface GradientCardProps {
  children: React.ReactNode
  className?: string
  gradient?: "primary" | "secondary" | "accent"
}

export function GradientCard({ children, className, gradient = "primary" }: GradientCardProps) {
  const gradients = {
    primary: "bg-gradient-to-br from-blue-500 to-indigo-600",
    secondary: "bg-gradient-to-br from-purple-500 to-pink-600", 
    accent: "bg-gradient-to-br from-emerald-500 to-teal-600"
  }

  return (
    <div className={cn(
      "rounded-lg shadow-lg text-white p-6",
      gradients[gradient],
      className
    )}>
      {children}
    </div>
  )
}