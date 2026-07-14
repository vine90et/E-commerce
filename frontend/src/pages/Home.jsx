import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page) => {
      setLoading(true);

      try {
        const res = await fetch(`/api/products?page=${page}&limit=4`);
        const data = await res.json();

        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-12">

          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center text-center py-16">
            <h1 className="text-5xl font-extrabold text-slate-900">
              Welcome to <span className="text-indigo-600">ShopNest</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-600">
              Discover premium products at unbeatable prices. From everyday
              essentials to the latest trends, ShopNest has everything you need
              in one place.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition cursor-pointer">
                Shop Now
              </button>

              <button className="rounded-lg border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 hover:bg-indigo-50 transition cursor-pointer">
                Explore
              </button>
            </div>
          </section>

          {/* Featured Products */}
          <section>
            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Featured Products
            </h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="mt-10 flex justify-center items-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
              >
                Previous
              </button>

              <span className="font-semibold">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </section>

        </div>
      )}
    </>
  );
};

export default Home;