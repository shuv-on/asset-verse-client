import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaDollarSign } from "react-icons/fa";

const Subscription = () => {

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-sky-700 mb-4">Upgrade Your Plan</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Increase your employee limit.Plz choose the package that suits your company size.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                
                {/* subcription card */}
                <div className="card bg-base-100 shadow-2xl hover:scale-105 transition-transform border-t-4 border-sky-500">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-2xl font-bold text-gray-700">5 Members</h2>
                        <div className="my-4 text-sky-600">
                            <span className="text-4xl font-bold">$5</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <FaUserFriends className="text-6xl text-sky-200 mb-4"/>
                        <ul className="text-gray-600 mb-8 space-y-2">
                            <li>Add up to 5 Employees</li>
                            <li>Basic Support</li>
                            <li>Asset Tracking</li>
                        </ul>
                        <div className="card-actions">
                            <Link to="/payment" state={{ price: 5, limit: 5 }} className="btn bg-sky-600 hover:bg-sky-700 text-white w-full px-10">
                                Buy Now
                            </Link>
                        </div>
                    </div>
                </div>

               
                <div className="card bg-base-100 shadow-2xl hover:scale-105 transition-transform border-t-4 border-purple-500 relative overflow-hidden">
                   
                     <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">POPULAR</div>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-2xl font-bold text-gray-700">10 Members</h2>
                        <div className="my-4 text-purple-600">
                            <span className="text-4xl font-bold">$8</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <FaUserFriends className="text-6xl text-purple-200 mb-4"/>
                        <ul className="text-gray-600 mb-8 space-y-2">
                            <li>Add up to 10 Employees</li>
                            <li>Priority Support</li>
                            <li>Advanced Tracking</li>
                        </ul>
                        <div className="card-actions">
                            <Link to="/payment" state={{ price: 8, limit: 10 }} className="btn bg-purple-600 hover:bg-purple-700 text-white w-full px-10">
                                Buy Now
                            </Link>
                        </div>
                    </div>
                </div>

                
                <div className="card bg-base-100 shadow-2xl hover:scale-105 transition-transform border-t-4 border-orange-500">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-2xl font-bold text-gray-700">20 Members</h2>
                        <div className="my-4 text-orange-600">
                            <span className="text-4xl font-bold">$15</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <FaUserFriends className="text-6xl text-orange-200 mb-4"/>
                        <ul className="text-gray-600 mb-8 space-y-2">
                            <li>Add up to 20 Employees</li>
                            <li>24/7 Support</li>
                            <li>Full Access</li>
                        </ul>
                        <div className="card-actions">
                            <Link to="/payment" state={{ price: 15, limit: 20 }} className="btn bg-orange-600 hover:bg-orange-700 text-white w-full px-10">
                                Buy Now
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Subscription;