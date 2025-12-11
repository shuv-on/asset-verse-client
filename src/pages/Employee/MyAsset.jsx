import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaFilePdf, FaUndo } from "react-icons/fa"; 
import toast from 'react-hot-toast';

const MyAssets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['my-requests', user?.email, search, filter, currentPage, itemsPerPage],
        queryFn: async () => {
          
            const res = await axiosSecure.get(`/my-requested-assets?email=${user.email}&search=${search}&filter=${filter}&page=${currentPage}&size=${itemsPerPage}&sort=dsc`);
            return res.data;
        },
        placeholderData: (previousData) => previousData,
    });

    const myRequests = data?.result || [];
    const count = data?.count || 0;
    const numberOfPages = Math.ceil(count / itemsPerPage);
   


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


    const handleReturn = (id, assetId) => {
        Swal.fire({
            title: "Return Asset?",
            text: "Once returned, you cannot undo this action. Stock will be increased.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Return it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
               
                    const res = await axiosSecure.patch(`/requests/${id}`, { 
                        status: 'returned',
                        assetId: assetId 
                    });
                    if (res.data.modifiedCount > 0) {
                        toast.success("Asset returned successfully!");
                        refetch();
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to return asset");
                }
            }
        });
    };

   
    const handlePrint = () => {
        window.print(); 
    };

    const handlePrevPage = () => { if (currentPage > 0) setCurrentPage(currentPage - 1); }
    const handleNextPage = () => { if (currentPage < numberOfPages - 1) setCurrentPage(currentPage + 1); }

    if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-8">My Assets & Requests</h2>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <input 
                    type="text" 
                    placeholder="Search by asset name..." 
                    className="input input-bordered w-full md:w-1/3"
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
                />
                <select 
                    className="select select-bordered w-full md:w-1/4"
                    onChange={(e) => { setFilter(e.target.value); setCurrentPage(0); }}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="returned">Returned</option>
                </select>
            </div>

            {/* Table */}
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
                        {myRequests.length > 0 ? (
                            myRequests.map((req, index) => (
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
                                    <td className="flex gap-2">
                                        {/* Cancel btn */}
                                        {req.status === 'pending' && (
                                            <button 
                                                onClick={() => handleCancel(req._id)}
                                                className="btn btn-sm btn-error text-white flex items-center gap-1"
                                            >
                                                <FaTrashAlt /> Cancel
                                            </button>
                                        )}
                                       
                                        {/* Print btn */}
                                        {req.status === 'approved' && (
                                            <button onClick={handlePrint} className="btn btn-sm btn-ghost text-sky-600" title="Print Details">
                                                <FaFilePdf /> Print
                                            </button>
                                        )}

                                        {/* Return btn */}
                                        {req.status === 'approved' && req.productType === 'Returnable' && (
                                            <button 
                                                onClick={() => handleReturn(req._id, req.assetId)}
                                                className="btn btn-sm btn-warning text-white flex items-center gap-1"
                                                title="Return Asset"
                                            >
                                                <FaUndo /> Return
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

            {/* Pagination Ctrl */}
            {count > 0 && (
                <div className='flex justify-center items-center gap-2 mt-8 mb-12 flex-wrap'>
                    <button onClick={handlePrevPage} className="btn btn-sm btn-outline" disabled={currentPage === 0}>Prev</button>
                    <button onClick={() => setCurrentPage(0)} className={`btn btn-sm ${currentPage === 0 ? 'bg-sky-600 text-white' : 'btn-outline'}`}>1</button>
                    {currentPage > 2 && <span className="btn btn-sm btn-disabled bg-transparent border-none text-black">...</span>}
                    {[...Array(numberOfPages).keys()].map(page => {
                        if (page === 0 || page === numberOfPages - 1) return null; 
                        if (page >= currentPage - 1 && page <= currentPage + 1) {
                            return (
                                <button key={page} onClick={() => setCurrentPage(page)} className={`btn btn-sm ${currentPage === page ? 'bg-sky-600 text-white' : 'btn-outline'}`}>
                                    {page + 1}
                                </button>
                            );
                        }
                        return null;
                    })}
                    {currentPage < numberOfPages - 3 && <span className="btn btn-sm btn-disabled bg-transparent border-none text-black">...</span>}
                    {numberOfPages > 1 && (
                        <button onClick={() => setCurrentPage(numberOfPages - 1)} className={`btn btn-sm ${currentPage === numberOfPages - 1 ? 'bg-sky-600 text-white' : 'btn-outline'}`}>
                            {numberOfPages}
                        </button>
                    )}
                    <button onClick={handleNextPage} className="btn btn-sm btn-outline" disabled={currentPage === numberOfPages - 1}>Next</button>
                    <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(0); }} className="select select-bordered select-sm ml-4">
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