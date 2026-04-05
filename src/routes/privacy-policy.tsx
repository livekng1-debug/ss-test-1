import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy">
      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold" style={{ fontFamily: "'Courier New', monospace" }}>
        Privacy Policy:
      </h2>
      <p>
        Sunslayer Hills operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). Sunslayer Hills is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us.
      </p>
      <p>
        Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Personal Information We Collect:
      </h2>
      <p>
        When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
      </p>
      <p>
        When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        How We Use Your Information:
      </h2>
      <p>
        We use the information that we collect to fulfill any orders placed through the Site, to communicate with you, to screen orders for potential risk or fraud, and to provide you with information or advertising relating to our products or services.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Contact Us:
      </h2>
      <p>
        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at support@sunslayerhills.com.
      </p>
    </PolicyPage>
  );
}
