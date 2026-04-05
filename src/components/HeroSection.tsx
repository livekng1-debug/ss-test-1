import { Link } from "@tanstack/react-router";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-end justify-start bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/90 to-foreground/60" />
      <div className="relative z-10 px-6 sm:px-12 pb-16 sm:pb-24 max-w-3xl">
        <h2 className="text-6xl sm:text-8xl md:text-9xl font-extralight uppercase tracking-tight leading-[0.85]">
          ICARUS
        </h2>
        <p className="mt-6 text-xs sm:text-sm text-background/50 font-light tracking-wide-fashion uppercase max-w-sm">
          Darkness is not the absence of light — it is the presence of everything
        </p>
        <div className="mt-10">
          <Link
            to="/"
            hash="products"
            className="inline-block border border-background/30 px-12 py-4 text-[10px] uppercase tracking-wide-fashion text-background/70 hover:bg-background hover:text-foreground transition-all duration-500"
          >
            Enter
          </Link>
        </div>
      </div>
    </section>
  );
}
