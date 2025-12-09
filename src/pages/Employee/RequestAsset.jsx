import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const RequestAsset = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data, isLoading } = useQuery({
        queryKey: ['assets-available', search, filter, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets-available?search=${search}&filter=${filter}&page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        },
        placeholderData: (previousData) => previousData,
    });

    const assets = data?.result || [];
    const count = data?.count || 0;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handleRequest = async (asset) => {
        const requestInfo = {
            assetId: asset._id,
            productName: asset.productName,
            productType: asset.productType,
            hrEmail: asset.hrEmail, 
            hrName: asset.hrName,
            requesterName: user.displayName,
            requesterEmail: user.email,
            requestDate: new Date().toISOString().split('T')[0],
            status: 'pending', 
            note: "I need this asset for my daily tasks."
        };

        try {
            const { data } = await axiosSecure.post('/requests', requestInfo);
            if (data.insertedId) {
                toast.success('Request Sent Successfully!');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to send request');
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
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-8">Request an Asset</h2>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <input 
                    type="text" 
                    placeholder="Search asset..." 
                    className="input input-bordered w-full md:w-1/3"
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(0);
                    }}
                />
                <select 
                    className="select select-bordered w-full md:w-1/4"
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setCurrentPage(0);
                    }}
                >
                    <option value="">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>
            </div>

            {/* Assets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.length > 0 ? (
                    assets.map(asset => (
                        <div key={asset._id} className="card bg-base-100 shadow-xl border border-gray-100">
                            <div className="card-body">
                                <h2 className="card-title text-sky-700">{asset.productName}</h2>
                                <p className="text-gray-600">Type: <span className="font-semibold">{asset.productType}</span></p>
                                <p className="text-gray-600">Availability: <span className="font-bold text-green-600">{asset.productQuantity}</span> in stock</p>
                                <div className="card-actions justify-end mt-4">
                                    <button 
                                        onClick={() => handleRequest(asset)}
                                        className="btn bg-sky-600 hover:bg-sky-700 text-white w-full"
                                    >
                                        Request Asset
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3 text-gray-500">No assets available to request.</p>
                )}
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

export default RequestAsset;