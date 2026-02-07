"use client"
import { useEffect, useState } from "react";
import { checkBackend } from "../lib/api";
import SketchBox from "@/components/ui/SketchBox";
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/home/HeroSection';
import WhyBuildSafe from "@/components/home/WhyBuildSafe";

export default function Home() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    checkBackend().then((data) => setStatus(data.status));
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-black selection:text-[#ffffe7]">
      <Navbar />
      <HeroSection />
      <WhyBuildSafe />
    </main>
  );
}
