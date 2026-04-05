import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, X, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { CartItem } from "@/lib/shopify";

// Demo cart items using real product images
const DEMO_CART_ITEMS: CartItem[] = [
  {
    lineId: "demo-line-1",
    product: {
      node: {
        id: "demo-1",
        title: "2 FACE T-ECH TEE",
        description: "",
        handle: "2-face-t-ech-tee",
        priceRange: { minVariantPrice: { amount: "35", currencyCode: "USD" } },
        images: { edges: [{ node: { url: "https://cdn.shopify.com/s/files/1/0603/3693/0954/files/3ED9EDC9-ABA1-4ECB-A80E-7CD624F5AE6A.png?v=1768315725", altText: "2 Face T-ech Tee" } }] },
        variants: { edges: [] },
        options: [],
      },
    },
    variantId: "demo-variant-1",
    variantTitle: "M",
    price: { amount: "35", currencyCode: "USD" },
    quantity: 1,
    selectedOptions: [{ name: "Size", value: "M" }],
  },
  {
    lineId: "demo-line-2",
    product: {
      node: {
        id: "demo-2",
        title: "GREENWAVE HOODIE",
        description: "",
        handle: "greenwave-hoodie",
        priceRange: { minVariantPrice: { amount: "70", currencyCode: "USD" } },
        images: { edges: [{ node: { url: "https://cdn.shopify.com/s/files/1/0603/3693/0954/files/4A0432AB-7A8A-438E-A8EE-F32B72F1C4CC.png?v=1769081483", altText: "GREENWAVE HOODIE" } }] },
        variants: { edges: [] },
        options: [],
      },
    },
    variantId: "demo-variant-2",
    variantTitle: "L",
    price: { amount: "70", currencyCode: "USD" },
    quantity: 2,
    selectedOptions: [{ name: "Size", value: "L" }],
  },
];

export const CartDrawer = ({ demo }: { demo?: boolean } = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const { items: realItems, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();

  const items = demo ? DEMO_CART_ITEMS : realItems;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currency = items[0]?.price.currencyCode || "USD";

  useEffect(() => { if (isOpen && !demo) syncCart(); }, [isOpen, syncCart, demo]);

  const handleCheckout = () => {
    if (demo) return;
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="text-[11px] uppercase tracking-ro text-foreground hover:opacity-60 transition-opacity" aria-label="Cart">
          BAG [ {totalItems} ]
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[420px] flex flex-col h-full border-l border-border bg-background p-0">
        {/* Header */}
        <SheetHeader className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-normal tracking-tight" style={{ fontFamily: "'Courier New', monospace" }}>
              Cart <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-border text-sm">{totalItems}</span>
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[11px] text-muted-foreground uppercase tracking-widest">Your bag is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-5">
                  {items.map((item) => {
                    const imageUrl = item.product.node.images?.edges?.[0]?.node?.url;
                    return (
                      <div key={item.variantId} className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-muted overflow-hidden flex-shrink-0 rounded">
                          {imageUrl && (
                            <img src={imageUrl} alt={item.product.node.title} className="w-full h-full object-cover" />
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-medium text-foreground uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
                                {item.product.node.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-0.5">{item.selectedOptions.map(o => o.value).join(' / ')}</p>
                              <p className="text-sm text-foreground mt-0.5">${parseFloat(item.price.amount).toFixed(0)}</p>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-border rounded">
                              <button
                                className="px-2 py-1 hover:opacity-60 transition-opacity"
                                onClick={() => !demo && updateQuantity(item.variantId, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3 py-1 text-sm text-center min-w-[32px]">{item.quantity}</span>
                              <button
                                className="px-2 py-1 hover:opacity-60 transition-opacity"
                                onClick={() => !demo && updateQuantity(item.variantId, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              className="p-1 hover:opacity-60 transition-opacity"
                              onClick={() => !demo && removeItem(item.variantId)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 border-t border-border bg-background">
                {/* Discount */}
                <button
                  className="w-full flex items-center justify-between px-6 py-3 border-b border-border hover:bg-muted/30 transition-colors"
                  onClick={() => setDiscountOpen(!discountOpen)}
                >
                  <span className="text-sm text-foreground" style={{ fontFamily: "'Courier New', monospace" }}>Discount</span>
                  {discountOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {discountOpen && (
                  <div className="px-6 py-3 border-b border-border">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code"
                        className="flex-1 border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                      <button className="px-4 py-2 bg-foreground text-background text-xs uppercase tracking-widest hover:opacity-80 transition-opacity">
                        Apply
                      </button>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="px-6 py-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm text-foreground" style={{ fontFamily: "'Courier New', monospace" }}>Estimated total</span>
                    <span className="text-xl font-medium text-foreground" style={{ fontFamily: "'Courier New', monospace" }}>
                      ${totalPrice.toFixed(0)} {currency}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">Taxes and shipping calculated at checkout.</p>

                  <button
                    onClick={handleCheckout}
                    disabled={items.length === 0 || isLoading || isSyncing}
                    className="w-full py-3.5 bg-foreground text-background text-[11px] uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : "CHECK OUT"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
