"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getIdentity } from "@/lib/identity"

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const identity = getIdentity()

    if (identity.ownerType !== "user") {
      router.push("/login")
    }
  }, [])

  return <>{children}</>
}
