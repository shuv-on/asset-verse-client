import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: role = '', isLoading: roleLoading } = useQuery({
        queryKey: [user?.email, 'role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data?.role;
        }
    })

    return [role, roleLoading];
};

export default useRole;