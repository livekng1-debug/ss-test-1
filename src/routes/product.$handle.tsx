import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchProductByHandle, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Loader2, ChevronDown } from "lucide-react";
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
  const [detailsOpen, setDetailsOpen] = useState(false);
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
          <p className="text-sm text-muted-foreground uppercase tracking-widest">Product not found</p>
          <Link to="/" className="text-xs uppercase tracking-widest underline">Back to Shop</Link>
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

  // Find the size option if it exists
  const sizeOption = product.options.find(o => o.name.toLowerCase() === "size");
  const otherOptions = product.options.filter(o => o.name.toLowerCase() !== "size");

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          {/* Left: Large product image */}
          <div className="relative bg-secondary/30">
            <div className="sticky top-16 h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
              {images[selectedImageIdx]?.node && (
                <img
                  src={images[selectedImageIdx].node.url}
                  alt={images[selectedImageIdx].node.altText || product.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>

          {/* Right: Product details */}
          <div className="px-8 lg:px-16 py-12 lg:py-16 flex flex-col">
            {/* Title & Price */}
            <div className="text-center mb-6">
              <h1 className="text-[13px] uppercase tracking-[0.2em] font-bold text-foreground">
                {product.title}
              </h1>
              <p className="text-[13px] text-foreground mt-1">
                $ {parseFloat(variant?.price.amount || '0').toFixed(2)}
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-[12px] text-center text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Image thumbnails */}
            {images.length > 1 && (
              <div className="flex justify-center gap-3 mb-8">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-[72px] h-[72px] bg-secondary/40 overflow-hidden border transition-colors ${
                      idx === selectedImageIdx ? 'border-foreground' : 'border-border'
                    }`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-border mb-6" />

            {/* Size selector */}
            {sizeOption && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] text-foreground">
                    Size: {sizeOption.name === "Size" ? "" : `(${sizeOption.name})`}
                  </span>
                </div>
                <div className="relative">
                  <select
                    value={variant?.selectedOptions.find(o => o.name === sizeOption.name)?.value || ''}
                    onChange={(e) => {
                      const idx = product.variants.edges.findIndex(v =>
                        v.node.selectedOptions.some(o => o.name === sizeOption.name && o.value === e.target.value)
                      );
                      if (idx >= 0) setSelectedVariantIdx(idx);
                    }}
                    className="w-full appearance-none border border-border bg-transparent px-4 py-3 text-[12px] text-foreground pr-10 focus:outline-none focus:border-foreground transition-colors"
                  >
                    {sizeOption.values.map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            )}

            {/* Other options (color, etc.) */}
            {otherOptions.map((option) => (
              <div key={option.name} className="mb-6">
                <span className="text-[12px] text-foreground block mb-3">{option.name}</span>
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
                        className={`px-4 py-2 text-[11px] uppercase tracking-widest border transition-colors ${
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

            {/* Add to Cart - black filled button */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="w-full bg-foreground text-background py-4 text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-80 transition-opacity disabled:opacity-40 mb-3"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : !variant?.availableForSale ? (
                "Sold Out"
              ) : (
                "Add to Cart"
              )}
            </button>

            {/* Terms text */}
            <p className="text-[10px] text-muted-foreground text-center mb-8">
              By placing this order, you agree to our{" "}
              <Link to="/terms-of-service" className="underline hover:text-foreground transition-colors">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy-policy" className="underline hover:text-foreground transition-colors">Privacy Policy</Link>.
            </p>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Product Details accordion */}
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between py-5 text-[11px] uppercase tracking-[0.2em] text-foreground font-medium border-b border-border"
            >
              Product Details
              <ChevronDown className={`w-4 h-4 transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
            </button>
            {detailsOpen && product.description && (
              <div className="py-4 border-b border-border">
                <p className="text-[12px] text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
