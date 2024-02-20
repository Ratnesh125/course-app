import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Auth from '../auth/Auth.jsx';

function Header() {
    const navigate = useNavigate();
    const authStatus = Auth();
    const [showComponent, setShowComponent] = React.useState(false);

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true,
        },
        {
            name: 'Login',
            slug: '/signin',
            active: !authStatus,
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus,
        },
        {
            name: 'Admin Dashboard',
            slug: '/admin',
            active: authStatus,
        },
        {
            name: 'Purchases',
            slug: '/purchases',
            active: authStatus,
        },
        {
            name: 'Logout',
            slug: '/signin',
            active: authStatus,
        },
        {
            name: 'Cart',
            slug: '/cart',
            active: true,
        },
    ];
    const [isLogoHidden, setIsLogoHidden] = React.useState(true);
    const toggleMenu = () => {
        setIsLogoHidden(!isLogoHidden);
    };
    const handleLogout =()=>{
        localStorage.removeItem('token');   
        location.reload();


    }
    return (
        <header className='py-3 shadow border-2 border-rose-500'>

            <nav className='border-2 border-rose-500 flex flex-row sm:flex-row justify-between sm:bg-gray-300 md:bg-yellow-400 lg:bg-green-500 xl:bg-blue-600 2xl:bg-purple-700'>

                <div className=''>
                    <span className={`sm:hidden`} onClick={toggleMenu}>Menu</span>
                    <Link to='/'>
                        <span className='text-2xl sm:text-3xl md:text-4xl '>Coursera</span>
                    </Link>
                </div>
                <ul className={`sm:flex sm:flex-row flex flex-col items-center justify-center ${isLogoHidden ?"hidden":" "}`}>
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <button
                                    
                                    onClick={() => (item.name === "Logout") ? handleLogout() && navigate(item.slug) : navigate(item.slug)}
                                    className={`text-xl inline-block px-6 py-2 duration-200 hover:bg-blue-500 rounded-full mb-2 ${authStatus ? 'ml-4' : ''
                                        } sm:mb-0 sm:ml-4 md:ml-0 lg:mb-0 lg:ml-4 xl:mb-2 xl:ml-0 2xl:mb-0 2xl:ml-4`}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    )}
                </ul>
            </nav>

        </header>
    );
}

export default Header;
