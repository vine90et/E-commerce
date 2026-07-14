import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        <h3 className="truncate text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <p className="mt-2 text-2xl font-bold text-indigo-600">
          ₹{product.price.toFixed(2)}
        </p>

        <Link
          to={`/products/${product._id}`}
          className="mt-5 inline-block w-full rounded-lg bg-indigo-600 py-2 text-center font-medium text-white transition hover:bg-indigo-700"
        >
          View Details
          
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;