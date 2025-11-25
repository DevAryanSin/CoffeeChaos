import axiosInstance from './axios';

export const authService = {
    async register(username, email, password) {
        const response = await axiosInstance.post('/auth/register', {
            username,
            email,
            password,
        });
        return response.data;
    },

    async login(email, password) {
        const response = await axiosInstance.post('/auth/login', {
            email,
            password,
        });
        return response.data;
    },

    async logout() {
        const response = await axiosInstance.post('/auth/logout');
        return response.data;
    },

    async getCurrentUser() {
        try {
            const response = await axiosInstance.get('/auth/me');
            return response.data;
        } catch (error) {
            return null;
        }
    },

    async checkAuth() {
        try {
            const response = await axiosInstance.get('/auth/me');
            return response.data.success;
        } catch (error) {
            return false;
        }
    },
};
