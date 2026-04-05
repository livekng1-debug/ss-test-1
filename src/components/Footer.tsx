export function Footer() {
  return (
    <footer className="px-5 py-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <p className="text-[10px] text-muted-foreground uppercase tracking-ro">
          © {new Date().getFullYear()} ICARUS
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] uppercase tracking-ro text-muted-foreground hover:text-foreground transition-colors">Shipping</a>
          <a href="#" className="text-[10px] uppercase tracking-ro text-muted-foreground hover:text-foreground transition-colors">Returns</a>
          <a href="#" className="text-[10px] uppercase tracking-ro text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          <a href="#" className="text-[10px] uppercase tracking-ro text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
