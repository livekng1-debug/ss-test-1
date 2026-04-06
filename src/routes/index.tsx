import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { useCartSync } from "@/hooks/useCartSync";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useCartSync();

  return (
    <div className="sm:snap-none snap-y snap-mandatory h-screen overflow-y-auto">
      <Header />
      <main>
        <HeroSection />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
