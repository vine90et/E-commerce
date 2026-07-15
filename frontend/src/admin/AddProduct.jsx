import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("image", image);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const response = await res.json();
      

      if (res.ok) {
        toast.success("Product added successfully");
        useEffect(() => {
            const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                console.log(data.products)

                if (res.ok) {
                setProducts(Array.isArray(data.products) ? data.products : []);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
            };
            fetchProducts();
        }, [])
        
        navigate("/admin/products");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Add New Product
        </h1>

        <p className="text-gray-500 mb-8">
          Fill in the details below to publish a new product.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter description"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Electronics, Clothing..."
              required
            />
          </div>

          <div>

            <label className="block mb-2 font-medium">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="block w-full"
              required
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-5 w-48 h-48 object-cover rounded-lg border"
              />
            )}

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Uploading Product..." : "Publish Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;