import React from "react";
import { Truck, ShieldCheck, Headphones, ShoppingBag } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <ShoppingBag className="mx-auto mb-5 w-16 h-16" />
          <h1 className="text-5xl font-bold mb-4">
            About Our Store
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-indigo-100">
            We believe shopping should be simple, secure, and enjoyable.
            Our goal is to provide premium products at affordable prices
            with a seamless online shopping experience.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/about.jpg"
            alt="About Us"
            className="rounded-2xl shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Who We Are
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              Welcome to our online store! We are passionate about delivering
              high-quality products that combine style, quality, and value.
              Whether you're looking for the latest trends or everyday
              essentials, we've got something for everyone.
            </p>

            <p className="text-gray-600 leading-8">
              Customer satisfaction is our highest priority. We work hard to
              ensure secure payments, fast delivery, and excellent customer
              support so you can shop with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Shop With Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <Truck className="text-indigo-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick and reliable shipping so your orders arrive on time.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <ShieldCheck className="text-green-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Shop confidently with secure payment gateways and encrypted
                transactions.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <Headphones className="text-purple-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Our support team is always ready to help with your questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Our Mission
          </h2>

          <p className="text-lg leading-8 text-indigo-100">
            Our mission is to make online shopping accessible, reliable,
            and enjoyable by offering premium-quality products, competitive
            pricing, and exceptional customer service.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;