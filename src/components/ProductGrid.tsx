import { useEffect, useState } from "react";
import { fetchCollectionProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

const COLLECTION_HANDLE = "ss-capsule-001";

export function ProductGrid() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollectionProducts(COLLECTION_HANDLE, 38)
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
      <div className="grid grid-cols-2 gap-px bg-border">
        {products.map((product, index) => (
          <div key={product.node.id} className={index % 2 === 0 ? "snap-start scroll-mt-16 sm:snap-align-none" : ""}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
