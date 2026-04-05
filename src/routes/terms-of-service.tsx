import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  return (
    <PolicyPage title="Terms of Service">
      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold" style={{ fontFamily: "'Courier New', monospace" }}>
        Terms of Service:
      </h2>
      <p>
        This website is operated by Sunslayer Hills. Throughout the site, the terms "we", "us" and "our" refer to Sunslayer Hills. Sunslayer Hills offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
      </p>
      <p>
        By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions. These Terms of Service apply to all users of the site.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Online Store Terms:
      </h2>
      <p>
        By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        General Conditions:
      </h2>
      <p>
        We reserve the right to refuse service to anyone for any reason at any time. You understand that your content may be transferred unencrypted and involve transmissions over various networks. Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice at any time.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Contact Information:
      </h2>
      <p>
        Questions about the Terms of Service should be sent to us at help@sunslayerhills.com.
      </p>
    </PolicyPage>
  );
}
