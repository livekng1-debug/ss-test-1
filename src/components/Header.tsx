import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-6">
          <button className="text-sm text-foreground hover:opacity-60 transition-opacity" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            Menu
          </button>
          <button className="text-sm text-foreground hover:opacity-60 transition-opacity" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            Search
          </button>
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-3xl sm:text-4xl font-normal" style={{ fontFamily: "'Pinyon Script', cursive" }}>Sunslayer Hills</h1>
        </Link>

        <div className="flex items-center gap-6">
          <span className="text-sm text-foreground hidden sm:inline cursor-pointer hover:opacity-60 transition-opacity" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            Account
          </span>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
