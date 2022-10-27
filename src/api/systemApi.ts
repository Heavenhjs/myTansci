import { AxiosResponse } from 'axios';
import axios from '../utils/axios'
// ==================登录=============================
/**
 * 登录
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
class param {
    username!: string;
    password!: string;
}

class result {
    username!: string;
    password!: string;
    loginTime: string | undefined;
}

// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module "axios" {
    interface AxiosResponse<T = any> {
      errorinfo: null;
      result: result;
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

 export function login(params: param):Promise<AxiosResponse<any, any>> {
    // 向后台发送post请求
    // Springboot版本
    // return axios.post('/tansci/user/login', params);
    // Mock版本 需要加上/api（由于vite.config.ts配置）再调用接口
    return axios.post('/api/mytansci/user/login', params);
}
