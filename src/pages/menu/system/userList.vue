<template>
  <el-card>
    <ProTable
      ref="proTable"
      title="用户列表"
      :columns="columns"
      :requestApi="getUserList"
      :initParam="initParam"
      :dataCallback="dataCallback">
    </ProTable>
  </el-card>
</template>
  
<script lang="ts" setup>
import { reactive } from "vue";
import ProTable from '../../../components/ProTable/Table.vue';
import { ColumnProps } from '../../../components/ProTable/interface';
import { getUserList } from '../../../api/userApi';
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

</script>

<style lang="less" scoped>

</style>