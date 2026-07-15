import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6">
          Last Updated: July 2026
        </p>

        <section className="space-y-6 text-gray-700 leading-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              1. Introduction
            </h2>
            <p>
              We value your privacy and are committed to protecting your
              personal information. This Privacy Policy explains how we
              collect, use, and safeguard the information you provide while
              using our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              2. Information We Collect
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Shipping address</li>
              <li>Phone number</li>
              <li>Payment-related information (processed securely)</li>
              <li>Order history</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              3. How We Use Your Information
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>Process your orders</li>
              <li>Deliver purchased products</li>
              <li>Improve our services</li>
              <li>Provide customer support</li>
              <li>Send order updates and notifications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              4. Data Security
            </h2>

            <p>
              We use industry-standard security practices to protect your
              personal information against unauthorized access, disclosure,
              or misuse.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              5. Cookies
            </h2>

            <p>
              We may use cookies to improve website functionality, remember
              user preferences, and provide a better shopping experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              6. Third-Party Services
            </h2>

            <p>
              We may use trusted third-party services such as payment gateways
              and shipping providers to complete your orders securely.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              7. Contact Us
            </h2>

            <p>
              If you have any questions regarding this Privacy Policy,
              please contact our support team.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;