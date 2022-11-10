<template>
  <template
    v-for="item in menulist"
    :key="item.key"
  >
    <template v-if="!item.children">
      <el-menu-item
        :index="item.key"
        @click="handleClick(item)"
      >
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <template v-else>
      <el-sub-menu :index="item.key">
        <template #title>
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <menuTree
          :menulist="item.children" 
          @onNestedLink="onNestedLink"
        />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
type MenuItem = {
  key: string;
  title: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
}

defineProps<{
  menulist:MenuItem[]
}>()

// 定义emit事件
const emit = defineEmits<{
  (e:"onNestedLink",item:MenuItem): void;
}>();

// 递归组件父层发送事件
const handleClick = (item: MenuItem)=>{
  emit('onNestedLink',item);
  // console.log("父层");
}
// 递归组件子层发送事件
const onNestedLink = (item: MenuItem)=>{
  emit('onNestedLink',item);
  // console.log("子层");
}
</script>

<style lang="less" scoped>

</style>