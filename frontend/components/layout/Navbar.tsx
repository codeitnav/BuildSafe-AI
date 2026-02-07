import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-2 md:top-4 left-2 right-2 md:left-4 md:right-4 z-50 flex items-center justify-end border-6 border-r-0 border-foreground bg-background px-6 md:px-12 py-1 text-2xl uppercase font-medium">
      <div className="flex gap-6">
        {["About", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="group relative inline-block"
          >
            <span className="relative z-10">{item}</span>
            <span
              className="
                pointer-events-none
                absolute
                left-0
                top-1/2
                h-[2px]
                w-full
                origin-left
                scale-x-0
                bg-foreground
                transition-transform
                duration-300
                ease-out
                group-hover:scale-x-100
              "
            />
          </Link>
        ))}
      </div>
    </nav>
  );
}
