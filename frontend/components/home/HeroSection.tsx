export default function HeroSection() {
  return (
    <section className="relative m-2 md:m-4 mt-20  flex h-[calc(100vh-5rem)] w-auto flex-col border-6 border-t-0 border-l-0 border-r-0 border-foreground p-6 md:p-12">
      
      {/* 1. Custom Left Border: Stops at the inner bottom line */}
      <div className="absolute right-0 top-[-5rem] md:top-0 bottom-3 md:bottom-6 border-l-6 border-foreground" />
      <div className="relative flex flex-1 flex-col justify-between">
        <h1 className="max-w-5xl text-7xl leading-[0.9] tracking-tighter sm:text-8xl md:text-9xl lg:text-[11rem]">
          BUILDSAFE-AI
        </h1>

        <div className="flex justify-end">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="h-16 w-16 md:h-24 md:w-24"
          >
            <path d="M6 7L12 13" />
            <path d="M18 7L12 13" />
            <path d="M6 11L12 17" />
            <path d="M18 11L12 17" />
          </svg>
        </div>
      </div>

      {/* 2. Inner Bottom Border */}
      <div className="absolute left-0 right-0 bottom-3 md:bottom-6 border-t-6 border-foreground" />
      
      {/* 3. Right Border Segment */}
      <div className="absolute left-0 bottom-0 h-3 md:h-6 border-r-6 border-foreground" />
    </section>
  );
}
