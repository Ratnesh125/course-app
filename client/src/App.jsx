
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import Footer from './Footer.jsx';
import Admin from './Admin.jsx';
import Auth from './Auth.jsx';
import Menu from './Menu.jsx';
import Courses from './Courses.jsx';
import React from 'react';
import Login from './Login.jsx';
import './app.css';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import Update from './Update.jsx';
import CheckoutPage from './Checkoutpage.jsx';



function App() {
    const authenticated = Auth();
    return (
        <div>
            <RecoilRoot>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/update/:courseId" element={<Update />} />
                        <Route path="/admin" element={authenticated ? <Admin /> : <Signin />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/checkout/:courseId" element={<CheckoutPage />} />
                    </Routes>
                </Router>
            </RecoilRoot>
        </div>
        
    )
}
export default App
