import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaCamera, FaIdBadge, FaBirthdayCake, FaBuilding, FaBriefcase } from "react-icons/fa";

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

      
        if (dbUser.role === 'hr') {
            updateDoc.companyName = form.companyName.value;
            updateDoc.companyLogo = form.companyLogo.value; 
        }

        try {
         
            await updateUserProfile(name, photo);
            
            
            const { data } = await axiosSecure.put(`/users/${user?.email}`, updateDoc);
            
            if (data.modifiedCount > 0) {
                toast.success("Profile Updated Successfully!");
                refetch();
            } else {
                toast.success("No changes made.");
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
            <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Top Cover */}
                <div className="h-48 bg-gradient-to-r from-sky-500 to-indigo-600 relative">
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="avatar">
                            <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-lg bg-white">
                                <img src={dbUser.photoURL || user?.photoURL || "https://i.ibb.co/37hjkY0/user.png"} alt="Profile" className='object-cover' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Info Header */}
                <div className="pt-20 pb-6 text-center px-6">
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

               
                <div className="mx-8 mb-6 p-6 bg-sky-50 rounded-xl border border-sky-100 flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-sky-500 uppercase mb-1">
                            {dbUser.role === 'hr' ? 'Managing Company' : 'Affiliated Company'}
                        </h4>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <FaBriefcase className='text-sky-600'/> 
                            {dbUser.companyName || (dbUser.role === 'hr' ? 'Set Your Company Name' : 'Not Hired Yet')}
                        </h2>
                    </div>
                    {dbUser.companyLogo && (
                        <div className="avatar">
                            <div className="w-16 h-16 rounded-xl ring ring-sky-200 ring-offset-2">
                                <img src={dbUser.companyLogo} alt="Company Logo" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Update Form */}
                <div className="p-10 bg-white">
                    <h3 className="text-xl font-bold text-gray-700 mb-6 border-l-4 border-sky-600 pl-3">
                        Edit Profile Details
                    </h3>

                    <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Name */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold text-gray-500">Full Name</span></label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3.5 text-sky-500"/>
                                <input type="text" name="name" defaultValue={dbUser.name} className="input input-bordered w-full pl-10 focus:border-sky-500 bg-gray-200 text-gray-500" required />
                            </div>
                        </div>

                        {/* Profile Photo */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold text-gray-500">Profile Photo URL</span></label>
                            <div className="relative">
                                <FaCamera className="absolute left-3 top-3.5 text-sky-500"/>
                                <input type="url" name="photo" defaultValue={dbUser.photoURL} className="input input-bordered w-full pl-10 focus:border-sky-500 bg-gray-200 text-gray-500" required />
                            </div>
                        </div>

                     
                        {dbUser.role === 'employee' && (
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold text-gray-500">Date of Birth</span></label>
                                <div className="relative">
                                    <FaBirthdayCake className="absolute left-3 top-3.5 text-sky-500"/>
                                    <input type="date" name="dob" defaultValue={dbUser.dateOfBirth} className="input input-bordered w-full pl-10 focus:border-sky-500 bg-gray-200 text-gray-500" />
                                </div>
                            </div>
                        )}

                     
                        {dbUser.role === 'hr' && (
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold text-gray-500">Company Name</span></label>
                                <div className="relative">
                                    <FaBuilding className="absolute left-3 top-3.5 text-sky-500"/>
                                    <input type="text" name='companyName' defaultValue={dbUser.companyName} className="input input-bordered w-full pl-10 focus:border-sky-500 bg-gray-200 text-gray-500" required />
                                </div>
                            </div>
                        )}

                       
                        {dbUser.role === 'hr' && (
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold text-gray-500">Company Logo URL</span></label>
                                <div className="relative">
                                    <FaBriefcase className="absolute left-3 top-3.5 text-sky-500"/>
                                    <input type="url" name='companyLogo' defaultValue={dbUser.companyLogo} placeholder="https://logo-url.com" className="input input-bordered w-full pl-10 focus:border-sky-500 bg-gray-50" />
                                </div>
                            </div>
                        )}

                     
                        <div className="form-control md:col-span-2">
                            <label className="label"><span className="label-text font-semibold text-gray-500">Email Address (Read Only)</span></label>
                            <div className="relative">
                                <FaIdBadge className="absolute left-3 top-3.5 text-gray-400"/>
                                <input type="text" value={dbUser.email} className="input input-bordered w-full pl-10 bg-gray-200 text-gray-500 cursor-not-allowed" readOnly />
                            </div>
                        </div>

                        {/* Submit btn */}
                        <div className="mt-4 md:col-span-2">
                            <button className="btn bg-sky-600 hover:bg-sky-700 text-white w-full text-lg shadow-lg border-none">
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