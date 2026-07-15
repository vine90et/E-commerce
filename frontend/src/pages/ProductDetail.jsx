import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import {addToCart} from "../redux/cartSlice.js"

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(true);
    const [Product, setProduct] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProduct = async()=>{
            setLoading(true);
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                setProduct(data.product);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id])

    const handelAddToCart = ()=>{
        if(Product){
            dispatch(addToCart({
                product_id: Product._id,
                name: Product.name,
                price: Product.price,
                qty: 1,
                imageUrl: Product.imageUrl
            }));
            alert("successfully added to cart");
        }
    }

    if(Loading) return <Loader />
    if(!Product) return <h1 className='flex justify-center mt-5 font-semibold text-2xl '>Product Not Found!</h1>
    
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Image */}
        <div>
            <img
                src={Product.imageUrl}
                alt={Product.name}
                className="w-full h-137.5 object-cover rounded-xl shadow-lg"
            />
        </div>

        {/* Details */}
        <div className="flex flex-col">

            {/* Category */}
            <span className="uppercase text-sm tracking-wider text-gray-500">
                {Product.category}
            </span>

            {/* Name */}
            <h1 className="text-4xl font-bold mt-2">
                {Product.name}
            </h1>

            {/* Price */}
            <div className="mt-6">
                <h2 className="text-3xl font-bold text-green-600">
                    ₹{Product.price}
                </h2>
            </div>

            {/* Stock */}
            <div className="mt-3">
                {Product.stock > 0 ? (
                    <span className="text-green-600 font-semibold">
                        In Stock ({Product.stock} available)
                    </span>
                ) : (
                    <span className="text-red-600 font-semibold">
                        Out of Stock
                    </span>
                )}
            </div>

            {/* Description */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">
                    Description
                </h3>

                <p className="text-gray-600 leading-7">
                    {Product.description}
                </p>
            </div>

            {/* Features */}
            <div className="mt-8 space-y-3 text-gray-600">

                <div className="flex items-center gap-2">
                    🚚 Free Shipping
                </div>

                <div className="flex items-center gap-2">
                    🔄 7 Days Easy Return
                </div>

                <div className="flex items-center gap-2">
                    🔒 Secure Payment
                </div>

                <div className="flex items-center gap-2">
                    ✅ Genuine Product
                </div>

            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-10">

                <button
                    onClick={handelAddToCart}
                    disabled={Product.stock === 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
                >
                    Add to Cart
                </button>

                <button
                    disabled={Product.stock === 0}
                    onClick={()=> {
                        handelAddToCart()
                        navigate("/cart") 
                    }}
                    className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 rounded-lg font-semibold transition disabled:border-gray-400 disabled:text-gray-400"
                >
                    Buy Now
                </button>

            </div>

        </div>

    </div>
</div>
  )
}

export default ProductDetail