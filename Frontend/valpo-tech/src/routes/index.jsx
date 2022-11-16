import React from 'react'
import { Routes, Route,Switch } from 'react-router-dom';
import Login from '../pages/Admin/Login/index.jsx'
import Products from '../pages/Admin/Products/index.jsx';
import AllBuys from '../pages/Client/AllBuys/index.jsx';
const PageRoutes = () => {
  return (
    <Routes>
        <Route path='/admin/login' component={<Login/>}/>
        <Route path='/admin/products' component={<Products/>}/>
        <Route path='/client/allBuys/:rut' component={<AllBuys/>}/>        
    </Routes>
  )
}

export default PageRoutes