import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'; 
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const AssetList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['assets', user?.email, search, filter, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets?email=${user.email}&search=${search}&filter=${filter}&page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        },
        placeholderData: (previousData) => previousData, 
    });

    const assets = data?.result || [];
    const count = data?.count || 0;
    const numberOfPages = Math.ceil(count / itemsPerPage);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/assets/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Your asset has been deleted.", "success");
                    refetch();
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
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-8">Asset List</h2>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                
                {/* Search box */}
                <div className="form-control w-full md:w-1/3">
                    <input 
                        type="text" 
                        placeholder="Search by Product Name..." 
                        className="input input-bordered w-full"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(0);
                        }}
                    />
                </div>

                {/* Filter menu */}
                <div className="form-control w-full md:w-1/4">
                    <select 
                        className="select select-bordered w-full"
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setCurrentPage(0);
                        }}
                        value={filter}
                    >
                        <option value="">All Types</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                </div>
            </div>

            {/* List table */}
            <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg mb-8">
                <table className="table w-full">
                    <thead className="bg-sky-100 text-sky-800 text-lg">
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date Added</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {assets.length > 0 ? (
                            assets.map((asset, index) => (
                                <tr key={asset._id} className="hover">
                                    <th>{(currentPage * itemsPerPage) + index + 1}</th>
                                    <td className="font-semibold">{asset.productName}</td>
                                    <td>
                                        <div className={`badge ${asset.productType === 'Returnable' ? 'badge-warning' : 'badge-success'} badge-outline`}>
                                            {asset.productType}
                                        </div>
                                    </td>
                                    <td>{asset.productQuantity}</td>
                                    <td>{asset.dateAdded}</td>
                                    <td className="flex gap-2">
                                        <Link to={`/update-asset/${asset._id}`}>
                                            <button className="btn btn-sm btn-info text-white">Update</button>
                                        </Link>
                                        
                                        <button 
                                            onClick={() => handleDelete(asset._id)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    {search ? "No matching assets found." : "No assets added yet."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

       
            {count > 0 && (
                <div className='flex justify-center items-center gap-2 mt-8 mb-12 flex-wrap'>
                    <button onClick={handlePrevPage} className="btn btn-sm btn-outline" disabled={currentPage === 0}>Prev</button>
                   
                    <button 
                        onClick={() => setCurrentPage(0)} 
                        className={`btn btn-sm ${currentPage === 0 ? 'bg-sky-600 text-white' : 'btn-outline'}`}
                    >
                        1
                    </button>

                    {/* Left dots */}
                    {currentPage > 2 && <span className="btn btn-sm btn-disabled bg-transparent border-none text-black">...</span>}

                    {[...Array(numberOfPages).keys()].map(page => {
                        if (page === 0 || page === numberOfPages - 1) return null;
                        
                        // Show current, prev, next
                        if (page >= currentPage - 1 && page <= currentPage + 1) {
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`btn btn-sm ${currentPage === page ? 'bg-sky-600 text-white' : 'btn-outline'}`}
                                >
                                    {page + 1}
                                </button>
                            );
                        }
                        return null;
                    })}

                    {/* Right dots */}
                    {currentPage < numberOfPages - 3 && <span className="btn btn-sm btn-disabled bg-transparent border-none text-black">...</span>}

                    {/* Last page */}
                    {numberOfPages > 1 && (
                        <button 
                            onClick={() => setCurrentPage(numberOfPages - 1)} 
                            className={`btn btn-sm ${currentPage === numberOfPages - 1 ? 'bg-sky-600 text-white' : 'btn-outline'}`}
                        >
                            {numberOfPages}
                        </button>
                    )}

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

export default AssetList;