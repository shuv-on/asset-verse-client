import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; 
import useRole from '../../hooks/useRole'; 

const NavBar = () => {
   
    const { user, logOut } = useAuth(); 
    const [role] = useRole(); 
    const navigate = useNavigate();

    console.log("User:", user);
    console.log("Role:", role);
    
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleLogOut = () => {
        logOut()
            .then(() => navigate('/login'))
            .catch(err => console.log(err));
    }

    const getLinkClass = ({ isActive }) =>
        `flex items-center gap-2 m-2 hover:border-b-2 hover:border-sky-500 font-medium ${isActive ? 'border-b-2 border-sky-500 text-sky-500' : ''}`;

    const navLinks = <>
        <li><NavLink to="/" className={getLinkClass}><span className='text-gray-500 '>Home</span></NavLink></li>
        
       
        {!user && (
            <>
                <li><NavLink to="/join-employee" className={getLinkClass}><span className='text-gray-500 '>Join as Employee</span></NavLink></li>
                <li><NavLink to="/join-hr" className={getLinkClass}><span className='text-gray-500 '>Join as HR</span></NavLink></li>
            </>
        )}

        
        {user && role === 'hr' && (
            <>
                <li><NavLink to="/asset-list" className={getLinkClass}><span className='text-gray-500 '>Asset List</span> </NavLink></li>
                <li><NavLink to="/add-asset" className={getLinkClass}> <span className='text-gray-500 '>Add Asset</span> </NavLink></li>
                <li><NavLink to="/all-requests" className={getLinkClass}><span className='text-gray-500 '>All Requests</span></NavLink></li>
                <li><NavLink to="/my-employee-list" className={getLinkClass}><span className='text-gray-500 '>My Employees</span></NavLink></li>
                <li><NavLink to="/profile" className={getLinkClass}><span className='text-gray-500 '>Profile</span></NavLink></li>
            </>
        )}

        
        {user && role === 'employee' && (
            <>
                <li><NavLink to="/my-assets" className={getLinkClass}><span className='text-gray-500 '>My Assets</span></NavLink></li>
                <li><NavLink to="/my-team" className={getLinkClass}><span className='text-gray-500 '>My Team</span></NavLink></li>
                <li><NavLink to="/request-asset" className={getLinkClass}><span className='text-gray-500 '>Request Asset</span></NavLink></li>
                <li><NavLink to="/profile" className={getLinkClass}><span className='text-gray-500 '>Profile</span></NavLink></li>
            </>
        )}
    </>;

    return (
        <div className=''>
            <div className="navbar bg-base-100 shadow-sm px-2 sm:px-5 sticky top-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-gray-500">
                            {navLinks}
                            {!user ? (
                                <>
                                    <li className="mt-2">
                                        <Link to="/login" className="btn bg-sky-600 hover:bg-sky-700 btn-sm w-full text-white border-none">Login</Link>
                                    </li>
                                </>
                            ) : (
                                <li className="mt-2">
                                    <button onClick={handleLogOut} className="btn btn-outline btn-error btn-sm w-full">LogOut</button>
                                </li>
                            )}
                        </ul>
                    </div>
                    
                    <div className='mx-2 md:mx-5'>
                        <Link to="/" className='flex items-center justify-around gap-2'>
                            <h1 className='text-xl font-bold'>
                                <span className='text-sky-600'>Asset</span>
                                <span className='text-sky-400'>Verse</span>
                            </h1>
                        </Link>
                    </div>

                    <label className="swap swap-rotate flex lg:hidden mx-2">
                        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                        <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,1,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                        <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,0,8.5,12,3.5,3.5,0,0,0,12,15.5Z"/></svg>
                    </label>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-gray-500 dark:text-gray-300">
                        {navLinks}
                    </ul>
                </div>
                
                <div className="navbar-end gap-0.5 sm:gap-2">
                    <label className="swap swap-rotate hidden lg:flex">
                        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                        <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,1,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                        <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,0,8.5,12,3.5,3.5,0,0,0,12,15.5Z"/></svg>
                    </label>
                    
                    {user ? (
                        <div className="flex items-center gap-2">
                            <div className="tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                                <div className="avatar">
                                    <div className="w-10 rounded-full cursor-pointer ring-2 ring-sky-500 ring-offset-base-100 ring-offset-2">
                                        <img 
                                            alt="User" 
                                            src={user.photoURL || "https://i.ibb.co/37hjkY0/user.png"} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={handleLogOut}
                                className="btn bg-sky-600 hover:bg-sky-700 sm:btn-sm md:btn-md text-white border-none"
                            >
                                LogOut
                            </button>
                        </div>
                    ) : (
                        <div className='flex gap-2'>
                             <Link to="/login" className="btn bg-sky-600 hover:bg-sky-700 btn-xs sm:btn-sm md:btn-md text-white border-none">Login</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;