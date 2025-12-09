import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserTie } from "react-icons/fa";
import Swal from 'sweetalert2'; 
import toast from 'react-hot-toast'; 

const MyEmployeeList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['my-employees', user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-employees?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
    });

    
    const employees = data?.result || [];
    const count = data?.count || 0;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    // Remove employee
    const handleRemove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This employee will be removed from your team.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    
                    const res = await axiosSecure.patch(`/users/remove/${id}`, { hrEmail: user.email });
                    
                    if (res.data.modifiedCount > 0) {
                        toast.success("Employee removed successfully");
                        refetch(); 
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to remove employee");
                }
            }
        });
    };

    // Pagination habdle
    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        if (currentPage < numberOfPages - 1) setCurrentPage(currentPage + 1);
    }

    if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-8">My Employee List</h2>
            
            <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg mb-8">
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
                                    <th>{(currentPage * itemsPerPage) + index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={emp.photoURL || "https://i.ibb.co/37hjkY0/user.png"} />
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
                                        <button 
                                            onClick={() => handleRemove(emp._id)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            Remove
                                        </button>
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

            {/* Pagination ctrl */}
            {count > 0 && (
                <div className='flex justify-center items-center gap-2 mt-8 mb-12'>
                    <button onClick={handlePrevPage} className="btn btn-sm btn-outline" disabled={currentPage === 0}>Prev</button>
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm ${currentPage === page ? 'bg-sky-600 text-white' : 'btn-outline'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button onClick={handleNextPage} className="btn btn-sm btn-outline" disabled={currentPage === numberOfPages - 1}>Next</button>
                    
                    <select value={itemsPerPage} onChange={(e) => {
                        setItemsPerPage(parseInt(e.target.value));
                        setCurrentPage(0);
                    }} className="select select-bordered select-sm ml-4">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default MyEmployeeList;