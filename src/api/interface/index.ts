/* eslint-disable @typescript-eslint/no-namespace */

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}


// * 用户管理模块
export namespace User {
    // 用户列表 请求参数
    export interface ReqGetUserParams extends ReqPage {
        username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
    }
	// 用户列表 响应参数
    export interface ResUserList {
		id: string;
		username: string;
		gender: string;
		age: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
		avatar: string;
		children?: ResUserList[];
	}
}

export namespace Table {
	export interface Pageable {
		pageNum: number;
		pageSize: number;
		total: number;
	}
	export interface TableStateProps {
		tableData: any[];
		pageable: Pageable;
		searchParam: {
			[key: string]: any;
		};
		searchInitParam: {
			[key: string]: any;
		};
		totalParam: {
			[key: string]: any;
		};
		icon?: {
			[key: string]: any;
		};
	}
}
