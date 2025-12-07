import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], refetch, isLoading } = useQuery({
        queryKey: ['requests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests?email=${user.email}`);
            return res.data;
        }
    });

    
    const handleStatus = async (id, status, assetId) => {
        try {
            const { data } = await axiosSecure.patch(`/requests/${id}`, { status, assetId });
            if (data.modifiedCount > 0) {
                toast.success(`Request ${status} successfully!`);
                refetch(); 
            }
        } catch (error) {
            console.error(error);
            toast.error('Action failed');
        }
    };

    if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-8">All Requests</h2>

            <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg">
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
                                    <th>{index + 1}</th>
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
                                                    onClick={() => handleStatus(req._id, 'approved', req.assetId)}
                                                    className="btn btn-sm btn-success text-white"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleStatus(req._id, 'rejected', req.assetId)}
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
        </div>
    );
};

export default AllRequests;