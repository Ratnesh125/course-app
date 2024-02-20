import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer.jsx';
import Header from './components/header/Header.jsx';

function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout