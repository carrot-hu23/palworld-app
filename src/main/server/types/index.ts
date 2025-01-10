export interface Config {
    steamcmd: string,
    force_install_dir: string,
    backupPath?: string
}

// 通用响应类型
export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

// 成功响应
export const success = <T>(data: T, message: string = 'Success'): ApiResponse<T> => ({
    code: 200,
    message,
    data,
});

// 错误响应
export const error = <T>(code: number, message: string = 'Error', data: T | null = null): ApiResponse<T | null> => ({
    code,
    message,
    data,
});