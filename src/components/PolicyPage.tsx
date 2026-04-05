import { Header } from "./Header";
import { Footer } from "./Footer";
import { useCartSync } from "@/hooks/useCartSync";

interface PolicyPageProps {
  title: string;
  children: React.ReactNode;
}

export function PolicyPage({ title, children }: PolicyPageProps) {
  useCartSync();

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="px-5 max-w-[800px] mx-auto">
          <h1
            className="text-6xl sm:text-8xl text-center mb-16 font-normal text-foreground"
            style={{ fontFamily: "'Pinyon Script', cursive" }}
          >
            {title}
          </h1>
          <div
            className="space-y-8 text-[13px] leading-relaxed text-muted-foreground"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
