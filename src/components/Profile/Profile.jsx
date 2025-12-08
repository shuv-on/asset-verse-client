import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaCamera, FaIdBadge, FaBirthdayCake, FaBuilding } from "react-icons/fa";

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: dbUser = {}, refetch, isLoading } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;

        const updateDoc = {
            name: name,
            photoURL: photo,
        };

        if (dbUser.role === 'employee' && form.dob) {
            updateDoc.dateOfBirth = form.dob.value;
        }

        try {
            await updateUserProfile(name, photo);
            const { data } = await axiosSecure.put(`/users/${user?.email}`, updateDoc);
            
            if (data.modifiedCount > 0) {
                toast.success("Profile Updated Successfully!");
                refetch();
            } else {
                toast.success("Profile Updated!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-sky-600"></span>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">
            
            <div className="max-w-3xl mx-auto bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Top covr */}
                <div className="h-40 bg-gradient-to-r from-sky-500 to-indigo-600 relative">
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="avatar">
                            <div className="w-32 h-32 rounded-full ring ring-white ring-offset-2 shadow-lg">
                                <img src={dbUser.photoURL || user?.photoURL || "https://i.ibb.co/37hjkY0/user.png"} alt="Profile" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* User info */}
                <div className="pt-20 pb-8 text-center px-6">
                    <h1 className="text-3xl font-bold text-sky-600">{dbUser.name}</h1>
                    <p className="text-gray-500 font-medium mt-1 flex justify-center items-center gap-2">
                        <FaEnvelope className="text-sky-600"/> {dbUser.email}
                    </p>
                    
                    <div className="mt-4">
                        <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide ${
                            dbUser.role === 'hr' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                        }`}>
                            {dbUser.role === 'hr' ? 'HR Manager' : 'Employee'}
                        </span>
                    </div>
                </div>

                <div className="border-t border-gray-100"></div>

           
                <div className="p-10 bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-700 mb-6 border-l-4 border-sky-600 pl-3">
                        Update Information
                    </h3>

                    <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 gap-6">
                        
                
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-gray-500 flex items-center gap-2">
                                    <FaUser className="text-sky-500"/> Full Name
                                </span>
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                defaultValue={dbUser.name} 
                                className="input input-bordered w-full focus:ring-2 text-gray-600 focus:ring-sky-500 focus:border-sky-500 transition-all bg-gray-200" 
                                required
                            />
                        </div>

            
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-gray-500 flex items-center gap-2">
                                    <FaCamera className="text-sky-500"/> {dbUser.role === 'hr' ? 'Company Logo URL' : 'Profile Picture URL'}
                                </span>
                            </label>
                            <input 
                                type="url" 
                                name="photo" 
                                defaultValue={dbUser.photoURL || dbUser.companyLogo} 
                                className="input input-bordered w-full focus:ring-2 text-gray-600 focus:ring-sky-500 focus:border-sky-500 transition-all bg-gray-200" 
                                placeholder="https://example.com/photo.jpg"
                                required
                            />
                        </div>

                        {dbUser.role === 'employee' && (
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-500 flex items-center gap-2">
                                        <FaBirthdayCake className="text-sky-500"/> Date of Birth
                                    </span>
                                </label>
                                <input 
                                    type="date" 
                                    name="dob" 
                                    defaultValue={dbUser.dateOfBirth} 
                                    className="input input-bordered w-full focus:ring-2 text-gray-600 focus:ring-sky-500 focus:border-sky-500 transition-all bg-gray-200" 
                                />
                            </div>
                        )}

                        {dbUser.role === 'hr' && (
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-500 flex items-center gap-2">
                                        <FaBuilding className="text-sky-500"/> Company Name
                                    </span>
                                </label>
                                <input 
                                    type="text" 
                                    value={dbUser.companyName || "N/A"} 
                                    className="input input-bordered w-full bg-gray-200 text-gray-500 cursor-not-allowed" 
                                    readOnly 
                                />
                            </div>
                        )}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                                    <FaIdBadge className="text-sky-500"/> Email Address
                                </span>
                            </label>
                            <input 
                                type="text" 
                                value={dbUser.email} 
                                className="input input-bordered w-full bg-gray-200 text-gray-500 cursor-not-allowed" 
                                readOnly
                            />
                            <label className="label">
                                <span className="label-text-alt text-red-400">* Email cannot be changed</span>
                            </label>
                        </div>

                        {/* Submit btn */}
                        <div className="mt-4">
                            <button className="btn bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white w-full text-lg shadow-lg border-none">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;