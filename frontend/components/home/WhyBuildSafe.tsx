import { motion } from "framer-motion";

const words = [
  "A", "non-agency", "offer", "for", "Brands,", "Agencies,",
  "Marketers,", "Creatives", "and", "Procurement", "focusing",
  "on", "delivering", "performance", "at", "scale."
];

const WhyBuildSafe = () => {
  return (
    <section className="relative m-2 md:m-4 -mt-2 md:-mt-4 flex w-auto flex-col border-6 border-t-0 border-l-0 border-r-0 border-foreground p-6 md:p-12">

      {/* 1. Custom Left Border (same as Hero) */}
      <div className="absolute right-0 top-0 bottom-3 md:bottom-6 border-l-6 border-foreground" />

      <div className="relative flex flex-col gap-16 md:gap-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          
          {/* LEFT: Only section title */}
          <div className="flex items-start">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-foreground inline-block" />
              <span className="text-section-title font-semibold">
                Why BuildSafe-AI
              </span>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="flex flex-col gap-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap gap-x-3 gap-y-1"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="text-3xl md:text-5xl font-black leading-tight"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <div className="flex flex-col gap-6">

              <a
                href="#about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide border-b-2 border-foreground pb-1 self-start hover:border-accent transition-colors"
              >
                More about us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Inner Bottom Border (same as Hero) */}
      <div className="absolute left-0 right-0 bottom-3 md:bottom-6 border-t-6 border-foreground" />

      {/* 3. Right Border Segment (same as Hero) */}
      <div className="absolute left-0 bottom-0 h-3 md:h-6 border-r-6 border-foreground" />
    </section>
  );
};

export default WhyBuildSafe;
