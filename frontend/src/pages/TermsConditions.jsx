import React from "react";

const TermsConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6">
          Last Updated: July 2026
        </p>

        <section className="space-y-6 text-gray-700 leading-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>

            <p>
              By accessing and using this website, you agree to comply with
              these Terms and Conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              2. Products
            </h2>

            <p>
              We strive to ensure all product information, pricing, and
              availability are accurate. However, errors may occur and we
              reserve the right to correct them.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              3. Orders
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>All orders are subject to acceptance.</li>
              <li>Orders may be cancelled in exceptional situations.</li>
              <li>Prices are subject to change without notice.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              4. Payments
            </h2>

            <p>
              Payments are processed securely through trusted payment
              providers. We do not store your payment credentials.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              5. Shipping
            </h2>

            <p>
              Delivery times are estimates and may vary depending on location,
              courier availability, and unforeseen circumstances.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              6. Returns & Refunds
            </h2>

            <p>
              Products may be eligible for returns or refunds according to our
              return policy. Certain products may not qualify for returns.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              7. User Responsibilities
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>Provide accurate information.</li>
              <li>Maintain account security.</li>
              <li>Do not misuse the website.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              8. Limitation of Liability
            </h2>

            <p>
              We are not liable for indirect, incidental, or consequential
              damages arising from the use of our website or products.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              9. Changes to Terms
            </h2>

            <p>
              We reserve the right to modify these Terms and Conditions at any
              time. Continued use of the website constitutes acceptance of
              the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              10. Contact
            </h2>

            <p>
              For any questions regarding these Terms & Conditions, please
              contact our customer support team.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;