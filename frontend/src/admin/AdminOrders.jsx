import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/order/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update order");
      }

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );

      toast.success("Order updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Change Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    {order._id.slice(-8)}
                  </td>

                  <td className="px-4 py-4">
                    {order.user?.name || "N/A"}
                  </td>

                  <td className="px-4 py-4">
                    {order.items?.length || 0}
                  </td>

                  <td className="px-4 py-4 font-semibold">
                    ₹{order.totalPrice}
                  </td>

                  <td className="px-4 py-4">
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">
                        Processing
                      </option>
                      <option value="Shipped">
                        Shipped
                      </option>
                      <option value="Delivered">
                        Delivered
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;