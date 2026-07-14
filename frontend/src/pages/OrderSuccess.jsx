import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="text-green-600 w-16 h-16" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Order Successful!
        </h1>

        {/* Message */}
        <p className="text-gray-600 leading-relaxed mb-8">
          Thank you for your purchase. Your payment has been received
          successfully. We are preparing your order and will ship it soon.
          You'll receive an email with tracking details once it's dispatched.
        </p>

        {/* Order Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 border">
          <p className="text-gray-700">
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-green-600 font-medium">
              Payment Confirmed
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/products")}
            className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-300"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;