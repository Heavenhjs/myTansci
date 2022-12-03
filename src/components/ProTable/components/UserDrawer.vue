<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="500px"
    :title="`${drawerData.title}用户`"
  >
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :disabled="drawerData.isView"
      :model="drawerData.rowData"
      label-position="left"
      label-width="100px"
      label-suffix=" :"
      :hide-required-asterisk="drawerData.isView"
    >
      <el-form-item
        label="用户姓名"
        prop="username"
      >
        <el-input
          v-model="drawerData.rowData!.username"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="性别"
        prop="gender"
      >
        <el-select
          v-model="drawerData.rowData!.gender"
          placeholder="请选择性别" 
          clearable
        >
          <el-option
            label="男"
            :value="1"
          />
          <el-option
            label="女"
            :value="2"
          />   
        </el-select>
      </el-form-item>
      <el-form-item
        label="身份证号"
        prop="idCard"
      >
        <el-input
          v-model="drawerData.rowData!.idCard"
          placeholder="请填写身份证号"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input
          v-model="drawerData.rowData!.email"
          placeholder="请输入邮箱"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="居住地址"
        prop="address"
      >
      <!-- 选择形式的地址 -->
        <!-- <el-cascader
          v-model="drawerData.rowData!.address"
          placeholder="请选择地址"
          :options="addressOptions"
        /> -->
        <el-input
          v-model="drawerData.rowData!.address"
          placeholder="请选择地址"
          clearable
        />
      </el-form-item>
    </el-form>
    <div class="submit-button">
      <el-button @click="drawerVisible = false">
        取消
      </el-button>
      <el-button
        v-show="!drawerData.isView"
        type="primary"
        @click="handleSubmit"
      >
        确定
      </el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { User } from "../../../api/interface/index";
import { provinceAndCityData } from "element-china-area-data";
import { ElMessage, FormInstance } from "element-plus";

const rules = reactive({
	username: [{ required: true, message: "请填写用户姓名", trigger: "change" }],
	gender: [{ required: true, message: "请选择性别", trigger: "change" }],
	idCard: [{ required: true, message: "请填写身份证号", trigger: "change" }],
	email: [{ required: true, message: "请填写邮箱", trigger: "change" }],
	address: [{ required: true, message: "请填写居住地址", trigger: "change" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: User.ResUserList;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}

// drawer框状态(刚开始不可见，父组件点击后接收acceptParams，置为true)
const drawerVisible = ref(false);
const drawerData = ref<DrawerProps>({
	isView: false,
	title: ""
});
// 中国省市区级联数据
const addressOptions = ref(provinceAndCityData );
// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
	drawerData.value = params;
	drawerVisible.value = true;
};
//

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value?.validate(async valid => {
		if (!valid) return;
		try {
			await drawerData.value.api?.(drawerData.value.rowData);
			ElMessage.success({ message: `${drawerData.value.title}用户成功！` });
			drawerData.value.getTableList?.();
			drawerVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};

// 暴露给父组件
defineExpose({
    acceptParams
})
</script>

<style lang="less" scoped>

</style>