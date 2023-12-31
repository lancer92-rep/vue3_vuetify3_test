import axios from 'axios';
import { defineStore } from 'pinia';

import { useAuthStore } from '@/stores';
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
        user: {}
    }),
    actions: {
        async register(user:{}) {
            await axios.post(`${baseUrl}/register`, user);
        },
        async getAll() {
            this.users = { loading: true };
            try {
                this.users = await axios.get(baseUrl);    
            } catch (error) {
                this.users = { error };
            }
        },
        async getById(id:string) {
            this.user = { loading: true };
            try {
                this.user = await axios.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.user = { error };
            }
        },
        async update(id:string, params:any) {
            await axios.put(`${baseUrl}/${id}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // update local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // update auth user in pinia state
                authStore.user = user;
            }
        },
        // async delete(id:string) {
        //     // add isDeleting prop to user being deleted
        //     this.users.find(x => x.id === id).isDeleting = true;

        //     await fetchWrapper.delete(`${baseUrl}/${id}`);

        //     // remove user from list after deleted
        //     this.users = this.users.filter(x => x.id !== id);

        //     // auto logout if the logged in user deleted their own record
        //     const authStore = useAuthStore();
        //     if (id === authStore.user.id) {
        //         authStore.logout();
        //     }
        // }
    }
});
