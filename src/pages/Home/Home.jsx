import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    FaCheckCircle, FaUsers, FaBoxOpen, FaArrowRight, 
    FaChartLine, FaShieldAlt, FaHeadset, FaMobileAlt, 
    FaSync, FaFileContract, FaQuoteLeft 
} from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import toast from 'react-hot-toast';
import HrHome from './HrHome';
import EmployeeHome from './EmployeeHome';
import { motion } from "framer-motion";

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

    // Features Data
    const features = [
        { icon: <FaChartLine/>, title: "Analytics Dashboard", desc: "Get detailed insights on asset usage and depreciation." },
        { icon: <FaShieldAlt/>, title: "Secure Data", desc: "Enterprise-grade security to protect your company assets data." },
        { icon: <FaHeadset/>, title: "24/7 Support", desc: "Our team is always here to help you with any issues." },
        { icon: <FaMobileAlt/>, title: "Mobile Friendly", desc: "Access your dashboard from anywhere, anytime." },
        { icon: <FaSync/>, title: "Auto Sync", desc: "Real-time synchronization across all devices." },
        { icon: <FaFileContract/>, title: "Digital Logs", desc: "Keep track of every request and approval history." },
    ];

    return (
        <div className='overflow-x-hidden'>
            
            {/* Banner Section */}
            <div className="hero min-h-[600px] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse px-4 lg:px-12">
                    <motion.img 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        src="https://i.ibb.co/hK9dgnB/asset-management.png" 
                        className="max-w-xs lg:max-w-lg rounded-lg shadow-2xl" 
                        alt="Asset Management" 
                    />
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl font-bold text-sky-700 leading-tight">
                            Manage Your Assets <br/> Like a Pro
                        </h1>
                        <p className="py-6 text-gray-600 max-w-lg text-lg">
                            AssetVerse helps companies track their assets, manage employee requests, and streamline the entire workflow.
                        </p>
                        
                        {!user ? (
                            <div className='flex gap-4'>
                                <Link to="/join-hr" className="btn bg-sky-600 text-white border-none hover:bg-sky-700">Join as HR Manager</Link>
                                <Link to="/join-employee" className="btn btn-outline btn-info hover:text-white">Join as Employee</Link>
                            </div>
                        ) : (
                            <Link to="/profile" className="btn bg-sky-600 text-white border-none gap-2">Go to Profile <FaArrowRight /></Link>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* About Section */}
            <div className="py-20 bg-white px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">About <span className='text-sky-600'>AssetVerse</span></h2>
                    <p className="text-gray-500 mt-3">Why choose us for your corporate asset management?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {[{icon: <FaBoxOpen/>, title:"Real-time Tracking", color:"text-sky-600", bg:"bg-sky-100"},
                      {icon: <FaUsers/>, title:"Employee Management", color:"text-purple-600", bg:"bg-purple-100"},
                      {icon: <FaCheckCircle/>, title:"Easy Approval", color:"text-green-600", bg:"bg-green-100"}
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="text-center p-8 border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-base-100"
                        >
                            <div className={`${item.bg} w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6`}>
                                <span className={`text-4xl ${item.color}`}>{item.icon}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-700">{item.title}</h3>
                            <p className="text-gray-600">Efficiently manage your company resources with our advanced tools.</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/*  Features Showcase */}
            <div className="py-20 bg-slate-50 px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">Powerful <span className='text-sky-600'>Features</span></h2>
                    <p className="text-gray-500 mt-3">Everything you need to manage assets effectively.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="card bg-white shadow-xl border-l-4 border-sky-500"
                        >
                            <div className="card-body">
                                <span className="text-4xl text-sky-600 mb-2">{feature.icon}</span>
                                <h3 className="card-title text-gray-700">{feature.title}</h3>
                                <p className="text-gray-500">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/*  Package Section */}
            <div className="py-20 bg-base-200 px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-700">Our Packages</h2>
                    <p className="text-gray-500 mt-3">Affordable plans for everyone.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Basic */}
                    <motion.div initial={{ scale: 0.9, opacity:0 }} whileInView={{ scale: 1, opacity:1 }} viewport={{once:true}} className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <h2 className="text-2xl font-bold text-sky-600">Basic</h2>
                            <p className="text-5xl font-bold my-6">$5</p>
                            <p className="text-gray-500">5 Employees</p>
                            <button onClick={() => handleBuyPackage(5, 5)} className="btn bg-sky-600 text-white w-full mt-4">Get Started</button>
                        </div>
                    </motion.div>
                    {/* Standard */}
                    <motion.div initial={{ scale: 0.9, opacity:0 }} whileInView={{ scale: 1, opacity:1 }} viewport={{once:true}} className="card bg-base-100 shadow-xl border-4 border-purple-500 relative transform scale-105">
                        <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">POPULAR</div>
                        <div className="card-body text-center">
                            <h2 className="text-2xl font-bold text-purple-600">Standard</h2>
                            <p className="text-5xl font-bold my-6">$8</p>
                            <p className="text-gray-500">10 Employees</p>
                            <button onClick={() => handleBuyPackage(8, 10)} className="btn bg-purple-600 text-white w-full mt-4">Get Started</button>
                        </div>
                    </motion.div>
                    {/* Premium */}
                    <motion.div initial={{ scale: 0.9, opacity:0 }} whileInView={{ scale: 1, opacity:1 }} viewport={{once:true}} className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <h2 className="text-2xl font-bold text-orange-600">Premium</h2>
                            <p className="text-5xl font-bold my-6">$15</p>
                            <p className="text-gray-500">20 Employees</p>
                            <button onClick={() => handleBuyPackage(15, 20)} className="btn bg-orange-600 text-white w-full mt-4">Get Started</button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-20 bg-white px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">How It <span className='text-sky-600'>Works</span></h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-6xl mx-auto">
                    {[{step:"01", title:"Sign Up", desc:"Create an account as HR or Employee."},
                      {step:"02", title:"Request/Add", desc:"Employees request assets, HRs add inventory."},
                      {step:"03", title:"Track & Manage", desc:"Approve requests and track asset status."}
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ x: idx % 2 === 0 ? -50 : 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center p-6"
                        >
                            <div className="text-6xl font-black text-gray-200 mb-4">{item.step}</div>
                            <h3 className="text-2xl font-bold text-gray-700">{item.title}</h3>
                            <p className="text-gray-500 mt-2">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/*  Stats & Testimonials  */}
            <div className="bg-sky-700 py-16 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16 border-b border-sky-500 pb-10">
                        <div><div className="text-4xl font-bold">500+</div><div className="text-sky-200">Companies</div></div>
                        <div><div className="text-4xl font-bold">12k+</div><div className="text-sky-200">Users</div></div>
                        <div><div className="text-4xl font-bold">50k+</div><div className="text-sky-200">Assets Tracked</div></div>
                        <div><div className="text-4xl font-bold">99%</div><div className="text-sky-200">Satisfaction</div></div>
                    </div>
                    
                    {/* Testimonials */}
                    <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[{name:"John Doe", role:"HR Manager, TechSoft", quote:"AssetVerse transformed how we handle our inventory. Highly recommended!"},
                          {name:"Sarah Smith", role:"Admin, GreenCorp", quote:"The interface is so intuitive. Even our non-tech staff loves it."},
                          {name:"Mike Johnson", role:"CEO, StartUp Inc", quote:"Best investment for our growing team. Support is fantastic."}
                        ].map((t, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-sky-800 p-6 rounded-xl border border-sky-600"
                            >
                                <FaQuoteLeft className="text-4xl text-sky-400 opacity-50 mb-4"/>
                                <p className="italic text-sky-100 mb-4">"{t.quote}"</p>
                                <div className="font-bold">{t.name}</div>
                                <div className="text-sm text-sky-300">{t.role}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/*  FAQ Section  */}
            <div className="py-20 bg-base-100 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
                    <div className="join join-vertical w-full">
                        <div className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" defaultChecked /> 
                            <div className="collapse-title text-xl font-medium">Can I upgrade my package later?</div>
                            <div className="collapse-content"><p>Yes, you can upgrade your package at any time from your profile settings.</p></div>
                        </div>
                        <div className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" /> 
                            <div className="collapse-title text-xl font-medium">Is my data secure?</div>
                            <div className="collapse-content"><p>Absolutely. We use industry-standard encryption to protect your data.</p></div>
                        </div>
                        <div className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" /> 
                            <div className="collapse-title text-xl font-medium">Do you offer a free trial?</div>
                            <div className="collapse-content"><p>Currently, we offer affordable starting packages instead of a free trial.</p></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gray-900 py-16 px-4 text-center">
                <h2 className="text-3xl text-white font-bold mb-4">Ready to streamline your asset management?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join hundreds of companies that trust AssetVerse for their inventory needs. Get started today!</p>
                <div className='flex justify-center gap-4'>
                   {!user && <Link to="/join-hr" className="btn btn-primary px-8">Join Now</Link>}
                   <button className="btn btn-outline btn-accent">Contact Sales</button>
                </div>
            </div>

        </div>
    );
};

export default Home;