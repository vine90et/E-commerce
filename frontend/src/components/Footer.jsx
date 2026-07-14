import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 ">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-3xl font-bold text-white"
            >
              ShopNest
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Your one-stop destination for quality products at affordable
              prices. Shop smarter with ShopNest.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-indigo-400 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-400 transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-indigo-400 transition">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Customer Support
            </h3>

            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-indigo-400 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-indigo-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-indigo-400 transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h3>

            <p>Email: support@shopnest.com</p>
            <p className="mt-2">Phone: +91 98765 43210</p>
            <p className="mt-2">New Delhi, India</p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;