import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/shipping-policy")({
  component: ShippingPolicyPage,
});

function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping Policy">
      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold" style={{ fontFamily: "'Courier New', monospace" }}>
        Shipping Policy:
      </h2>
      <p>
        All orders are processed within 1-3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Domestic Shipping:
      </h2>
      <p>
        We offer standard and expedited shipping options for domestic orders within the United States. Standard shipping typically takes 5-7 business days. Expedited shipping typically takes 2-3 business days.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        International Shipping:
      </h2>
      <p>
        We currently ship to select international destinations. International shipping times vary depending on the destination and may take 10-21 business days. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the buyer.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Tracking Information:
      </h2>
      <p>
        Once your order has shipped, you will receive a shipping confirmation email with a tracking number. You can use this tracking number to monitor the progress of your shipment.
      </p>
    </PolicyPage>
  );
}
