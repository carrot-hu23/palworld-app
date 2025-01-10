// 获取用户列表
import axiosInstance from "../utils/axiosInstance";
import {ApiResponse, Config} from "../types";

// 获取用户列表
export const fetchConfig = async (): Promise<ApiResponse<Config>> => {
    const response = await axiosInstance.get<ApiResponse<Config>>('/api/game/system/config');
    return response.data;
};

// 获取用户列表
export const saveConfig = async (config: Config): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/api/game/system/config', {
        ...config
    });
    return response.data;
};
