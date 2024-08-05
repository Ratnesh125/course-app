import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/auth/Signup.jsx';
import Signin from './components/auth/Signin.jsx';
import Admin from './components/admin/Admin.jsx';
import Courses from './components/home/Courses.jsx';
import React from 'react';
import Login from './components/auth/Login.jsx';
// import './app.css';
import Update from './Update.jsx';
import CheckoutPage from './components/payments/CheckoutPage.jsx';
import About from './components/about/About.jsx';
import NotFound from "./components/notfound/NotFound.jsx";
import Layout from './Layout.jsx';
import Home from './components/home/Home.jsx';
import Header from './components/header/Header.jsx';
import Cart from './components/cart/Cart.jsx';


function App() {
    
    return (
        <div className='max-sm max-md max-lg max-xl max-2xl'>
            <RecoilRoot>z
                <Router>
                    <Routes >
                        <Route path="/" element={<Layout />} >
                            <Route path="" element={<Home />} />
                            <Route path="update/:courseId" element={<Update />} />
                            <Route path="admin" element={<Admin />} />
                            <Route path="courses" element={<Courses />} />
                            <Route path="signup" element={<Signup />} />
                            <Route path="signin" element={<Signin />} />
                            <Route path="login" element={<Login />} />
                            <Route path="about" element={<About />} />
                            <Route path="header" element={<Header />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="checkout/:courseId" element={<CheckoutPage />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </RecoilRoot>
        </div>
    )
}
const styles = {
    container: {
        maxWidth: '100%', // Initial full width
        margin: '0 auto', // Center the container horizontally

        // Media queries for different breakpoints
        '@media only screen and (min-width: 960px)': {
            maxWidth: '80%', // Styles for browsers larger than 960px
        },
        '@media only screen and (min-width: 1440px)': {
            maxWidth: '60%', // Styles for browsers larger than 1440px
        },
        '@media only screen and (min-width: 2000px)': {
            maxWidth: '50%', // Styles for very large screens
        },
        '@media only screen and (max-device-width: 480px)': {
            maxWidth: '100%', // Styles for mobile browsers smaller than 480px
        },
        '@media only screen and (device-width: 768px)': {
            maxWidth: '100%', // Default styles for iPad screens
        },
        '@media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)': {
            maxWidth: '75%', // Portrait layout for iPad
        },
        '@media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)': {
            maxWidth: '90%', // Landscape layout for iPad
        },
    },
};
export default App
