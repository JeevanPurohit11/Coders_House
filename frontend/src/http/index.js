import axios from 'axios';

//Creating axios instance with configuration
const api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
});

// List of all endpoints using the base URL from the axios instance

export const sendOtp = (data) => api.post('http://localhost:5500/api/send-otp', data);
export const verifyOtp = (data) => api.post('http://localhost:5500/api/verify-otp', data);

export default api;
