import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import OrderSuccess from './pages/OrderSuccess'
import Profile from './pages/Profile'
import AdminDashboard from './admin/AdminDashboard'
import AdminUsers from './admin/AdminUsers'
import AdminProducts from './admin/AdminProducts'
import AddProduct from './admin/AddProduct'
import EditProduct from './admin/EditProduct'
import AdminOrders from './admin/AdminOrders'
import About from './pages/About'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App
