<template>
  <div class="login">
    <!-- 用卡片嵌登录表单 -->
    <el-card shadow="always">
      <div class="login-main">
        <!-- 登录左侧的图标 -->
        <div class="login-logo">
          <el-image :src="loginLogo" style="width: 100%; height: 100%" />
        </div>
        <!-- 主登录表单 -->
        <div class="login-form">
          <el-form ref="ruleFormRef" :model="state.loginForm" :rules="rules">
            <div class="login-form-title">欢迎登录</div>
            <el-form-item label="账号" prop="username">
              <el-input
                v-model="state.loginForm.username"
                prefix-icon="Avatar"
                placeholder="请输入用户账号"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="state.loginForm.password"
                prefix-icon="Lock"
                placeholder="请输入用户密码"
                type="password"
                style="width: 100%"
              />
            </el-form-item>
            <!-- 这里需要再做一个滑动块验证 -->
            <el-form-item>
              <el-checkbox
                v-model="state.loginForm.keepPassword"
                label="记住密码"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                round
                style="width: 100%"
                @click="submit(ruleFormRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
          <button @click="tiaoshi">调试</button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ref, reactive } from "vue";
import { useUserStore } from "../store/user";
import { login } from "../api/systemApi";
import {useRouter} from "vue-router";

// 使用的pinia
const userStore = useUserStore();
const router = useRouter();
// logo的url获取
const loginLogo: string = new URL(
  "../assets/image/login-left.png",
  import.meta.url
).href;

const ruleFormRef = ref<FormInstance>();

const state = reactive({
  loginForm: {
    username: "",
    password: "",
    keepPassword: null,
  },
});
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: "Please input username",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9]\w{4,17}$/,
      message: "Format error, please re-enter",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      pattern: /^[a-zA-Z0-9]\w{4,17}$/,
      message: "Format error, please re-enter",
    },
  ],
});

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    // 表单数据符合格式则提交 提交需要通过pinia存储用户信息和token
    if (valid) {
      console.log("submit!");
      let param = {
        username: state.loginForm.username,
        password: state.loginForm.password,
      };
      login(param)
        .then((res) => {
          if (res) {
            // 存储用户信息
            console.log(res);
            // 这里暂时需要调用mock的数据返回
            userStore.setUser(res.result);
            // 存储token
            // tokenStore.setToken(res.result.token);
            // 通过router访问main的path
            router.push({ path: "main" });
          }
        })
        .catch(() => {
          // state.loginForm.verifyStatus = null;
          // slidingVerify.value.onRefresh();
        });
    }
    // 表单数据不符合则显示error
    else {
      console.log("error submit!", fields);
    }
  });
};

const tiaoshi = () => {
  console.log(state.loginForm.username);
  console.log(state.loginForm.password);
  console.log(state.loginForm.keepPassword);
};
</script>

<style lang="less" scoped></style>
