<template>
  <!-- <usePiniaVue></usePiniaVue> -->
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
// import usePiniaVue from "./components/usePinia.vue";
import {reactive, toRefs} from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

// 为项目配置多语言
const state = reactive({
  locale: zhCn
})
const locale = toRefs(state);

</script>

<style lang="less">
html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
  }
</style>
