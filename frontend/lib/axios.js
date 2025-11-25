import axios from 'axios';

// Determine the base URL based on environment
// In production (Netlify), use relative path which gets redirected to functions
// In local development, use the backend server
const getBaseURL = () => {
    // If NEXT_PUBLIC_API_URL is set, use it
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }

    // Otherwise, detect environment
    if (typeof window !== 'undefined') {
        // Client-side: check if we're on localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:5000/api';
        }
        // Production: use relative path (Netlify redirects /api/* to functions)
        return '/api';
    }

    // Server-side fallback
    return '/api';
};

const axiosInstance = axios.create({
    baseURL: getBaseURL(),
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
