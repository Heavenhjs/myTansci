<!-- 参考于：https://juejin.cn/post/7166068828202336263 -->
<template>
  <!-- 表格内容 -->
  <div>
    <!-- 头部操作按钮（待补充） -->
    <div class="table-header">
      <div class="header-button-lf">
        <slot
          name="tableHeader"
          :selected-list-ids="selectedListIds"
          :select-list="selectedList"
          :is-selected="isSelected"
        />
      </div>
    </div>  
    <!-- 表格主体 -->
    <!-- ProTable 组件上的绑定的所有属性和事件都会通过 v-bind="$attrs" 透传到 el-table 上 -->
    <el-table
      v-bind="$attrs"
      :data="tableData"
      height="460"
      style="width: 100%"
      :row-key="getRowKeys"
      @selection-change="selectionChange"
    >
      <template
        v-for="item in tableColumns"
        :key="item"
      >
        <!-- selection || index -->
        <el-table-column
          v-if="item.type == 'selection' || item.type == 'index'"
          v-bind="item"
          align="center"
          :reserve-selection="item.type == 'selection'"
        />
        <el-table-column
          v-if="item.prop"
          align="center"
          :prop="item.prop"
          :label="item.label"
        />
        <el-table-column
          v-if="item.type == 'operation'"
          width="300px"
          :column="item"
        >
          <template #default="rowData">
            <slot 
              name="operation" 
              :row="rowData.row"
            />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <Pagination
      v-if="pagination"
      :pageable="pageable"
      :handle-size-change="handleSizeChange"
      :handle-current-change="handleCurrentChange"
    />
    <el-button @click="tiaoshi">
      调试
    </el-button>
  </div>
</template>

<script setup lang="ts" name="ProTable">
import { ref } from "vue";
import { TableProps } from "element-plus";
import { ColumnProps } from "./interface";
import Pagination from "../ProTable/components/Pagination.vue";
import { useTable} from "../../hooks/useTable"; 
import { useSelection } from "../../hooks/useSelection";

// 定义ProTable的Props的接口
// Partial可以让一个定义中的所有属性都变成可选参数
// Omit可以忽略定义中的某些属性，此处是忽略TableProps的data
interface ProTableProps extends Partial<Omit<TableProps<any>, "data">> {
  columns: ColumnProps[]; // 根据此字段渲染搜索表单与表格列 必传
  requestApi:(params:any) => Promise<any>; // 获取表格数据的请求 API 必传
  dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
	title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}，必须是 reactive 包裹的）
	border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	selectId?: string; // 当表格数据多选时，所指定的 id ==> 非必传（默认为 id）   
}
// 定义ProTable的Props 配置了一些默认值
const props = withDefaults(defineProps<ProTableProps>(),{
  columns: () => [],
	pagination: true,
	initParam: {},
	border: true,
	toolButton: true,
	selectId: "id"
})

// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedList, selectedListIds, isSelected } = useSelection(props.selectId);

// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, handleSizeChange, handleCurrentChange } =
	useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback);

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns);
const tiaoshi = () =>{
  console.log(selectedListIds);
}


defineExpose({ getTableList });
</script>

<style lang="less" scoped>

</style>