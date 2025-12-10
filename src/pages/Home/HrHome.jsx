import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaExclamationCircle, FaHourglassHalf, FaArrowRight, FaChartPie, FaChartBar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const HrHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const { data: pendingRequests = [] } = useQuery({
        queryKey: ['hr-pending', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/hr-pending-requests?email=${user.email}`);
            return res.data;
        }
    });


    const { data: limitedStock = [] } = useQuery({
        queryKey: ['hr-limited', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/hr-limited-stock?email=${user.email}`);
            return res.data;
        }
    });


    const { data: pieData = [] } = useQuery({
        queryKey: ['hr-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/hr-stats?email=${user.email}`);
            return res.data;
        }
    });


    const { data: barData = [] } = useQuery({
        queryKey: ['hr-top-requests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/hr-top-requests?email=${user.email}`);
            return res.data;
        }
    });

    const PIE_COLORS = ['#0088FE', '#FF8042'];

    return (
        <div className="py-10 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Welcome back, <span className="text-sky-600">{user?.displayName}</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
             
                <div className="card bg-base-100 shadow-xl border-t-4 border-sky-500">
                    <div className="card-body items-center">
                        <h2 className="card-title text-sky-700 mb-4">
                            <FaChartPie /> Asset Type Distribution
                        </h2>
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

             
                <div className="card bg-base-100 shadow-xl border-t-4 border-purple-500">
                    <div className="card-body items-center">
                        <h2 className="card-title text-purple-700 mb-4">
                            <FaChartBar /> Top Most Requested Items
                        </h2>
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={barData}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#8884d8" name="Request Count" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

       
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                
                <div className="card bg-base-100 shadow-xl border-t-4 border-orange-500">
                    <div className="card-body">
                        <h2 className="card-title text-orange-600 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaHourglassHalf /> Pending Requests
                            </div>
                            <button onClick={() => navigate('/all-requests')} className="btn btn-xs btn-ghost text-sky-600">
                                View All <FaArrowRight />
                            </button>
                        </h2>
                        <div className="overflow-x-auto mt-4">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>Requester</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingRequests.length > 0 ? (
                                        pendingRequests.map(req => (
                                            <tr key={req._id}>
                                                <td className="font-bold">{req.productName}</td>
                                                <td>{req.requesterEmail}</td>
                                                <td>{req.requestDate}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="3" className="text-center text-gray-500">No pending requests</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

             
                <div className="card bg-base-100 shadow-xl border-t-4 border-red-500">
                    <div className="card-body">
                        <h2 className="card-title text-red-600 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaExclamationCircle /> Limited Stock (&lt;10)
                            </div>
                            <button onClick={() => navigate('/asset-list')} className="btn btn-xs btn-ghost text-sky-600">
                                View Inventory <FaArrowRight />
                            </button>
                        </h2>
                        <div className="overflow-x-auto mt-4">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Asset Name</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {limitedStock.length > 0 ? (
                                        limitedStock.map(asset => (
                                            <tr key={asset._id}>
                                                <td className="font-bold">{asset.productName}</td>
                                                <td className="text-red-500 font-bold">{asset.productQuantity}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="2" className="text-center text-gray-500">Inventory is healthy</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HrHome;