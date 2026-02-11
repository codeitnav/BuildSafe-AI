"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "@/components/ui/Tooltip"
import { Toaster } from "@/components/ui/Toaster"
import { Toaster as Sonner } from "@/components/ui/Sonner"
import { useState } from "react"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  // ✅ create QueryClient on client only
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
