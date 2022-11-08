import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Admin/Login/index.jsx'

const PageRoutes = () => {
  return (
    <Routes>
        <Route path='/admin/login' element={<Login/>}/>
    </Routes>
  )
}

export default PageRoutes