<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :style="{width:state.isCollapse?'64px':'240px'}">
      <!-- 项目logo -->
      <el-card>
        <div>
          <el-icon
            :size="26"
            style="vertical-align: middle"
          >
            <Platform />
          </el-icon>
          <span
            v-show="!state.isCollapse"
            style="vertical-align: middle; padding-left: 1rem"
          >myTansci</span>
        </div>
      </el-card>
      <!-- 菜单 -->
      <el-menu
        :collapse="state.isCollapse"
      >
        <MenuTree
          :menulist="state.menus"
          @onNestedLink="onNestedLink"
        />
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="height:66px;">
        <div style="padding-top: 0.4rem;padding-right: 0.4rem;padding-bottom: 0.4rem">
          <el-icon
            :size="25"
            style="vertical-align: middle; cursor: pointer;"
            @click="onCollapse"
          >
            <component :is="state.isCollapse?'Expand':'Fold'" />
          </el-icon>
          <el-icon
            :size="20"
            color="#55bc8a"
            style="vertical-align: middle;"
          >
            <Timer />
          </el-icon>
          <span style="padding-right: 2rem;vertical-align: middle;">{{ nowTimes }}</span>
          <TabsMenu 
            ref="tabsmenu"
            @onTabsLink="onTabsLink"
          />
        </div>
      </el-header>
      <!-- 主页面 -->
      <el-main>
        <router-view
          v-show="state.iframe.isIframe"
          style="margin: 0.4rem;"
        />
        <iframe
          v-show="state.iframe.isIframe"
          :src="state.iframe.src"
          width="100%"
          frameborder="0"
        />
      </el-main>
    </el-container>
  </el-container>
  <el-backtop target=".el-main" />
</template>

<script setup lang="ts">
import {ref, reactive, onBeforeMount, onMounted} from 'vue';
import MenuTree from "../components/menuTree.vue";
import TabsMenu from "../components/TabsMenu.vue"
import {timeFormate} from '../utils/utils.js';

const tabsmenu = ref();

type MenuItem ={
  key: string;
  title: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
}
type Ifram = {
  isIframe: boolean;
  src: string | undefined;
}
interface State{
    isCollapse: boolean;
    asideWidth: string;
    menus: Array<MenuItem>;
    iframe: Ifram;
}
const state:State = reactive({
  isCollapse: false,
  asideWidth: '500px',
  menus: [],
  iframe: {
    isIframe: true,
    src: '',
  },

});
const nowTimes = ref('');

// onBeforeMount在组件DOM实际渲染安装之前调用。
onBeforeMount(()=>{
  onNowTimes();
})
// onMounted在组件的第一次渲染后调用
onMounted(() => {
// 这里要使用pinia调用store数据中的useMenuStore动态数据
// 这里先简单定义静态数据测试
  state.menus = [
    {key:"0",title:"工作台",path:"/console",icon:"House"},
    {key:"1",title:"系统管理",icon:"SetUp",children:
    [{key:"1-1",title:"用户列表",path:"/userlist",icon:"Notification"},
    {key:"1-2",title:"菜单管理",path:"/menuman",icon:"Operation"},
    {key:"1-3",title:"角色管理",path:"/userman",icon:"UserFilled"},
    ]},
    {key:"3",title:"消息管理",path:"/infoman",icon:"ChatLineSquare"},
    {key:"4",title:"任务管理",path:"/taskman",icon:"PieChart"},
    {key:"5",title:"系统文档",path:"/sysydoc",icon:"Tickets"},];
});

// onNestedLink在点击菜单后触发
// 点击菜单后 更改iframe 向标签TabsMenu子组件发送
const onNestedLink = (item: MenuItem)=>{
  state.iframe.isIframe = true;
  state.iframe.src = item.path;
  // 向子组件TabMenu发送事件，由子组件TabMenu更换标签显示，并决定是否增加
  tabsmenu.value.onMenuClick(item.title,state.iframe.src,item.icon);
}

// 顶部header栏的时间函数
const onNowTimes =() =>{
  setInterval(()=>{
    nowTimes.value = timeFormate(new Date());
  },1000);
}

const onTabsLink =(path:string) =>{
  state.iframe.src = path;
}
const onCollapse =() =>{
  state.isCollapse = ! state.isCollapse
}
</script>

<style lang="less" scoped></style>
