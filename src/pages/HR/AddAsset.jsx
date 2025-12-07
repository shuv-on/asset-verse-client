import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddAsset = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleAddAsset = async (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const productType = form.productType.value;
        const productQuantity = parseInt(form.productQuantity.value);

        const assetInfo = {
            productName,
            productType,
            productQuantity,
            dateAdded: new Date().toLocaleDateString(), 
            hrEmail: user?.email, 
            hrName: user?.displayName
        };

        try {
           
            const { data } = await axiosSecure.post('/assets', assetInfo);
            
            if (data.insertedId) {
                toast.success('Asset Added Successfully!');
                
                navigate('/asset-list'); 
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add asset');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
                <form onSubmit={handleAddAsset} className="card-body">
                    <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">Add New Asset</h2>
                    
                    {/* Product name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Product Name</span>
                        </label>
                        <input 
                            type="text" 
                            name="productName" 
                            placeholder="e.g. HP 250 G8 Laptop" 
                            className="input input-bordered w-full focus:border-sky-500 focus:ring-2" 
                            required 
                        />
                    </div>

                    {/* Product Type */}
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Product Type</span>
                        </label>
                        <select 
                            name="productType" 
                            className="select select-bordered w-full focus:border-sky-500 focus:ring-2" 
                            required 
                            defaultValue=""
                        >
                            <option value="" disabled>Select Asset Type</option>
                            <option value="Returnable">Returnable (Laptop, Phone, Chair etc.)</option>
                            <option value="Non-returnable">Non-returnable (Pen, Diary, Paper etc.)</option>
                        </select>
                    </div>

                    {/* Product quantity */}
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Product Quantity</span>
                        </label>
                        <input 
                            type="number" 
                            name="productQuantity" 
                            placeholder="e.g. 5" 
                            className="input input-bordered w-full focus:border-sky-500 focus:ring-2" 
                            required 
                            min="1" 
                        />
                    </div>

                    {/* Submit btn*/}
                    <div className="form-control mt-8">
                        <button type="submit" className="btn bg-sky-600 hover:bg-sky-800 text-white text-lg font-bold w-full border-none">
                            Add Asset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAsset;