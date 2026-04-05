import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { Package, User, LogOut } from "lucide-react";

const SHOPIFY_STORE_DOMAIN = "icarus9.myshopify.com";

export function AccountDropdown({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { customer, accessToken, logout } = useAuthStore();
  const isLoggedIn = !!accessToken && !!customer;

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const accountLink = { to: "/account" as const, search: {} };

  return (
    <div className="fixed inset-0 z-[60]">
      <div ref={dropdownRef} className="absolute right-5 top-14 w-[300px] bg-background border border-border shadow-lg p-5">
        {isLoggedIn ? (
          <>
            <p className="text-sm text-foreground mb-1">
              {customer.firstName} {customer.lastName}
            </p>
            <p className="text-xs text-muted-foreground mb-5">{customer.email}</p>

            <div className="flex gap-2 mb-4">
              <Link
                {...accountLink}
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 border border-border py-2.5 text-[10px] uppercase tracking-widest text-foreground hover:bg-muted transition-colors"
              >
                <Package className="w-3.5 h-3.5" />
                Orders
              </Link>
              <Link
                {...accountLink}
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 border border-border py-2.5 text-[10px] uppercase tracking-widest text-foreground hover:bg-muted transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Profile
              </Link>
            </div>

            <button
              onClick={() => { logout(); onClose(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase tracking-widest text-foreground border border-border hover:bg-muted transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-foreground mb-1" style={{ fontFamily: "'Courier New', monospace" }}>
              Account
            </h3>

            <a
              href={`https://shopify.com/authentication/${SHOPIFY_STORE_DOMAIN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-full text-sm font-medium text-white mb-3"
              style={{ backgroundColor: "#5C5CFF" }}
            >
              Sign in with <span className="font-bold">shop</span>
            </a>

            <Link
              {...accountLink}
              onClick={onClose}
              className="block w-full text-center py-3 bg-foreground text-background text-[10px] uppercase tracking-widest hover:opacity-80 transition-opacity mb-4"
            >
              Other Sign In Options
            </Link>

            <div className="flex gap-2">
              <Link
                {...accountLink}
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 border border-border py-2.5 text-[10px] uppercase tracking-widest text-foreground hover:bg-muted transition-colors"
              >
                <Package className="w-3.5 h-3.5" />
                Orders
              </Link>
              <Link
                {...accountLink}
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 border border-border py-2.5 text-[10px] uppercase tracking-widest text-foreground hover:bg-muted transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Profile
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
