import axios from '../utils/axios'
// ==================登录=============================
/**
 * 登录
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
 export function login(params: any) {
    // 向后台发送post请求
    // Springboot版本
    return axios.post('/tansci/user/login', params);
    // Mock版本 待补充
}
