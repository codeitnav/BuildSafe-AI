"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Shield } from "lucide-react"
import {
  getIdentity,
  clearIdentity,
  isAuthenticated,
} from "@/lib/identity"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const [isUser, setIsUser] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsUser(isAuthenticated())
  }, [pathname])

  function handleLogout() {
    clearIdentity()
    setIsUser(false)
    router.push("/")
  }

  if (!mounted) return null

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b-[3px] border-foreground bg-[hsl(var(--background))]">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7" strokeWidth={2.5} />
          <span className="text-xl font-black tracking-tight">
            BUILDSAFE AI
          </span>
        </Link>
        <div className="flex items-center gap-6">

          <Link
            href="/analysis"
            className="text-sm font-bold uppercase tracking-wider hover:line-through"
          >
            Analyze
          </Link>

          {isUser ? (
            <>
              <button
                onClick={handleLogout}
                className="text-sm font-bold uppercase tracking-wider hover:line-through"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/register"
              className="border-brutal bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brutal transition-all hover:shadow-brutal-hover hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              Create Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
