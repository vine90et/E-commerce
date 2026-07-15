import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUsers(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-semibold">Loading Users...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h1 className="text-3xl font-bold text-gray-800">
            User Management
          </h1>
          <p className="text-gray-500 mt-1">
            Total Users: {users.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr
                  key={u._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4 font-medium">
                    {u.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {u.email}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;