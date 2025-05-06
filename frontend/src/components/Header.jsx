import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { HiX, HiMenu } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';


const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const activeLink = location.pathname;
    const [auth, setAuth] = useAuth();

    const handleLogout = async () => {
        try {
            console.log('first')
            const res = await fetch('https://countryapis-backend.onrender.com/api/v1/auth/Signout', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
              });
              const data = await res.json();
            console.log('herder');
              console.log(data);

            if (data.success) {
                toast.success(data.message);
                localStorage.removeItem('auth');
                Cookies.remove('access_token');
                setAuth({ user: null });
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Logout failed:');
        }
    };

    // console.log(auth);

    const navLinks = [
        {href : "/", lable: "Home"},
        {href : "/about", lable: "About Us"},
        {href : "/Service", lable: "Our Service"}
    ]

    return (
        <nav className='fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-teal-sm backdrop-blur-md z-50 border-b border-gray-50 dark:border-gray-900 shadow-sm'>
            <div className='w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-2 md:h-20 h-20'>
                {/*logo*/}
                <div className='flex items-center gap-1 cursor-pointer '>
                    {/* bg-teal-600 rounded-lg px-6 py-1  */}
                    <img src='/LogoWorldWiss.png' alt='Logo' className='w-15 h-15'/>
                    <div className='ml-2 text-sm lg:text-xl font-medium dark:text-teal-100 text-teal-600'>WorldWise</div>
                </div>
    
                {/* Mobile menu button */}
                    <button onClick={() => setMenuOpen(!isMenuOpen)} className='md:hidden p-2'>
                        {
                            isMenuOpen ? <HiX className='size-8 dark:text-teal-100'/> : <HiMenu className='size-8 dark:text-teal-100'/>
                        }
                    </button>
    
    
                {/*desktop nav*/}
                <div className='hidden md:flex items-center gap-10'>
                    {
                        navLinks.map((link, index) => (
                            <a key={index} href={link.href} 
                            onClick={() => setActiveLink(link.href)}
                            className={`text-sm lg:text-xl font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                                after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all 
                                ${ activeLink === link.href ? "text-teal-600 after:w-full": "text-gray-600 dark:text-teal-100 hover:text-gray-900 dark:hover:text-teal-600" }`}>
                                {link.lable}
                            </a> 
                        ))
                    }
                </div>
    
                
                
    
                {/*get touch button*/}
                    <div className='hidden md:flex gap-3'>
                    {/* <button
                        onClick={() => handelThemeChange(theme === 'dark' ? 'light' : 'dark')}
                        className='p-2 transition-colors '
                            
                        >
                        {theme === 'dark' ? <Sun className="text-teal-600" /> : <Moon className="text-teal-600" />}
                    </button> */}
                    {auth.user ? (
                        <>
                            <button 
                            onClick={handleLogout}
                            className='hidden md:block bg-teal-600 hover:bg-teal-700 text-white dark:text-teal-100 dark:text-teal-100 dark:bg-teal-800 dark:hover:bg-teal-900 lg:text-xl px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-teal-100'>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <button className='hidden md:block bg-teal-600 hover:bg-teal-700 text-white dark:text-teal-100 dark:bg-teal-800 dark:hover:bg-teal-900 lg:text-xl px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-teal-100'>
                                <a href="/SignIn">Sign in</a>
                            </button>
                            <button className='hidden md:block bg-teal-600 hover:bg-teal-700 text-white dark:text-teal-100 dark:bg-teal-800 dark:hover:bg-teal-900 lg:text-xl px-6 py-2.5 rounded-lg
                            text-sm font-medium transition-all hover:shadow-teal-100'>
                                <a href="/Signup">Sign up</a>
                            </button>
                        </>
                    )}
                </div>
    
                {/*mobile menu */}
    
            </div>
    
            {/* mobile menu Items */}
            {
                isMenuOpen && (
                    <div className='md:hidden bg-white dark:bg-gray-900 border-t border-white dark:border-gray-900 py-4'>
                        <div className='container mx-auto px-4 space-y-4'>
                            {navLinks.map((link, index) => (
                                <a key={index}
                                onClick={() => {
                                    setActiveLink(link.href);
                                    setMenuOpen(false);
                                }}
                                className={`block text-sm font-medium py-2 ${activeLink === link.href ? "text-teal-600" : "text-gray-600 hover:text-gray-900 dark:text-teal-100 dark:hover:text-teal-600"}`} href={link.href}>{link.lable}</a>
                            ))}
    
                            <div className='flex flex-col gap-1'>
                                {auth.user ? (
                                    <>
                                        <button 
                                        onClick={handleLogout}
                                        className='w-full bg-teal-600 hover:bg-teal-700 text-white dark:text-teal-100 dark:bg-teal-800 dark:hover:bg-teal-900 px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-teal-100'>
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className='w-full bg-teal-600 hover:bg-teal-700 text-white dark:text-teal-100 dark:bg-teal-800 dark:hover:bg-teal-900 px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-teal-100'>
                                            <a href="/SignIn">Sign in</a>
                                        </button>
                                        <button className='w-full bg-teal-600 hover:bg-teal-700 text-white dark:text-teal-100 dark:bg-teal-800 dark:hover:bg-teal-900 px-6 py-2.5 rounded-lg 
                                        text-sm font-medium transition-all hover:shadow-teal-100'>
                                            <a href="/Signup">Sign up</a>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </nav>
      )
    }
    
    export default Header