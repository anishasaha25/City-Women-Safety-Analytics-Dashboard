import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface EmergencyButtonProps {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
  icon?: LucideIcon
  className?: string
}

export function EmergencyButton({ 
  onClick, 
  disabled = false, 
  children, 
  icon: Icon,
  className 
}: EmergencyButtonProps) {
  return (
    <Button 
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
        "text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl",
        "transform hover:scale-105 active:scale-95 transition-all duration-200",
        "border-2 border-red-400 disabled:opacity-50 disabled:cursor-not-allowed",
        "animate-pulse-glow",
        className
      )}
    >
      {Icon && <Icon className="h-5 w-5 mr-2" />}
      {children}
    </Button>
  )
}