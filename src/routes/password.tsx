import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export const Route = createFileRoute("/password")({
  component: PasswordPage,
});

function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("Wrong password. Please try again.");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-[11px] font-normal uppercase tracking-[0.3em] text-foreground">
          Sunslayer Hills
        </h1>

        <div className="mt-12 border-t border-border pt-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Opening Soon
          </p>

          <p className="mt-6 text-[12px] leading-relaxed text-muted-foreground">
            We are currently updating our store. Please check back soon or enter
            the password below to access the store.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              type="password"
              placeholder="Enter store password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="h-10 border-border bg-transparent text-center text-[11px] uppercase tracking-[0.15em] placeholder:text-muted-foreground/50"
            />
            {error && (
              <p className="text-[11px] text-destructive">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full h-10 text-[11px] uppercase tracking-[0.2em] font-normal"
            >
              Enter
            </Button>
          </form>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Be the first to know when we launch
          </p>

          <a
            href="https://www.instagram.com/sunslayerhills/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-12 text-[9px] uppercase tracking-[0.15em] text-muted-foreground/50">
          © {new Date().getFullYear()} Sunslayer Hills. All rights reserved.
        </p>
      </div>
    </div>
  );
}
