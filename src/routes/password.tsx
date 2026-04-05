import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram } from "lucide-react";

export const Route = createFileRoute("/password")({
  component: PasswordPage,
});

function PasswordPage() {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, any non-empty password grants access
    if (password.trim()) {
      navigate({ to: "/" });
    } else {
      setError("Please enter a password.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Main content — centered brand name */}
      {/* Main content — centered brand name */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <h1
          className="text-6xl sm:text-8xl md:text-9xl font-normal text-foreground"
          style={{ fontFamily: "'Pinyon Script', cursive" }}
        >
          Sunslayer Hills
        </h1>

        <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Coming Soon
        </p>
      </div>

      {/* Enter password section — just above footer */}
      <div className="px-5 py-8 flex flex-col items-center">
        {!showPasswordInput ? (
          <button
            onClick={() => setShowPasswordInput(true)}
            className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-foreground transition-colors underline underline-offset-4"
          >
            Enter using password
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-xs items-center gap-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoFocus
              className="flex-1 border-b border-border bg-transparent py-2 text-center text-[11px] uppercase tracking-[0.15em] text-foreground outline-none placeholder:text-muted-foreground/40 focus:border-foreground transition-colors"
            />
            <button
              type="submit"
              className="text-foreground hover:opacity-60 transition-opacity p-1"
              aria-label="Submit password"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        )}
        {error && (
          <p className="mt-2 text-[11px] text-destructive">{error}</p>
        )}
      </div>

      {/* Footer — Join the club section */}
      <footer className="border-t border-border">
        <div className="px-5 py-12 max-w-[1400px] mx-auto">
          <h2
            className="text-2xl font-light tracking-tight mb-2"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
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
              <button
                className="text-foreground hover:opacity-70 transition-opacity p-2"
                aria-label="Subscribe"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 border-t border-border">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              © {new Date().getFullYear()} Sunslayer Hills
            </p>
            <a
              href="https://www.instagram.com/sunslayerhills/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
