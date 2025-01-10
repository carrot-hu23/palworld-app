import axios from 'axios';
import AxiosInstance = Axios.AxiosInstance;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8083', // 替换为你的 API 基础 URL
    timeout: 10000, // 超时时间
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 在请求发送前处理，例如添加认证 token
        const token = localStorage.getItem('token');
        if (token) {
            if (config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // 错误处理
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
