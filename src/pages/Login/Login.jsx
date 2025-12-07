import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

   
    const [loginRole, setLoginRole] = useState('employee');

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        try {
            await signIn(email, password);
            toast.success('Login Successful!');
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await googleSignIn();
            
          
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                role: loginRole, 
                status: 'verified', 
                companyName: "",
                companyLogo: "",
                dateOfBirth: "", 
            }

           
            if (loginRole === 'hr') {
                userInfo.packageLimit = 5;
                userInfo.currentEmployees = 0;
                userInfo.subscription = 'basic';
            }

            console.log("Sending to DB:", userInfo);

            
            const { data } = await axiosPublic.post('/users', userInfo);
            console.log("Server Response:", data);
            toast.success('Google Login Successful!');
           
            navigate(from, { replace: true });

        } catch (error) {
            console.log("Google Login Error:", error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 py-10">
            <div className="card w-full max-w-[450px] shadow-2xl bg-base-100">
                
                <form onSubmit={handleLogin} className="card-body p-10">
                    <h2 className="text-4xl font-bold text-center text-sky-700 mb-6">Login</h2>
                    
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="your.email@example.com" className="input input-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200" required />
                    </div>

                    <div className="form-control w-full mt-4">
                        <label className="label flex justify-between items-center">
                            <span className="label-text font-semibold text-gray-700">Password</span>
                            <a href="#" className="label-text-alt link link-hover text-sky-600 font-medium">Forgot password?</a>
                        </label>
                        <input type="password" name="password" placeholder="*******" className="input input-bordered w-full focus:border-sky-500 focus:ring-2 focus:ring-sky-200" required />
                    </div>

                    <div className="form-control mt-8">
                        <button className="btn bg-sky-600 hover:bg-sky-800 text-white text-lg font-bold w-full border-none">Login</button>
                    </div>

                    <div className="divider my-6 text-gray-500 font-medium">OR</div>
                   
                    {/* Role Selection for Google */}
                    <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4'>
                        <p className='text-center text-sm font-semibold text-gray-600 mb-3'>
                            Joining with Google? Select Role:
                        </p>
                        <div className="flex justify-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer hover:text-sky-600 transition-colors">
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="employee" 
                                    className="radio radio-info radio-sm" 
                                    checked={loginRole === 'employee'}
                                    onChange={() => setLoginRole('employee')}
                                />
                                <span className="font-medium text-gray-700">Employee</span>
                            </label>
                            
                            <label className="flex items-center gap-2 cursor-pointer hover:text-sky-600 transition-colors">
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="hr" 
                                    className="radio radio-info radio-sm" 
                                    checked={loginRole === 'hr'}
                                    onChange={() => setLoginRole('hr')}
                                />
                                <span className="font-medium text-gray-700">HR Manager</span>
                            </label>
                        </div>
                    </div>

                    <button 
                        onClick={handleGoogleLogin}
                        type="button" 
                        className="btn btn-outline w-full flex items-center justify-center gap-3 font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                    >
                        <FcGoogle className="text-2xl" />
                        Sign in with Google
                    </button>

                    <p className="text-center mt-8 text-gray-600">
                        Don't have an account?{' '}
                        <span className="font-bold text-sky-700">
                            <Link to="/join-employee" className="link link-hover">Join as Employee</Link>
                            {' '}or{' '}
                            <Link to="/join-hr" className="link link-hover">Join as HR</Link>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;