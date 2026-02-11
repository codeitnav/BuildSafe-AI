import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="border-b-[3px] border-foreground">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl">
          <div className="mb-6 inline-block border-brutal bg-risk-high px-3 py-1">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground">
              Risk Detection Engine
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Stop Building
            <br />
            Broken
            <br />
            Software.
          </h1>

          <p className="mb-10 max-w-xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
            AI-powered risk detection for requirement documents. Catch ambiguities,
            gaps, and contradictions before a single line of code is written.
          </p>

          <Link
            href="/analysis"
            className="group inline-flex items-center gap-3 border-brutal-thick bg-primary px-8 py-5 text-lg font-black uppercase tracking-wider text-primary-foreground shadow-brutal-lg transition-all hover:shadow-brutal-hover hover:translate-x-[6px] hover:translate-y-[6px]"
          >
            Start Analysis
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              strokeWidth={3}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
