export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <h3 className="text-xs uppercase tracking-fashion font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-fashion font-medium mb-4">Follow</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-fashion font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground tracking-fashion">© {new Date().getFullYear()} ICARUS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
