 
<template>
     I am userPinia
  <div>{{ userStore.name }}</div>
  <button @click="change">修改</button>
</template>

 
<script lang="ts" setup>
import { userUserStore } from "../store/user";
const userStore = userUserStore();

const change = () => {
  userStore.updateName("李四");
};
</script>
