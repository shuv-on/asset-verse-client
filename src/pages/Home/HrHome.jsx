import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaExclamationCircle, FaHourglassHalf } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

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

    return (
        <div className="py-10 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-500 mb-8">
                Welcome back, <span className="text-sky-600">{user?.displayName}</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
              
                <div className="card bg-base-100 shadow-xl border-t-4 border-orange-500">
                    <div className="card-body">
                        <h2 className="card-title text-orange-600 flex items-center gap-2">
                            <FaHourglassHalf /> Pending Requests (Top 5)
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
                        <div className="card-actions justify-end mt-4">
                            <button onClick={() => navigate('/all-requests')} className="btn btn-sm btn-outline btn-warning">View All</button>
                        </div>
                    </div>
                </div>

                
                <div className="card bg-base-100 shadow-xl border-t-4 border-red-500">
                    <div className="card-body">
                        <h2 className="card-title text-red-600 flex items-center gap-2">
                            <FaExclamationCircle /> Limited Stock Items (&lt;10)
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
                        <div className="card-actions justify-end mt-4">
                            <button onClick={() => navigate('/asset-list')} className="btn btn-sm btn-outline btn-error">Manage Inventory</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HrHome;