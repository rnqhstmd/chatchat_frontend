import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true, // 쿠키를 포함시키기 위해 설정
});

export default instance;
