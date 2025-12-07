import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import useRole from '../../hooks/useRole';

const JoinHR = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [, , refetch] = useRole();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const companyName = form.companyName.value;
        const logo = form.logo.value;
        const details = form.details.value;
        const email = form.email.value;
        const password = form.password.value;
        const dob = form.dob.value;

        try {
            await createUser(email, password);
            
            await updateUserProfile(name, logo);

            const hrInfo = {
                name,
                email,
                role: 'hr',
                companyName,
                companyLogo: logo,
                companyDetails: details,
                dateOfBirth: dob,
                packageLimit: 5,
                currentEmployees: 0, 
                subscription: 'basic',
                status: 'verified'
            };

            const { data } = await axiosPublic.post('/users', hrInfo);
            
            if (data.insertedId) {
                refetch();
                toast.success('Registration Successful!');
                navigate('/');
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 py-10">
            <div className="card w-full max-w-[450px] shadow-2xl bg-base-100">
                <form onSubmit={handleRegister} className="card-body p-10">
                    <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
                        Join as <span className="text-sky-700">HR Manager</span>
                    </h2>

                    {/* Full Name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Full Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="HR Name"
                            className="input input-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            required
                        />
                    </div>

                    {/* Company Name */}
                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Company Name</span>
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Asset Verse"
                            className="input input-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            required
                        />
                    </div>

                    {/* Company Logo */}
                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Company Logo URL</span>
                        </label>
                        <input
                            type="url"
                            name="logo"
                            placeholder="https://i.ibb.co/..."
                            className="input input-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-gray-700"
                            required
                        />
                    </div>

                    {/* Company Details */}
                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Company Details</span>
                        </label>
                        <textarea
                            name="details"
                            placeholder="Write details here..."
                            className="textarea textarea-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-gray-700"
                            rows="4"
                            required
                        />
                    </div>


                    {/* Email */}
                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="hr@company.com"
                            className="input input-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Min 6 chars"
                            className="input input-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Date of Birth</span>
                        </label>
                        <input
                            type="date"
                            name="dob"
                            className="input input-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-gray-700"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-8">
                        <button type="submit" className="btn bg-sky-600 hover:bg-sky-800 text-white text-lg font-bold w-full border-none">
                            Register
                        </button>
                    </div>


                    <p className="text-center mt-8 text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="link link-hover font-bold text-sky-700">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default JoinHR;