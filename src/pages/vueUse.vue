<template>
  <div>
    <h1>测试 vueUse 的鼠标坐标</h1>
       
    <h3>Mouse: {{ mouse }}</h3>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useMouse } from "@vueuse/core";
const mouse = reactive(useMouse());
</script>

<style lang="less" scoped></style>
