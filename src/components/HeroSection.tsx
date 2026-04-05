import { Link } from "@tanstack/react-router";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full bg-secondary overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-light uppercase tracking-ro italic text-foreground/80">
            ICARUS
          </h2>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <Link
          to="/"
          hash="products"
          className="text-[11px] uppercase tracking-ro-wide text-foreground/60 hover:text-foreground transition-colors duration-300 border-b border-foreground/30 pb-1"
        >
          Shop Collection
        </Link>
      </div>
    </section>
  );
}
