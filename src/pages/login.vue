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
          <el-form>
            <div class="login-form-title">欢迎登录</div>
            <el-form-item label="User name" prop="username">
              <el-input
                prefix-icon="Avatar"
                placeholder="请输入用户名称"
                style="width: 100%"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
// logo的url获取
const loginLogo: string = new URL(
  "../assets/image/login-left.png",
  import.meta.url
).href;

</script>

<style lang="less" scoped></style>
