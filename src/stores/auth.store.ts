import { defineStore } from "pinia";

import api from "@/services/api"
import router from "@/router";
import { useAlertStore } from "@/stores";

const baseUrl = process.env.VITE_API_URL;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") as any),
    returnUrl: "/",
  }),
  actions: {
    async login(email: string, password: string) {
      const alertStore = useAlertStore();
      alertStore.clear();
      try {
        const user = await api.post(`${baseUrl}/login`, { email, password });

        // update pinia state
        this.user = user.data;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user.data));

        // redirect to previous url or default to home page
        router.push(this.returnUrl || "/");
      } catch (error: any) {
        alertStore.error(error.response.data.message);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/");
    },
  },
});
