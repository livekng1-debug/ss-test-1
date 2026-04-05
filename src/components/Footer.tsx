export function Footer() {
  return (
    <footer className="border-t border-border/50 px-6 sm:px-12 py-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <div>
            <p className="text-xs text-muted-foreground/60 tracking-wide-fashion uppercase">
              © {new Date().getFullYear()} ICARUS
            </p>
          </div>
          <div className="flex gap-10">
            <a href="#" className="text-[10px] uppercase tracking-wide-fashion text-muted-foreground/50 hover:text-foreground transition-colors duration-300">Instagram</a>
            <a href="#" className="text-[10px] uppercase tracking-wide-fashion text-muted-foreground/50 hover:text-foreground transition-colors duration-300">Contact</a>
            <a href="#" className="text-[10px] uppercase tracking-wide-fashion text-muted-foreground/50 hover:text-foreground transition-colors duration-300">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
