import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const EmployeeHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: pendingRequests = [] } = useQuery({
        queryKey: ['emp-pending', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/employee-pending-requests?email=${user.email}`);
            return res.data;
        }
    });

    const { data: monthlyRequests = [] } = useQuery({
        queryKey: ['emp-monthly', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/employee-monthly-requests?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="py-10 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-500 mb-8">
                Hello, <span className="text-sky-600">{user?.displayName}</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Employye Pending rqst */}
                <div className="card bg-base-100 shadow-xl border-t-4 border-yellow-500">
                    <div className="card-body">
                        <h2 className="card-title text-yellow-600 flex items-center gap-2">
                            <FaClock /> My Pending Requests
                        </h2>
                        <div className="overflow-x-auto mt-4">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingRequests.length > 0 ? (
                                        pendingRequests.map(req => (
                                            <tr key={req._id}>
                                                <td className="font-bold">{req.productName}</td>
                                                <td>{req.productType}</td>
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

                {/* Employee Monthly rqst */}
                <div className="card bg-base-100 shadow-xl border-t-4 border-purple-500">
                    <div className="card-body">
                        <h2 className="card-title text-purple-600 flex items-center gap-2">
                            <FaCalendarAlt /> Requests This Month
                        </h2>
                        <div className="overflow-x-auto mt-4">
                             <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthlyRequests.length > 0 ? (
                                        monthlyRequests.map(req => (
                                            <tr key={req._id}>
                                                <td className="font-bold">{req.productName}</td>
                                                <td><span className="badge badge-sm">{req.status}</span></td>
                                                <td>{req.requestDate}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="3" className="text-center text-gray-500">No requests this month</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-actions justify-end mt-4">
                            <button onClick={() => navigate('/my-assets')} className="btn btn-sm btn-outline btn-info">View All History</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeHome;