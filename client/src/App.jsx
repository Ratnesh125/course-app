
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
        <div>
            <Navbar />
            {/* <Courses /> */}
            <Router>
                <Routes>
                    <Route path="/admin" element={authenticated ? <Admin /> : <Signin />} />
                    <Route path="/c" element={<Courses />} />
                    <Route path="/s" element={<Signup />} />
                    <Route path="/l" element={<Signin />} />

                </Routes>
            </Router>
        </div>
    )
}
export default App
