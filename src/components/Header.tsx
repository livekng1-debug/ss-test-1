import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between px-6 sm:px-12 py-5">
        <Link to="/">
          <h1 className="text-sm font-extralight tracking-wide-fashion uppercase">ICARUS</h1>
        </Link>
        <CartDrawer />
      </div>
    </header>
  );
}
