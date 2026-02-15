"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { registerUser } from "@/lib/api"
import { setAuthenticatedIdentity, getIdentity } from "@/lib/identity"
import { API_BASE_URL } from "@/lib/api"

export default function RegisterPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  useEffect(() => {
    const identity = getIdentity()
    if (identity.ownerType === "user") {
      router.replace("/")
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await registerUser(form)

      if (res.success) {
        setAuthenticatedIdentity(res.user._id, res.token)
        toast.success("Account created successfully")
        router.push("/")
      } else {
        toast.error(res.message || "Registration failed")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen border-b-[3px] border-foreground pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-xl border-brutal-thick bg-background p-10 shadow-brutal-lg">

          <h1 className="mb-6 text-4xl font-black uppercase tracking-tight">
            Create Account
          </h1>

          <p className="mb-8 text-muted-foreground">
            Optional. But recommended for saving analyses and reports.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              required
              placeholder="Full Name"
              value={form.name}
              className="w-full border-brutal px-4 py-3 font-medium"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              className="w-full border-brutal px-4 py-3 font-medium"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              required
              type="password"
              placeholder="Password"
              value={form.password}
              className="w-full border-brutal px-4 py-3 font-medium"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              disabled={loading}
              className="w-full border-brutal-thick bg-primary py-4 font-black uppercase text-primary-foreground shadow-brutal-lg transition-all hover:shadow-brutal-hover hover:translate-x-[6px] hover:translate-y-[6px]"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-bold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
