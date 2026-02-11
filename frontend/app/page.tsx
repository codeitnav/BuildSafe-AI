import HeroSection from "@/components/home/HeroSection"
import Features from "@/components/home/Features"
import CTASection from "@/components/home/CTASection"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
