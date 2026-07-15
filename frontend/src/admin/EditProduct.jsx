import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import ButtonLoader from '../components/ButtonLoader';

const EditProduct = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        imageUrl: ""
    })

    useEffect(() => {
      const fetchProduct = async()=>{
        try {
            const res = await fetch(`/api/products/${id}`)
            const data = await res.json();
            setFormData({name: data.product.name, description: data.product.description, price: data.product.price, category: data.product.category, stock: data.product.stock, imageUrl: data.product.imageUrl})
        } catch (error) {
            console.log(error)
        }
      }
      fetchProduct();
    }, [id])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        if(image) data.append('image', image)

        const res = await fetch(`/api/products/${id}`,{
            method: "PUT",
            headers: {Authorization: `Bearer ${user.token}`},
            body: data
        })
        setLoading(false);
        toast.success("Product updated successfully")
        navigate('/admin/products')
    }
    
    const handleChange = (e)=>{
        setFormData((prev)=> ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Product Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">Price</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Stock</label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Category</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Change Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
          >
            {loading ? <ButtonLoader /> : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct