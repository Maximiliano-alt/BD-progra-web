import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Admin/Login/index.jsx'
import Products from '../pages/Admin/Products/index.jsx';
const PageRoutes = () => {
  return (
    <Routes>
        <Route path='/admin/login' element={<Login/>}/>
        <Route path='/admin/products' element={<Products/>}/>
        <Route path='/client/allBuys' element={<Products/>}/>

    </Routes>
  )
}

export default PageRoutes