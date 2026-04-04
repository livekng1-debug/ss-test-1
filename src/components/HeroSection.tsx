import { Link } from "@tanstack/react-router";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 to-foreground" />
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-wide-fashion mb-6 text-background/60">New Collection</p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-fashion leading-tight">
          ICARUS
        </h2>
        <p className="mt-4 text-sm sm:text-base text-background/70 font-light tracking-wide max-w-md mx-auto">
          Redefining streetwear through art and expression
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            hash="products"
            className="inline-block border border-background px-10 py-3 text-xs uppercase tracking-fashion hover:bg-background hover:text-foreground transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
