import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound'
import Layout from './Components/Layout/Layout'
import { tokenContext } from './Context/token'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Payment from './Components/Payment/Payment'
import UserAllOrders from './Components/UserAllOrders/UserAllOrders'
import Wishlist from './Components/Wishlist/Wishlist'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import ResetPass from './Components/ResetPass/ResetPass'



const routes = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: 'register', element: <Register /> },
      { path: 'forgetpass', element: <ForgetPass /> },
      { path: 'verifycode', element: <VerifyCode /> },
      { path: 'resetpassword', element: <ResetPass /> },
      { path: 'login', element: <Login /> },
      {
        path: 'home', element:
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
      },
      {
        path: '', element:
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
      },

      {
        path: 'cart', element:
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
      },
      {
        path: 'categories', element:
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
      },
      {
        path: 'brands', element:
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
      },
      {
        path: 'ProductDetails/:id', element:
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
      },
      {
        path: 'payment', element:
          <ProtectedRoutes>
            <Payment />
          </ProtectedRoutes>
      },
      {
        path: 'allorders', element:
          <ProtectedRoutes>
            <UserAllOrders />
          </ProtectedRoutes>
      },
      {
        path: 'wishlist', element:
          <ProtectedRoutes>
            <Wishlist />
          </ProtectedRoutes>
      },

      { path: '*', element: <NotFound /> },
    ]
  }
])



export default function App() {

  const { setToken, token } = useContext(tokenContext)

  useEffect(() => {
    if (localStorage.getItem("tkn") != null) {
      setToken(localStorage.getItem("tkn"))
    }
  }, [])



  return <RouterProvider router={routes}>

  </RouterProvider>
}