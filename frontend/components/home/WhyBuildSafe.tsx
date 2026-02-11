import { motion } from "framer-motion";

const words = [
  "A", "non-agency", "offer", "for", "Brands,", "Agencies,",
  "Marketers,", "Creatives", "and", "Procurement", "focusing",
  "on", "delivering", "performance", "at", "scale."
];

const WhyBuildSafe = () => {
  return (
    // KEPT ORIGINAL: Section container classes and border logic preserved exactly
    <section className="relative m-2 md:m-4 -mt-2 md:-mt-4 flex min-h-[calc(100vh-5rem)] w-auto flex-col border-6 border-t-0 border-l-0 border-r-0 border-foreground p-6 md:p-12">

      {/* KEPT ORIGINAL: Left vertical border */}
      <div className="absolute right-0 top-0 bottom-3 md:bottom-6 border-l-6 border-foreground" />

      {/* Content wrapper */}
      <div className="relative flex flex-1 items-start w-full">
        {/* CHANGED: Grid ratio from 40/60 to 25/75 for a cleaner, defined look */}
        <div className="grid w-full gap-8 md:gap-12 md:grid-cols-[25%_75%]">
          
          {/* LEFT: Section title */}
          {/* CHANGED: Added sticky positioning so the label stays visible if content scrolls */}
          <div className="flex items-start md:sticky md:top-0">
            <div className="flex items-center gap-3">
              {/* CHANGED: Square instead of circle for sharper brutalism */}
              <span className="w-3 h-3 bg-foreground inline-block" />
              {/* CHANGED: Uppercase, Mono, Tracking-widest for "Technical/Clean" aesthetic */}
              <span className="text-sm md:text-base font-mono font-bold uppercase tracking-widest text-foreground/80">
                Why BuildSafe
              </span>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="flex flex-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="flex flex-wrap gap-x-3 gap-y-1 md:gap-x-4 md:gap-y-2"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    delay: i * 0.02, // Sped up slightly for a punchier feel
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1], // "Out-Quart" easing for snap
                  }}
                  // CHANGED: Tighter leading/tracking and larger text for the "Block" effect
                  className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-foreground"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* KEPT ORIGINAL: Inner bottom border */}
      <div className="absolute left-0 right-0 bottom-3 md:bottom-6 border-t-6 border-foreground" />

      {/* KEPT ORIGINAL: Right bottom border segment */}
      <div className="absolute left-0 bottom-0 h-3 md:h-6 border-r-6 border-foreground" />
    </section>
  );
};

export default WhyBuildSafe;