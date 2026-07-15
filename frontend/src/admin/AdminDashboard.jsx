import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalOrder: 0,
    totalProduct: 0,
    totalUser: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate("/login");
            return;
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back, {user.name}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-lg">Orders</h3>
          <p className="text-4xl font-bold mt-3 text-blue-600">
            {stats.totalOrder}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-lg">Products</h3>
          <p className="text-4xl font-bold mt-3 text-green-600">
            {stats.totalProduct}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-lg">Users</h3>
          <p className="text-4xl font-bold mt-3 text-purple-600">
            {stats.totalUser}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-lg">Revenue</h3>
          <p className="text-4xl font-bold mt-3 text-red-500">
            ₹{stats.totalRevenue}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
            <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition"
            >
            ➕ Add Product
            </button>
          <button
            onClick={() => navigate("/admin/products")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Manage Products
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
          >
            Manage Orders
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition"
          >
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;