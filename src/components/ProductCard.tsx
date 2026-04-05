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
    <Link to="/product/$handle" params={{ handle: node.handle }} className="group block bg-background">
      <div className="aspect-square bg-secondary overflow-hidden relative">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] uppercase tracking-widest">
            No Image
          </div>
        )}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !variant?.availableForSale}
          className="absolute bottom-0 left-0 right-0 bg-foreground text-background text-[10px] uppercase tracking-widest py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-50"
        >
          {!variant?.availableForSale ? "Sold Out" : "Add to Bag"}
        </button>
      </div>
      <div className="py-4 px-2 text-center space-y-1">
        <h3 className="text-[11px] uppercase tracking-widest font-normal text-foreground leading-tight">{node.title}</h3>
        <p className="text-[11px] text-muted-foreground tracking-wider">
          $ {parseFloat(price.amount).toFixed(0)}
        </p>
      </div>
    </Link>
  );
}
