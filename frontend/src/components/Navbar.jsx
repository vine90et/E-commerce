import React, { useContext } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {useSelector} from 'react-redux'

const Navbar = () => {
    const {user, logout} = useContext(AuthContext)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const navigate = useNavigate()

    const handelLogout = ()=>{
        logout();
        navigate('/login');
    }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-indigo-600 transition hover:text-indigo-700"
        >
          ShopNest
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link
              to="/"
              className="transition duration-200 hover:text-indigo-600"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className="transition duration-200 hover:text-indigo-600"
            >
              Cart
              ({cartItems.length})
            </Link>
          </li>

          <div className="flex gap-5">
            {
                user ? 
                <>
                    <p>Hi, {user.name}</p>
                    {user.role === 'admin' && <li><Link to="/admin">Admin</Link> </li>}
                    <li>
                        <button
                            onClick={handelLogout}
                            className="btn transition duration-200 hover:text-indigo-600 "
                            >
                            logout
                        </button>
                    </li>
                </>
                :
                <li>
                    <Link
                        to="/login"
                        className="transition duration-200 hover:text-indigo-600"
                        >
                        login
                    </Link>
                </li>
            }
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;