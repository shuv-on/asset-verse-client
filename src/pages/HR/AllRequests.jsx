import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['requests', user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        },
        placeholderData: (previousData) => previousData,
    });

    const requests = data?.result || [];
    const count = data?.count || 0;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    
    const handleStatus = async (id, status, req) => {
            try {
                const updateInfo = { 
                    status, 
                    assetId: req.assetId,
                    requesterEmail: req.requesterEmail, 
                    hrEmail: user.email 
                };
    
                const { data } = await axiosSecure.patch(`/requests/${id}`, updateInfo);
              
                if (data.message === 'limit_reached') {
                    Swal.fire({
                        title: "Package Limit Reached!",
                        text: "You have reached your 5 employees limit. Please upgrade your package to approve more requests.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Upgrade Now"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/subscription'); 
                        }
                    });
                    return; 
                }
    
               
                if (data.modifiedCount > 0) {
                    toast.success(`Request ${status} successfully!`);
                    refetch();
                }

            } catch (error) {
                console.error(error);
                toast.error('Action failed');
            }
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
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-8">All Requests</h2>

            <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg mb-8">
                <table className="table w-full">
                  
                    <thead className="bg-sky-100 text-sky-800 text-lg">
                        <tr>
                            <th>#</th>
                            <th>Asset Name</th>
                            <th>Requester Name</th>
                            <th>Email</th>
                            <th>Req. Date</th>
                            <th>Note</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((req, index) => (
                                <tr key={req._id} className="hover">
                                    <th>{(currentPage * itemsPerPage) + index + 1}</th>
                                    <td className="font-bold">{req.productName}</td>
                                    <td>{req.requesterName}</td>
                                    <td className="text-sm">{req.requesterEmail}</td>
                                    <td>{req.requestDate}</td>
                                    <td className="max-w-xs truncate" title={req.requestNote}>{req.requestNote || "N/A"}</td>
                                    <td>
                                        <div className={`badge ${
                                            req.status === 'approved' ? 'badge-success text-white' : 
                                            req.status === 'rejected' ? 'badge-error text-white' : 
                                            'badge-warning'
                                        } badge-lg`}>
                                            {req.status}
                                        </div>
                                    </td>
                                    <td className="flex gap-2">
                                       
                                        {req.status === 'pending' && (
                                            <>
                                                <button 
                                                    onClick={() => handleStatus(req._id, 'approved', req)}
                                                    className="btn btn-sm btn-success text-white"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleStatus(req._id, 'rejected', req)}
                                                    className="btn btn-sm btn-error text-white"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-gray-500">No requests found.</td>
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
                    </select>
                </div>
            )}
        </div>
    );
};

export default AllRequests;