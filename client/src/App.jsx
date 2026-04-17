import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from "./components/Login"
import Profile from './components/Profile'
import AddProducts from './components/AddProduct'
import AllProducts from './components/AllProducts'
import ProductStats from './components/ProductStats'
import Cart from './components/Cart'
// import { useLocation } from 'react-router-dom'
export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<AllProducts/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/addProducts' element={<AddProducts/>}/>
        <Route path='/viewProductStats' element={<ProductStats/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  )
}