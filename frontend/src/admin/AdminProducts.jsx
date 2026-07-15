import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (pageNumber) => {
      try {
        setLoading(true);

        const res = await fetch(`/api/products?page=${pageNumber}&limit=4`);
        const data = await res.json();

        if (res.ok) {
          if (pageNumber === 1) {
            setProducts(data.products);
          } else {
            setProducts((prev) => [...prev, ...data.products]);
          }

          setHasMore(pageNumber < data.totalPages);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-xl font-semibold">Loading Products...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Product Management
            </h1>
            <p className="text-gray-500">
              Total Products: {products.length}
            </p>
          </div>

          <Link
            to="/admin/add-product"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
          >
            + Add Product
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {product.name}
                  </td>

                  <td className="px-6 py-4">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-center font-semibold">
                    ₹{product.price}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-8">
                
              {hasMore && (
                <button
                  onClick={handleShowMore}
                  disabled={loading}
                  className="px-6 py-3 my-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  {loading ? "Loading..." : "Show More"}
                </button>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;