import { User, ResPage } from "../api/interface";
import { PORT1 } from "../config/config";
import axios from '../utils/axios';
/**
 * @name 用户管理模块
 */
// 获取用户列表
export const getUserList = (params: User.ReqGetUserParams) =>{
    console.log("发送getUserList请求");
    return axios.post<ResPage<User.ResUserList>>(PORT1 + `/user/sys/getuserlist`, params);
}