import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchProductByHandle, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Loader2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { handle } = Route.useParams();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    fetchProductByHandle(handle)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen pt-16 gap-4">
          <p className="text-sm text-muted-foreground uppercase tracking-fashion">Product not found</p>
          <Link to="/" className="text-xs uppercase tracking-fashion underline">Back to Shop</Link>
        </div>
      </>
    );
  }

  const variant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;

  const handleAddToCart = async () => {
    if (!variant) return;
    const shopifyProduct: ShopifyProduct = { node: product };
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to bag", {
      description: product.title,
      position: "top-center",
    });
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen">
        <div className="px-4 sm:px-8 py-6">
          <Link to="/" className="inline-flex items-center gap-1 text-xs uppercase tracking-fashion text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-3 w-3" /> Back
          </Link>
        </div>
        <div className="px-4 sm:px-8 pb-20 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Images */}
            <div className="space-y-3">
              <div className="aspect-square bg-secondary overflow-hidden">
                {images[selectedImageIdx]?.node && (
                  <img
                    src={images[selectedImageIdx].node.url}
                    alt={images[selectedImageIdx].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-16 h-16 flex-shrink-0 bg-secondary overflow-hidden border-2 transition-colors ${
                        idx === selectedImageIdx ? 'border-foreground' : 'border-transparent'
                      }`}
                    >
                      <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl uppercase tracking-fashion font-medium">{product.title}</h1>
              <p className="text-sm mt-2">
                {variant?.price.currencyCode} {parseFloat(variant?.price.amount || '0').toFixed(2)}
              </p>

              {/* Options */}
              {product.options.map((option) => (
                <div key={option.name} className="mt-6">
                  <label className="text-xs uppercase tracking-fashion text-muted-foreground block mb-3">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const variantIdx = product.variants.edges.findIndex(v =>
                        v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                      );
                      const isSelected = variant?.selectedOptions.some(o => o.name === option.name && o.value === value);
                      return (
                        <button
                          key={value}
                          onClick={() => variantIdx >= 0 && setSelectedVariantIdx(variantIdx)}
                          className={`px-4 py-2 text-xs uppercase tracking-fashion border transition-colors ${
                            isSelected
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border hover:border-foreground'
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddToCart}
                disabled={isLoading || !variant?.availableForSale}
                className="mt-8 w-full bg-foreground text-background py-4 text-xs uppercase tracking-fashion hover:opacity-80 transition-opacity disabled:opacity-40"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                ) : !variant?.availableForSale ? (
                  "Sold Out"
                ) : (
                  "Add to Bag"
                )}
              </button>

              {product.description && (
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs uppercase tracking-fashion text-muted-foreground mb-3">Description</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
