import axios from "axios";

interface User {
  id?: string;
  email?: string;
  token?: string;
}

const token = () => {
  const data = localStorage.getItem("user");
  if (data) {
    const user: User = JSON.parse(data);
    const token = user.token;
    return `Bearer ${token}`;
  }
  return "";
};

const api = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
    Authorization: token(),
  },
});

export default api;
