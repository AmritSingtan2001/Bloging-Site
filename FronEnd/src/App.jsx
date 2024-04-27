import React from 'react'
import {  Routes, Route } from 'react-router-dom';
import Login from './components/header/login'
import Register from './components/header/register'
import BlogDetail from './components/header/blogDetail'
import Header from './components/header/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import BlogPostForm from './components/header/blogPostForm';
import BlogTable from './components/header/blogTable';

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
          <Route path="/create-post" element={<BlogPostForm/>}/>
          <Route path="/all-blogs" element={<BlogTable/>}/>

        </Routes>
        <Footer/>
      </div>
    </div>

  )
}

export default App