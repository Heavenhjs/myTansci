import { AxiosResponse } from 'axios';
import axios from '../utils/axios';
import {getWeatherApi} from '../config/config';
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
    logintime!: string;
}

// 处理  
declare module "axios" {
    interface AxiosResponse {
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

export function findIp():Promise<AxiosResponse<any, any>> {
    return axios.get('/findIp');
}
export function getWeather(district_id: string):Promise<AxiosResponse<any, any>> {
    return axios.get('/getWeather'+getWeatherApi+"district_id="+district_id);
}