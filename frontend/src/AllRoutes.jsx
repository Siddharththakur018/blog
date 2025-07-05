import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Blogs from './components/Blogs/Blogs'
import About from './components/Pages/About'
import ContactUs from './components/Pages/ContactUs'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import OurStory from './components/Pages/OurStory'
import Payment from './components/Payment/Payment'
import BlogView from './components/CreateBlogs/BlogView'
import CreateBlog from './components/CreateBlogs/CreateBlog'
import ViewBlogs from './components/Blogs/ViewBlogs'

function AllRoutes() {
    const location = useLocation();
    const hideNavbar = ['/signin']
    return (
        
        <>
                {!hideNavbar.includes(location.pathname) &&  <Navbar />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blogs />} />
                    <Route path="/blog-view" element={<BlogView />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact-us' element={<ContactUs />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/story' element={<OurStory />} ></Route>
                    <Route path='/subscribe' element={<Payment />} />
                    <Route path='/create-blog' element={<CreateBlog />} />
                    <Route path='/view-blog/:id' element={<ViewBlogs />} />
                </Routes>
        </>
    )
}

export default AllRoutes