import Link from "next/link"

const marqueeItems = [
  "AMBIGUITY DETECTION",
  "COST SAVING",
  "AI ANALYSIS",
  "RISK SCORING",
  "PDF SUPPORT",
  "SMART REWRITES",
  "INSTANT REPORTS",
]

export default function CTASection() {
  return (
    <section>
      <div className="overflow-hidden border-b-[3px] border-foreground bg-primary py-3">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-sm font-black uppercase tracking-widest text-primary-foreground"
            >
              {item} •
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="mb-4 text-4xl font-black uppercase tracking-tight md:text-5xl">
          Ready to Ship
          <br />
          With Confidence?
        </h2>

        <p className="mx-auto mb-10 max-w-md text-lg font-medium text-muted-foreground">
          Paste your requirements or upload a doc. Get actionable risk analysis in seconds.
        </p>

        <Link
          href="/analysis"
          className="inline-block border-brutal-thick bg-risk-high px-10 py-5 text-lg font-black uppercase tracking-wider text-primary-foreground shadow-brutal-lg transition-all hover:shadow-brutal-hover hover:translate-x-[6px] hover:translate-y-[6px]"
        >
          Analyze Now — Free
        </Link>
      </div>
    </section>
  )
}
