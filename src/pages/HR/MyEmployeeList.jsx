import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserTie } from "react-icons/fa";

const MyEmployeeList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: employees = [], isLoading } = useQuery({
        queryKey: ['my-employees', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-employees?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-8">My Employee List</h2>
            
            <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg">
                <table className="table w-full">
                    <thead className="bg-sky-100 text-sky-800 text-lg">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((emp, index) => (
                                <tr key={emp._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={emp.photoURL || "https://i.ibb.co/37hjkY0/user.png"} alt="User" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold">{emp.name}</td>
                                    <td>
                                        <span className="badge badge-ghost gap-2">
                                            <FaUserTie className="text-sky-600"/> Employee
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-error text-white">Remove</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No employees found in your team yet. <br/>
                                    <span className="text-sm">Approve a request to add them automatically.</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEmployeeList;