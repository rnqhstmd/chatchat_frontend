import axiosInstance from './axiosConfig';

export const register = (name, email, password) => {
    return axiosInstance.post('/auth/sign-up', { name, email, password });
};

export const login = (email, password) => {
    return axiosInstance.post('/auth/login', { email, password });
};

export const logout = () => {
    return axiosInstance.get('/auth/logout');
};
