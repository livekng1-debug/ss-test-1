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
        Standard shipping on local and domestic orders - Please allow 10-15 business days for your order to be processed and shipped. Unless specified ready to ship items - Please allow 3-5 days for dispatch. We make a lot of our products made to order, we try our best to be as eco friendly as possible and not wasting any fabrics that are not needed. Once your order has shipped you will receive a confirmation email containing USPS tracking information.
      </p>
      <p>
        International orders are shipped within 15 business days and take up to 12-15 business days following order processing for delivery through local post. Once your order has shipped, you will receive a confirmation email containing USPS tracking information.
      </p>
      <p>
        We are not responsible for packages once they are dropped off to our shipping carrier. That responsibility is now between the shipping carrier (USPS) and the customer. For claims and issues with the delivery of your package please contact your local USPS customer service provider. It is the customers responsibility to be at the delivery location on the day its supposed to be delivered.
      </p>
      <p>
        Please verify that your shipping address is correct when ordering and contains right apartment number if necessary. We are not responsible or liable for any lost or stolen packages. Items stuck in transit are out of our control and need to be dealt with the shipping provider (USPS).
      </p>
      <p>
        If your order is returned to our facility by USPS due to any circumstances, you are financially responsible for any extra shipping costs correlated with your order.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Changing Shipping Address:
      </h2>
      <p>
        Shipping addresses cannot be changed. We will only ship to the address entered when the order was originally placed.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Am I Able to Cancel My Order?
      </h2>
      <p>
        Once an order is processed, we cannot cancel or modify a shipment.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        How Can I Track My Order?
      </h2>
      <p>
        Once your package has shipped, you will receive an email with tracking information provided by USPS.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Exchange Policy:
      </h2>
      <p>
        All sales are final. No refunds or exchanges. Unless there is an error due to the shipper. Due to the limited nature of our product we can not process exchanges for incorrect sizes so please check out our sizing chart.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Return Policy:
      </h2>
      <p>
        No Returns or Exchanges - All Sales are Final.
      </p>
      <p>
        We allow 30-day returns if your order is damaged or irregular please contact support@sunslayerhills.com and we will replace it for you. You must contact us within 30 business days of receiving your order.
      </p>
    </PolicyPage>
  );
}
