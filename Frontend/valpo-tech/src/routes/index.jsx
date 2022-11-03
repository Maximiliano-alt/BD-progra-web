import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login'

const PageRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/' element={<Login/>}/>
    </Routes>
  )
}

export default PageRoutes