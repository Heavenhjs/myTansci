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

// 新增用户
export const addUser = (params: User.ReqGetUserParams) => {
    console.log("发送新增用户请求");
    return axios.post(PORT1  + `/user/sys/add`, params);
}

// 编辑用户
export const editUser = (params: { id: string }) => {
    console.log("发送编辑用户请求");
    console.log(params);
	return axios.post(PORT1 + `/user/sys/edit`, params);
};

// 删除用户
export const deleteUser = (params: {id: string}) =>{
    console.log("发送删除用户请求");
    console.log(params);
    return axios.post(PORT1 + '/user/sys/delete', params);
}
