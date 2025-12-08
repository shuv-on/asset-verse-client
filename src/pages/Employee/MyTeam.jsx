import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserFriends, FaBirthdayCake } from "react-icons/fa";

const MyTeam = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: teamMembers = [], isLoading } = useQuery({
        queryKey: ['my-team', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-team?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg text-sky-600"></span></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-2">My Team Members</h2>
            
           
            {teamMembers.length > 0 ? (
                <div className="text-center mb-8">
                     <span className="badge badge-lg badge-outline font-bold text-gray-500">
                        Company: {teamMembers[0].companyName}
                     </span>
                </div>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-gray-500 text-lg">You are not affiliated with any company yet.</p>
                    <p className="text-sm text-gray-400">Please make a request and wait for HR approval.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map(member => (
                    <div key={member._id} className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                        <div className="card-body flex flex-row items-center gap-4">
                            <div className="avatar">
                                <div className="w-16 h-16 rounded-full ring ring-sky-500 ring-offset-base-100 ring-offset-2">
                                    <img src={member.photoURL || "https://i.ibb.co/37hjkY0/user.png"} alt={member.name} />
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title text-gray-700 text-lg">
                                    {member.name} 
                                   
                                    {user.email === member.email && <span className="badge badge-xs badge-info text-white">Me</span>}
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <FaUserFriends className="text-sky-500"/> Team Member
                                </div>
                                
                                {member.dateOfBirth && (
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                        <FaBirthdayCake className="text-pink-400"/> {member.dateOfBirth}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTeam;