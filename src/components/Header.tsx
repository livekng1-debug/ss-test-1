import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";
import { SearchOverlay } from "./SearchOverlay";
import { AccountDropdown } from "./AccountDropdown";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-6">
            <button className="text-[11px] uppercase tracking-ro text-foreground hover:opacity-60 transition-opacity">
              Menu
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[11px] uppercase tracking-ro text-foreground hover:opacity-60 transition-opacity"
            >
              Search
            </button>
          </div>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-3xl sm:text-4xl font-normal" style={{ fontFamily: "'Pinyon Script', cursive" }}>Sunslayer Hills</h1>
          </Link>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="text-[11px] uppercase tracking-ro text-foreground hidden sm:inline cursor-pointer hover:opacity-60 transition-opacity"
            >
              Account
            </button>
            <CartDrawer />
          </div>
        </div>
      </header>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AccountDropdown isOpen={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}
