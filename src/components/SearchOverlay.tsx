import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X, Loader2 } from "lucide-react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => {
      fetchProducts(20, query.trim())
        .then(setResults)
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background">
      {/* Search bar */}
      <div className="border-b border-border">
        <div className="flex items-center gap-3 px-5 py-4">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            style={{ fontFamily: "'Courier New', monospace" }}
          />
          <button onClick={onClose} className="text-foreground hover:opacity-60 transition-opacity">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="overflow-y-auto max-h-[calc(100vh-65px)] px-5 py-6">
        {loading && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {!loading && query.trim() && results.length === 0 && (
          <p className="text-center text-[11px] uppercase tracking-widest text-muted-foreground py-10">
            No products found
          </p>
        )}

        {!loading && results.length > 0 && (
          <>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4"
               style={{ fontFamily: "'Courier New', monospace" }}>
              Products
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {results.map((product) => {
                const image = product.node.images.edges[0]?.node;
                const price = product.node.priceRange.minVariantPrice;
                return (
                  <Link
                    key={product.node.id}
                    to="/product/$handle"
                    params={{ handle: product.node.handle }}
                    onClick={onClose}
                    className="group block"
                  >
                    <div className="aspect-square bg-secondary overflow-hidden">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-full h-full object-contain p-4"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] uppercase tracking-widest">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="py-3 space-y-1">
                      <h3 className="text-[11px] uppercase tracking-widest font-normal text-foreground leading-tight"
                          style={{ fontFamily: "'Courier New', monospace" }}>
                        {product.node.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground tracking-wider"
                         style={{ fontFamily: "'Courier New', monospace" }}>
                        ${parseFloat(price.amount).toFixed(0)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
