import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
  <div className="max-w-7xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

    {cartItems.length === 0 ? (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>

        <p className="text-gray-500 mt-3">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    ) : (
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.product_id}
              className="flex flex-col md:flex-row items-center gap-6 border rounded-xl p-5 shadow-sm"
            >
              {/* Product Image */}
              {console.log(item)}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>

                <p className="text-blue-600 font-bold mt-2">
                  ₹{item.price}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      handleUpdateQty(item, item.qty - 1)
                    }
                    className="w-9 h-9 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>

                  <span className="font-semibold">{item.qty}</span>

                  <button
                    onClick={() =>
                      handleUpdateQty(item, item.qty + 1)
                    }
                    className="w-9 h-9 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="text-right">
                <h3 className="font-bold text-lg">
                  ₹{item.price * item.qty}
                </h3>

                <button
                  onClick={() => handleRemove(item.Product_id)}
                  className="mt-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border rounded-xl p-6 shadow-md h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Total Items</span>

            <span>
              {cartItems.reduce(
                (acc, item) => acc + item.qty,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Subtotal</span>

            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between mb-6">
            <span>Shipping</span>

            <span className="text-green-600">
              Free
            </span>
          </div>

          <hr />

          <div className="flex justify-between mt-6 text-xl font-bold">
            <span>Total</span>

            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default Cart;