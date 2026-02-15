"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { loginUser } from "@/lib/api"
import { setAuthenticatedIdentity, getIdentity } from "@/lib/identity"
import { API_BASE_URL } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [form, setForm] = useState({
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
    const res = await loginUser(form)

    setAuthenticatedIdentity(res.user.id, res.token)
    toast.success("Logged in successfully")
    router.push("/")

  } catch (error: any) {
    toast.error(error.message || "Username or password is wrong")
  } finally {
    setLoading(false)
  }
}

  async function handleGoogleAuth() {
    setGoogleLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()

      if (data.success) {
        setAuthenticatedIdentity(data.user.id, data.token)
        toast.success("Logged in with Google")
        router.push("/")
      } else {
        toast.error("Google authentication failed")
      }
    } catch {
      toast.error("Google login failed")
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <section className="min-h-screen border-b-[3px] border-foreground pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-xl border-brutal-thick bg-background p-10 shadow-brutal-lg">

          <h1 className="mb-6 text-4xl font-black uppercase tracking-tight">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

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
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={googleLoading}
              className="w-full border-brutal py-4 font-bold uppercase shadow-brutal transition-all hover:shadow-brutal-hover hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>

          </form>

          <p className="mt-6 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
