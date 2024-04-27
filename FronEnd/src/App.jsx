import React from 'react'
import {  Routes, Route } from 'react-router-dom';
import Login from './components/header/login'
import Register from './components/header/register'
import BlogDetail from './components/header/blogDetail'
import Header from './components/header/Header';
import Home from './components/Home';


const App = () => {
  return (
    <div className="">
      <div className="">
      <Header />
      <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/details/:id" element={<BlogDetail />} />
          </Routes>
      </div>
    </div>

  )
}

export default App