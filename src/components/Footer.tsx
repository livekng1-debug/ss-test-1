import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Newsletter Section */}
      <div className="px-5 py-12 max-w-[1400px] mx-auto">
        <h2 className="text-2xl font-light tracking-tight mb-2" style={{ fontFamily: "'Courier New', monospace" }}>
          Join the Sunslayer Hills club.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <p className="text-[12px] text-muted-foreground max-w-xs">
            Get exclusive deals and early access to new products.
          </p>
          <div className="flex-1 flex items-center gap-2 max-w-xl">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent border-b border-border text-sm py-2 px-1 outline-none placeholder:text-muted-foreground focus:border-foreground transition-colors"
            />
            <button className="text-foreground hover:opacity-70 transition-opacity p-2" aria-label="Subscribe">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-5 py-6 border-t border-border">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              © {new Date().getFullYear()} Sunslayer Hills,
            </p>
            <a href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Shipping Policy</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Refund Policy</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Contact Information</a>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Instagram size={20} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
