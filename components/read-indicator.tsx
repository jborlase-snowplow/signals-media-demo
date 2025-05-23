import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReadIndicatorProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function ReadIndicator({ className, size = "md" }: ReadIndicatorProps) {
  const sizeClasses = {
    sm: "h-4 w-4 text-xs",
    md: "h-5 w-5 text-sm",
    lg: "h-6 w-6 text-base",
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
        sizeClasses[size],
        className,
      )}
    >
      <Check className="h-3 w-3" />
    </div>
  )
}
