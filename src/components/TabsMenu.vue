<template>
  <div class="tabs-menu">
    <el-tabs
      v-model="state.tabsMenuValue"
      type="card"
      class="demo-tabs"
      @tab-click="onTabMenuClick"
      @tab-remove="onTabMenuRemove"
    >
      <el-tab-pane
        v-for="item in state.tabsMenuList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.close"
      >
        <template #label>
          <el-icon
            v-if="item.icon"
            style="vertical-align: middle; margin: 0.4rem;"
          >
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {HOME_URL} from "../config/config";
import {useRoute, useRouter} from "vue-router";
import { TabsPaneContext } from "element-plus/es/tokens/tabs";

const route = useRoute();
const router = useRouter();

type tabsMenu ={
  title: string;
  path: string;
  icon?: string;
  close: boolean;
}
interface State{
  tabsMenuValue: string,
  tabsMenuList:Array<tabsMenu>;
}

const state:State = reactive({
  tabsMenuValue: HOME_URL,
  tabsMenuList:[{title:"首页", path:HOME_URL, icon:"HomeFilled", close:false}],
});

// 定义emit事件
const emit = defineEmits<{
  (e:"onTabsLink",path:string): void;
}>();

const onTabMenuClick = (tabItem:TabsPaneContext) =>{
    let path:string = tabItem.props.name as string;
    emit('onTabsLink',path);
    // console.log("标签页发送刷新");
    // console.log(path);
};

// 这里还有些许bug 删除时要判断当前state.tabsMenuValue的变化
const onTabMenuRemove = (tabItem:string) =>{
  let key:number;
  for(key = 0; key < state.tabsMenuList.length; key++){
    if(state.tabsMenuList[key].path === tabItem){
      break;
    }
  }
  // 当前state.tabsMenuValue前移一位
  if(state.tabsMenuValue == state.tabsMenuList[key].path){
    if(key != state.tabsMenuList.length - 1)
      state.tabsMenuValue = state.tabsMenuList[key + 1].path;
    else
      state.tabsMenuValue = state.tabsMenuList[0].path;
  }

  // 删除tabsMenuList中的某个元素 做法是将该元素后的元素依次前挪，最后一个元素pop掉
  if(key < state.tabsMenuList.length){
    for(; key < state.tabsMenuList.length - 1; key++){
      state.tabsMenuList[key] = state.tabsMenuList[key + 1];
    }
  }
  state.tabsMenuList.pop();
}

// 点击左侧菜单时 首先判断有没有标签，没有就增加，有就将标签页替换
function onMenuClick(title:string, path: string, icon: string){
  console.log("菜单点击事件发生"+path);
  state.tabsMenuValue = path;
  let hasTabs = false;
  for(let key in state.tabsMenuList){
    if(state.tabsMenuList[key].path == path){
      hasTabs =true;
      break;
    }
  }
  // 增加标签
  if(hasTabs == false){
    let addTabs: tabsMenu ={
      title: title,
      path: path,
      icon: icon,
      close: true,}
    state.tabsMenuList.push(addTabs)
  }
}

defineExpose({onMenuClick});
</script>

<style lang="less" scoped>

</style>