import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Car } from "lucide-react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
        <Car className="h-6 w-6" />
        <span>Parking Lot App</span>
      </Link>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Reports
      </Link>
      <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Settings
      </Link>
    </nav>
  )
}

