import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="text-3xl font-bold text-white flex items-center gap-2">
                            <span className="text-sky-500">Asset</span>Verse
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Manage your Asset by using AssetVerse. Track, assign, and manage assets efficiently with our comprehensive solution designed for modern businesses.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 border-l-4 border-sky-500 pl-3">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="hover:text-sky-500 transition-colors duration-300">Home</Link></li>
                            <li><Link to="/join-hr" className="hover:text-sky-500 transition-colors duration-300">Join as HR Manager</Link></li>
                            <li><Link to="/join-employee" className="hover:text-sky-500 transition-colors duration-300">Join as Employee</Link></li>
                            <li><Link to="/login" className="hover:text-sky-500 transition-colors duration-300">Login</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 border-l-4 border-purple-500 pl-3">Resources</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Documentation</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Support Center</a></li>
                        </ul>
                    </div>

                    {/* Social & Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 border-l-4 border-orange-500 pl-3">Connect With Us</h3>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all duration-300">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-400 hover:text-white transition-all duration-300">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-300">
                                <FaLinkedinIn />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300">
                                <FaInstagram />
                            </a>
                        </div>
                        <p className="text-sm text-gray-400">Email: support@assetverse.com</p>
                        <p className="text-sm text-gray-400">Phone: +880 1234 567 890</p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} AssetVerse. All rights reserved. | Developed by AssetVerse team.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;