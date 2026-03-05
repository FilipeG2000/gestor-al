import axios from "axios";

export const api = axios.create({
    baseURL: "", // usa proxy do Vite
    headers: { "Content-Type": "application/json" },
});