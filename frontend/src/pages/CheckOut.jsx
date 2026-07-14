import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";

const CheckOut = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullname: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handlePayment = async () => {
    try {
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        // Razorpay unconfigured exception handler
        const fallback = window.confirm(
          "Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?",
        );
        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const options = {
        key: "rzp_test_dummykey123", // Student dummy fallback
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ShopNest",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          if (verifyRes.ok) {
            const saveOrderRes = await fetch("/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id,
              }),
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate("/ordersuccess");
            } else {
              alert("Order saving failed");
            }
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: address.fullname,
          email: user?.email,
          contact: "9999999999",
        },
        theme: {
          color: "#f97316",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  const bypassPayment = async () => {
    const saveOrderRes = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: "bypass_txn_" + Date.now(),
      }),
    });
    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate("/ordersuccess");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    handlePayment();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Shipping Address */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-xl p-8 space-y-5"
          >
            <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>

            <div>
              <label className="block mb-2 font-medium">Full Name</label>

              <input
                type="text"
                required
                value={address.fullname}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    fullname: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Street Address</label>

              <input
                type="text"
                required
                value={address.street}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    street: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-medium">City</label>

                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      city: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Postal Code</label>

                <input
                  type="text"
                  required
                  value={address.postalCode}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      postalCode: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Country</label>

              <input
                type="text"
                required
                value={address.country}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    country: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-xl p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>

                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>

                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <hr className="my-6" />

          <div className="flex justify-between">
            <span>Items</span>

            <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
          </div>

          <div className="flex justify-between mt-3">
            <span>Shipping</span>

            <span className="text-green-600">Free</span>
          </div>

          <div className="flex justify-between mt-3 text-xl font-bold">
            <span>Total</span>

            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
