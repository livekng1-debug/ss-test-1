import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Minus, Plus, X, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
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
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full border-l border-border bg-background">
        <SheetHeader className="flex-shrink-0 pb-4 border-b border-border">
          <SheetTitle className="text-[11px] uppercase tracking-ro-wide font-normal">Shopping Bag</SheetTitle>
          <SheetDescription className="text-[10px] text-muted-foreground tracking-ro">
            {totalItems === 0 ? "Your bag is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[11px] text-muted-foreground uppercase tracking-ro">Your bag is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 pb-5 border-b border-border">
                      <div className="w-20 h-28 bg-secondary overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-[11px] uppercase tracking-ro">{item.product.node.title}</h4>
                          <button onClick={() => removeItem(item.variantId)} className="p-0.5 hover:opacity-60 transition-opacity">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 tracking-ro">{item.selectedOptions.map(o => o.value).join(' / ')}</p>
                        <p className="text-[11px] mt-2 tracking-ro">{item.price.currencyCode} {parseFloat(item.price.amount).toFixed(0)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button className="hover:opacity-60 transition-opacity" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-[11px] w-4 text-center">{item.quantity}</span>
                          <button className="hover:opacity-60 transition-opacity" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-5 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] uppercase tracking-ro">Total</span>
                  <span className="text-[11px] tracking-ro">{items[0]?.price.currencyCode || '$'} {totalPrice.toFixed(0)}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full uppercase tracking-ro-wide text-[10px] h-12 font-normal" disabled={items.length === 0 || isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-3 h-3 mr-2" />Checkout</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
