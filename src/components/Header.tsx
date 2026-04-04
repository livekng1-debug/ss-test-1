import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <button className="p-1" aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-lg font-bold tracking-wide-fashion uppercase">ICARUS</h1>
        </Link>
        <CartDrawer />
      </div>
    </header>
  );
}
