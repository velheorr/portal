import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {BACK} from "../utils/links";
const link = `${BACK}/api/user`

async function fetchUsers(){
    const data = (await axios.get(link)).data
    data.sort((a, b)=>{
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    })
    return data
}
export const useGetUsers = () => {
    return useQuery('users', fetchUsers,
        {
            keepPreviousData: true,
            refetchOnWindowFocus: true,
        })
}
/**/
export const useGetUsers_update = () => {
    const queryClient = useQueryClient();
    return useMutation((userItem) =>
            axios.post(link, userItem),
        {
            onSuccess: () => {
                // Инвалидация и обновление
                queryClient.invalidateQueries('users');
            }
        }
    );
}
export const useGetUser_del = () => {
    const queryClient = useQueryClient();
    return useMutation((id) =>
            axios.delete(link, { data: { id: id } }),
        {
            onSuccess: () => {
                // Инвалидация и обновление
                queryClient.invalidateQueries('users');
            }
        }
    );
}
