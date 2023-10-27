import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.spotify.com',
    headers: {
        "Content-Type": "application/json",
    },
})

export default axiosInstance;