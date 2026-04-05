import { Link } from "@tanstack/react-router";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const variant = node.variants.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to bag", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <Link to="/product/$handle" params={{ handle: node.handle }} className="group block">
      <div className="aspect-[3/4] bg-secondary overflow-hidden relative">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] uppercase tracking-ro">
            No Image
          </div>
        )}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !variant?.availableForSale}
          className="absolute bottom-0 left-0 right-0 bg-foreground text-background text-[10px] uppercase tracking-ro-wide py-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-50"
        >
          {!variant?.availableForSale ? "Sold Out" : "Add to Bag"}
        </button>
      </div>
      <div className="mt-4 space-y-1.5">
        <h3 className="text-[11px] uppercase tracking-ro font-normal text-foreground">{node.title}</h3>
        <p className="text-[11px] text-muted-foreground tracking-ro">
          {price.currencyCode} {parseFloat(price.amount).toFixed(0)}
        </p>
      </div>
    </Link>
  );
}
