<!-- 💢💢💢 后期会重构 Pro-Table 组件，使用 v-bind 属性透传 -->

<template>
  <div class="table-box">
    <!-- 查询表单 -->
    <SearchForm
      v-show="isShowSearch"
      :search="search"
      :reset="reset"
      :search-param="searchParam"
      :columns="searchColumns"
    />
    <!-- 表格头部 操作按钮 -->
    <div class="table-header">
      <div class="header-button-lf">
        <slot
          name="tableHeader"
          :ids="selectedListIds"
          :is-selected="isSelected"
        />
      </div>
      <div
        v-if="toolButton"
        class="header-button-ri"
      >
        <el-button
          :icon="Refresh"
          circle
          @click="getTableList"
        />
        <el-button
          :icon="Operation"
          circle
          @click="openColSetting"
        />
        <el-button
          v-if="searchColumns.length"
          :icon="Search"
          circle
          @click="isShowSearch = !isShowSearch"
        />
      </div>
    </div>
    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      height="575"
      :data="tableData"
      :border="border"
      :row-key="getRowKeys"
      :stripe="stripe"
      :tree-props="{ children: childrenName }"
      @selection-change="selectionChange"
    >
      <template
        v-for="item in tableColumns"
        :key="item"
      >
        <!-- selection || index -->
        <el-table-column
          v-if="item.type == 'selection' || item.type == 'index'"
          :type="item.type"
          :reserve-selection="item.type == 'selection'"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
        />
        <!-- expand（展开查看详情，请使用作用域插槽） -->
        <el-table-column
          v-if="item.type == 'expand'"
          v-slot="scope"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
        >
          <slot
            :name="item.type"
            :row="scope.row"
          />
        </el-table-column>
        <!-- other -->
        <el-table-column
          v-if="!item.type && item.prop && item.isShow"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.prop !== 'operation'"
          :resizable="true"
          :fixed="item.fixed"
        >
          <!-- 自定义 header (使用组件渲染 tsx 语法) -->
          <template
            v-if="item.renderHeader"
            #header
          >
            <component
              :is="item.renderHeader"
              :row="item"
            />
          </template>

          <!-- 自定义配置每一列 slot（使用作用域插槽） -->
          <template #default="scope">
            <slot
              :name="item.prop"
              :row="scope.row"
            >
              <!-- tag 标签（自带格式化内容） -->
              <el-tag
                v-if="item.tag"
                :type="filterEnum(scope.row[item.prop!], item.enum!, item.searchProps,'tag')"
              >
                {{
                  item.enum?.length ? filterEnum(scope.row[item.prop!], item.enum!, item.searchProps) : formatValue(scope.row[item.prop!])
                }}
              </el-tag>
              <!-- 文字（自带格式化内容） -->
              <span v-else>
                {{
                  item.enum?.length ? filterEnum(scope.row[item.prop!], item.enum!, item.searchProps) : formatValue(scope.row[item.prop!])
                }}
              </span>
            </slot>
          </template>
        </el-table-column>
      </template>
      <template #empty>
        <div class="table-empty">
          <img
            src="@/assets/images/notData.png"
            alt="notData"
          >
          <div>暂无数据</div>
        </div>
      </template>
    </el-table>
    <!-- 分页 -->
    <Pagination
      v-if="pagination"
      :pageable="pageable"
      :handle-size-change="handleSizeChange"
      :handle-current-change="handleCurrentChange"
    />
    <!-- 列设置 -->
    <ColSetting
      v-if="toolButton"
      ref="colRef"
      :table-ref="tableRef"
      :col-setting="colSetting"
    />
  </div>
</template>
<script setup lang="ts" name="proTable">
import { ref, watch } from "vue";
import { useTable } from "@/hooks/useTable";
import { useSelection } from "@/hooks/useSelection";
import { Refresh, Operation, Search } from "@element-plus/icons-vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { filterEnum, formatValue } from "@/utils/util";
import SearchForm from "@/components/SearchForm/index.vue";
import Pagination from "./components/Pagination.vue";
import ColSetting from "./components/ColSetting.vue";

// 表格 DOM 元素
const tableRef = ref();

// 是否显示搜索模块
const isShowSearch = ref<boolean>(true);

interface ProTableProps {
  columns: Partial<ColumnProps>[]; // 列配置项
  requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
  dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理
  pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean; // 表格是否显示边框 ==> 非必传（默认为true）
  stripe?: boolean; // 是否带斑马纹表格 ==> 非必传（默认为false）
  toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
  childrenName?: string; // 当数据存在 children 时，指定 children key 名字 ==> 非必传（默认为"children"）
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  pagination: true,
  initParam: {},
  border: true,
  stripe: false,
  toolButton: true,
  childrenName: "children"
});

// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedListIds, isSelected } = useSelection();

// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
  useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback);

// 监听页面 initParam 改化，重新获取表格数据
watch(
  () => props.initParam,
  () => {
    getTableList();
  },
  { deep: true }
);

// 表格列配置项处理（添加 isShow 属性，控制显示/隐藏）
const tableColumns = ref<Partial<ColumnProps>[]>();
tableColumns.value = props.columns.map(item => {
  return {
    ...item,
    isShow: item.isShow ?? true
  };
});

// 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，获取enum数据
tableColumns.value.forEach(async item => {
  if (item.enum && typeof item.enum === "function") {
    const { data } = await item.enum();
    item.enum = data;
  }
});

// 过滤需要搜索的配置项
const searchColumns = tableColumns.value.filter(item => item.search);
// 设置搜索表单的默认值
searchColumns.forEach(column => {
  if (column.searchInitParam !== undefined && column.searchInitParam !== null) {
    searchInitParam.value[column.prop!] = column.searchInitParam;
  }
});

// * 列设置
const colRef = ref();
// 过滤掉不需要设置显隐的列
const colSetting = tableColumns.value.filter((item: Partial<ColumnProps>) => {
  return (
    item.type !== "selection" &&
    item.type !== "index" &&
    item.type !== "expand" &&
    item.prop !== "operation" &&
    item.isShow !== false
  );
});
const openColSetting = () => {
  colRef.value.openColSetting();
};

// 暴露给父组件的参数和方法
defineExpose({ searchParam, refresh: getTableList });
</script>
