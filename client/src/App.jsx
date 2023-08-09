
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
import './app.css';



function App() {
    const authenticated = Auth();
    return (
        <div >
                <Navbar />
                {/* <Menu /> */}
                {/* <Courses /> */}
            <Router> 
                 <Routes>
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin" element={authenticated ? <Admin /> : <Signin />} />
                    <Route path="/c" element={<Courses />} /> 
                    {/* <Route path="/m" element={<Menu />} /> */}
                </Routes>
            </Router>
            <Footer />
        </div>
    )
}
export default App
