import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch("/api/order/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        console.log(data)

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
          console.log(orders)
        } else {
          if (res.status === 401) {
            logout();
            navigate("/login");
          }
          setOrders([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate]);

  useEffect(() => {
  console.log("Orders state:", orders);
}, [orders]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">

            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>

                <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {user.role}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Orders */}

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">My Orders</h2>

          {loading ? (
            <p>Loading...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold">
                You haven't placed any orders yet.
              </h3>

              <button
                onClick={() => navigate("/products")}
                className="mt-5 bg-black text-white px-6 py-3 rounded-lg"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-xl p-6 shadow-sm"
                >
                  {/* Order Header */}

                  <div className="flex flex-col md:flex-row justify-between mb-6">

                    <div>
                      <h3 className="font-semibold text-lg">
                        Order #{order._id.slice(-8)}
                      </h3>

                      <p className="text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0 text-right">
                      <p className="font-bold text-xl">
                        ₹{order.totalAmount}
                      </p>

                      <div className="flex gap-2 justify-end mt-2">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Pending"}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.isDelivered
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.isDelivered
                            ? "Delivered"
                            : "Processing"}
                        </span>

                      </div>
                    </div>
                  </div>

                  {/* Products */}

                  <div className="space-y-4">

                    {order.items?.map((item) => (
    <div
        key={item._id}
        className="flex items-center gap-5 border rounded-lg p-4"
    >
        <img
            src={item.product_id?.imageUrl}
            alt={item.product_id?.name}
            className="w-24 h-24 rounded-lg object-cover"
        />

        <div className="flex-1">
            <h4 className="font-semibold text-lg">
                {item.product_id?.name}
            </h4>

            <p>Quantity: {item.qty}</p>

            <p className="font-semibold text-blue-600">
                ₹{item.price}
            </p>
        </div>
    </div>
))}

                  </div>

                  {/* Shipping */}

                  <div className="mt-6 border-t pt-4">

                    <h4 className="font-semibold mb-2">
                      Shipping Address
                    </h4>

                    <p className="text-gray-600">
                      {order.address.street}
                    </p>

                    <p className="text-gray-600">
                      {order.address.city},{" "}
                      {order.address.postalCode}
                    </p>

                    <p className="text-gray-600">
                      {order.address.country}
                    </p>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;