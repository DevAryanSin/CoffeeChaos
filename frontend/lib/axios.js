import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    withCredentials: true, // Important for session cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Just log errors, don't redirect
        if (error.response?.status === 401) {
            console.log('Unauthorized request - user may need to login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
