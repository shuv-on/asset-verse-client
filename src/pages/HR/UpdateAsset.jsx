import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FaBoxOpen, FaClipboardList, FaHashtag, FaArrowLeft } from "react-icons/fa";

const UpdateAsset = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    const [asset, setAsset] = useState({});
    const [loading, setLoading] = useState(true); 

    
    useEffect(() => {
        axiosSecure.get(`/assets/${id}`)
            .then(res => {
                setAsset(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, axiosSecure]);

    const handleUpdateAsset = async (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const productType = form.productType.value;
        const productQuantity = parseInt(form.productQuantity.value);

        const assetInfo = {
            productName,
            productType,
            productQuantity
        };

        try {
            const { data } = await axiosSecure.patch(`/assets/${id}`, assetInfo);
            if (data.modifiedCount > 0) {
                toast.success('Asset Updated Successfully!');
                navigate('/asset-list');
            } else {
                toast.error('No changes made');
            }
        } catch (error) {
            console.error(error);
            toast.error('Update Failed');
        }
    };

    //loading 
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-sky-600"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-gray-100">

                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-sky-600">
                        Update Asset
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Edit the details for <span className="font-bold text-sky-600">{asset.productName}</span>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleUpdateAsset}>
                    <div className="rounded-md shadow-sm space-y-4">
                        
                        {/* Product name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold flex items-center gap-2 text-gray-700">
                                    <FaBoxOpen className="text-sky-600"/> Product Name
                                </span>
                            </label>
                            <input 
                                type="text" 
                                name="productName" 
                                defaultValue={asset.productName} 
                                className="input input-bordered w-full focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all" 
                                required 
                            />
                        </div>

                        {/* Product type */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold flex items-center gap-2 text-gray-700">
                                    <FaClipboardList className="text-sky-600"/> Product Type
                                </span>
                            </label>
                            <select 
                                name="productType" 
                                className="select select-bordered w-full focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all" 
                                value={asset.productType} 
                                onChange={(e) => setAsset({...asset, productType: e.target.value})}
                                required
                            >
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                        </div>

                        {/* Product quantity */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold flex items-center gap-2 text-gray-700">
                                    <FaHashtag className="text-sky-600"/> Product Quantity
                                </span>
                            </label>
                            <input 
                                type="number" 
                                name="productQuantity" 
                                defaultValue={asset.productQuantity} 
                                className="input input-bordered w-full focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all" 
                                required 
                                min="1" 
                            />
                        </div>
                    </div>

                    {/* btns */}
                    <div className="flex flex-col gap-3 pt-4">
                        <button 
                            type="submit" 
                            className="btn w-full bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white font-bold border-none shadow-md transform active:scale-95 transition-transform"
                        >
                            Update Information
                        </button>
                        
                        {/* go back btn */}
                        <button 
                            type="button"
                            onClick={() => navigate('/asset-list')}
                            className="btn w-full btn-ghost text-gray-500 hover:text-gray-700 font-medium flex items-center gap-2"
                        >
                            <FaArrowLeft /> Cancel & Go Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAsset;