import { useEffect, useState } from "react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export function ProductGrid() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(38)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[11px] text-muted-foreground uppercase tracking-ro">No products found</p>
      </div>
    );
  }

  return (
    <section id="products" className="px-5 py-16 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
        {products.map((product) => (
          <ProductCard key={product.node.id} product={product} />
        ))}
      </div>
    </section>
  );
}
