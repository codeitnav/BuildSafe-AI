"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "@/components/ui/Tooltip"
import { Toaster } from "@/components/ui/Toaster"
import { Toaster as Sonner } from "@/components/ui/Sonner"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())
  const pathname = usePathname()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>

        <Toaster />
        <Sonner />

      </TooltipProvider>
    </QueryClientProvider>
  )
}
