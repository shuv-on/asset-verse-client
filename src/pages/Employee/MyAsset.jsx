import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaFilePdf } from "react-icons/fa"; 

const MyAssets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['my-requests', user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-requested-assets?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
    });

    const myRequests = data?.result || [];
    const count = data?.count || 0;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

   
    const filteredRequests = myRequests.filter(req => {
        const matchesSearch = req.productName.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter ? req.status === filter : true;
        return matchesSearch && matchesFilter;
    });

   
    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/requests/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Cancelled!", "Request has been cancelled.", "success");
                        refetch();
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-8">My Assets & Requests</h2>

           
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <input 
                    type="text" 
                    placeholder="Search by asset name..." 
                    className="input input-bordered w-full md:w-1/3"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select 
                    className="select select-bordered w-full md:w-1/4"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="returned">Returned</option>
                </select>
            </div>

           
            <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg">
                <table className="table w-full">
                    <thead className="bg-sky-100 text-sky-800 text-lg">
                        <tr>
                            <th>#</th>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((req, index) => (
                                <tr key={req._id} className="hover">
                                    <th>{(currentPage * itemsPerPage) + index + 1}</th>
                                    <td className="font-semibold">{req.productName}</td>
                                    <td>{req.productType}</td>
                                    <td>{req.requestDate}</td>
                                    <td>
                                        <div className={`badge ${
                                            req.status === 'approved' ? 'badge-success text-white' : 
                                            req.status === 'rejected' ? 'badge-error text-white' : 
                                            req.status === 'returned' ? 'badge-info text-white' :
                                            'badge-warning'
                                        }`}>
                                            {req.status}
                                        </div>
                                    </td>
                                    <td>
                                        
                                        {req.status === 'pending' && (
                                            <button 
                                                onClick={() => handleCancel(req._id)}
                                                className="btn btn-sm btn-error text-white flex items-center gap-1"
                                            >
                                                <FaTrashAlt /> Cancel
                                            </button>
                                        )}
                                       
                                        {req.status === 'approved' && (
                                            <button className="btn btn-sm btn-ghost text-sky-600" title="Print Details">
                                                <FaFilePdf /> Print
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">No requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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
                        <option value="50">50</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default MyAssets;