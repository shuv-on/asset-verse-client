import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaUsers, FaBoxOpen, FaArrowRight } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import toast from 'react-hot-toast';
import HrHome from './HrHome';
import EmployeeHome from './EmployeeHome';

const Home = () => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole();
    const navigate = useNavigate();

    if (loading || (user && isRoleLoading)) {
        return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (user && role === 'hr') {
        return <HrHome />;
    }

    if (user && role === 'employee') {
        return <EmployeeHome />;
    }

    const handleBuyPackage = (price, limit) => {
        if (!user) {
            toast.error("Please login as HR to buy a package.");
            navigate('/login');
            return;
        }

        if (role === 'employee') {
            toast.error("Only HR Managers can purchase packages.");
            return;
        }

        navigate('/payment', { state: { price, limit } });
    };

    return (
        <div>
            {/*Banner Section */}
            <div className="hero min-h-[550px] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse px-4 lg:px-12">
                    <img 
                        src="https://i.ibb.co/hK9dgnB/asset-management.png" 
                        className="max-w-sm lg:max-w-lg rounded-lg shadow-2xl animate-pulse" 
                        alt="Asset Management" 
                    />
                    <div>
                        <h1 className="text-5xl font-bold text-sky-700 leading-tight">
                            Manage Your Assets <br/> Like a Pro
                        </h1>
                        <p className="py-6 text-gray-600 max-w-lg text-lg">
                            AssetVerse helps companies track their assets, manage employee requests, and streamline the entire workflow. Join us to experience seamless asset management.
                        </p>
                        
               
                        {!user ? (
                            <div className='flex gap-4'>
                                <Link to="/join-hr" className="btn bg-sky-600 text-white border-none hover:bg-sky-700">
                                    Join as HR Manager
                                </Link>
                                <Link to="/join-employee" className="btn btn-outline btn-info hover:text-white">
                                    Join as Employee
                                </Link>
                            </div>
                        ) : (
                            <Link to="/profile" className="btn bg-sky-600 text-white border-none gap-2">
                                Go to Profile <FaArrowRight />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="py-20 bg-white px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">About <span className='text-sky-600'>AssetVerse</span></h2>
                    <p className="text-gray-500 mt-3 text-lg">Why choose us for your corporate asset management?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="text-center p-8 border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-base-100">
                        <div className="bg-sky-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
                            <FaBoxOpen className='text-4xl text-sky-600'/>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-700">Real-time Tracking</h3>
                        <p className="text-gray-600">Track all your company assets in real-time. Know exactly who is holding which equipment and when it was assigned.</p>
                    </div>
                    <div className="text-center p-8 border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-base-100">
                        <div className="bg-purple-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
                            <FaUsers className='text-4xl text-purple-600'/>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-700">Employee Management</h3>
                        <p className="text-gray-600">Easily add employees to your team. Employees can request assets directly, making the process smoother.</p>
                    </div>
                    <div className="text-center p-8 border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-base-100">
                        <div className="bg-green-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
                            <FaCheckCircle className='text-4xl text-green-600'/>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-700">Easy Approval</h3>
                        <p className="text-gray-600">One-click approval system for HRs. Manage incoming requests efficiently and keep your inventory updated.</p>
                    </div>
                </div>
            </div>

            {/* Package Section */}
            <div className="py-20 bg-base-200 px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-500">Our Packages</h2>
                    <p className="text-gray-500 mt-3 text-lg">Affordable plans for companies of all sizes.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Basic */}
                    <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform">
                        <div className="card-body text-center">
                            <h2 className="text-2xl font-bold text-sky-600">Basic</h2>
                            <p className="text-5xl font-bold my-6">$5</p>
                            <p className="text-gray-500 font-medium">5 Employees Limit</p>
                            <div className="divider"></div>
                            <ul className="text-left space-y-2 mb-6 ml-8">
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-sky-500"/> Asset Tracking</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-sky-500"/> Email Support</li>
                            </ul>
                            <button 
                                onClick={() => handleBuyPackage(5, 5)} 
                                className="btn bg-sky-600 hover:bg-sky-700 text-white w-full mt-4"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                    {/* Standard */}
                    <div className="card bg-base-100 shadow-xl border-4 border-purple-500 relative transform scale-105">
                        <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">POPULAR</div>
                        <div className="card-body text-center">
                            <h2 className="text-2xl font-bold text-purple-600">Standard</h2>
                            <p className="text-5xl font-bold my-6">$8</p>
                            <p className="text-gray-500 font-medium">10 Employees Limit</p>
                            <div className="divider"></div>
                            <ul className="text-left space-y-2 mb-6 ml-8">
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500"/> Priority Support</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500"/> Advanced Analytics</li>
                            </ul>
                            <button 
                                onClick={() => handleBuyPackage(8, 10)} 
                                className="btn bg-purple-600 hover:bg-purple-700 text-white w-full mt-4"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                    {/* Premium */}
                    <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform">
                        <div className="card-body text-center">
                            <h2 className="text-2xl font-bold text-orange-600">Premium</h2>
                            <p className="text-5xl font-bold my-6">$15</p>
                            <p className="text-gray-500 font-medium">20 Employees Limit</p>
                            <div className="divider"></div>
                            <ul className="text-left space-y-2 mb-6 ml-8">
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500"/> 24/7 Support</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500"/> Dedicated Manager</li>
                            </ul>
                            <button 
                                onClick={() => handleBuyPackage(15, 20)} 
                                className="btn bg-orange-600 hover:bg-orange-700 text-white w-full mt-4"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;