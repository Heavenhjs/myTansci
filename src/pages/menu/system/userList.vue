<template>
  <el-card>
    <ProTable
      ref="proTable"
      title="用户列表"
      :columns="columns"
      :request-api="getUserList"
      :init-param="initParam"
      :data-callback="dataCallback"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="tableHeader">
        <el-button
          type="primary"
          :icon="CirclePlus"
          @click="openDrawer('新增')"
        >
          新增用户
        </el-button>
        <el-button
          type="danger"
          :icon="Delete"
          plain 
          @click="batchDelete(tableHeader.selectList)"
        >
          批量删除用户
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="operation">
        <el-button
          :icon="ZoomIn"
          type="success"
          text
          @click="openDrawer('查看',operation.row)"
        >
          查看
        </el-button>
        <el-button
          :icon="Edit"
          type="primary"
          text
          @click="openDrawer('编辑',operation.row)"
        >
          编辑
        </el-button>
        <el-button
          :icon="Edit"
          type="danger"
          text
          @click="deleteAccount(operation.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
  </el-card>
</template>
  
<script lang="ts" setup>
import { reactive, ref} from "vue";
import {User} from '../../../api/interface/index'
import ProTable from '../../../components/ProTable/Table.vue';
import { ColumnProps } from '../../../components/ProTable/interface';
import { getUserList, addUser, editUser , deleteUser} from '../../../api/userApi';
import { CirclePlus, Delete, ZoomIn, Edit } from "@element-plus/icons-vue";
import UserDrawer from "../../../components/ProTable/components/UserDrawer.vue";
import { useHandleData } from "../../../hooks/useHandleData";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 扩展于Table-column
const columns: ColumnProps[] = [
  {type:"selection", fixed:"left", width:80},
  {prop:"username",label:"用户姓名"},
  {prop:"gender", label:"性别"},
  {prop:"idCard", label:"身份证号"},
  {prop:"email", label:"邮箱"},
  {prop:"address", label:"居住地址"},
  {type:"operation", label:"操作",fixed:"right",width:310}
];

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	type: 1
});

// dataCallback 是对于返回的表格数据做处理，
// 如果你后台返回的数据不是 datalist && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataCallback = (data: any) => {
	return {
		datalist: data.datalist,
		total: data.total,
		pageNum: data.pageNum,
		pageSize: data.pageSize
	};
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref();
const openDrawer = (title: string, rowData: Partial<User.ResUserList> = { avatar: "" }) => {
  // console.log(rowData)
  let params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addUser : title === "编辑" ? editUser : "",
		getTableList: proTable.value.getTableList
	};
	drawerRef.value.acceptParams(params);
};

// 
const deleteAccount = async(params: User.ResUserList) =>{
  await useHandleData(deleteUser, params, `删除【${params.username}】用户`); 
  proTable.value.getTableList();
}

const batchDelete = async (params: User.ResUserList[]) =>{
  console.log(params);
  await useHandleData(deleteUser, params, "删除所选用户信息");
  // proTable.value.clearSelection();
	// proTable.value.getTableList();
}
</script>

<style lang="less" scoped>

</style>