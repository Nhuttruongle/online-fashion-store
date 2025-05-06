import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

import UserHome from '~/pages/user/Home/UserHome'
import AccountVerification from '~/pages/user/Auth/AccountVerification'
import UserLayout from '~/layout/UserLayout'
import Login from '~/pages/user/Auth/Login'
import Register from '~/pages/user/Auth/Register'
import Product from '~/pages/user/Product/Product'
import ProductDetail from '~/pages/user/ProductDetail/ProductDetail'
import Payment from '~/pages/user/Payment/Payment'
import Cart from '~/pages/user/Cart/Cart'
import AdminLayout from '~/layout/AdminLayout'
import UserManagement from '~/pages/admin/UserManagement'
import Dashboard from '~/pages/admin/Dashboard'
import ProductManagement from '~/pages/admin/ProductManagement'
import CategorieManagement from '~/pages/admin/CategorieManagement'
import OrderManagement from '~/pages/admin/OrderManagement'
import NotFound from '~/pages/404/NotFound'

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // Bật loading khi trang thay đổi
  useEffect(() => {
    setLoading(true)
  }, [location])

  // Tắt loading sau khi trang đã được tải
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 300) // Delay nhẹ để tránh sự giật lag

    return () => clearTimeout(timeout)
  }, [loading])

  return (
    <>
      {/* Backdrop - Hiển thị khi chuyển trang */}
      <Backdrop
        open={loading}
        sx={{
          backgroundColor: '#4791e6',
          color: '#fff',
          flexDirection: 'column',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <img
          src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmhraGNkeTViNHQzcjZxZGhtcGxnMnJvOW1vdXdneTQ2cGRkNjRndCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xdH0MjQ83lGFVv7gjR/giphy.gif'
          alt='Logo'
          style={{ width: 80, marginBottom: 20 }}
        />
        <CircularProgress sx={{ color: '#fff' }} />
      </Backdrop>

      <Routes>
        {/*Authentication*/}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='/account/verifycation' element={<AccountVerification />} />

        {/*Customer*/}
        <Route path='/' element={<UserLayout />}>
          <Route path='product' element={<Product />} />
          <Route path='productdetail' element={<ProductDetail />} />
          <Route path='payment' element={<Payment />} />
          <Route path='cart' element={<Cart />} />
          <Route index element={<UserHome />} />
        </Route>

        {/*Admin*/}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users' element={<UserManagement />} />
          <Route path='products' element={<ProductManagement />} />
          <Route path='categories' element={<CategorieManagement />} />
          <Route path='orders' element={<OrderManagement />} />
        </Route>

        {/*Not found 404*/}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
