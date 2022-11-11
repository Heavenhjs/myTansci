<template>
  <div class="home">
    <el-card shadow="hover">
      <div class="home-header">
        <div class="home-header-greetings">
          <div class="greetings-text">
            您好，祝您新的一天工作愉快。
          </div>
          <div class="greetings-weather">
            {{ state.city.name }} 天气：{{ state.city.weather }}，体感温度：{{ state.city.temperature }}° 
          </div>
        </div>
        <div class="home-header-todos">
          <div
            v-for="(todo, index) in state.todoList"
            :key="index"
          >
            <div class="todo-title">
              <el-icon
                :color="todo.color"
              >
                <component :is="todo.icon" />
              </el-icon>
              <span>{{ todo.name }}</span>
            </div>
            <div class="todo-num">
              {{ todo.untreated }} / {{ todo.total }}
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <div class="home-main">
      <div class="home-main-chart">
        <el-card shadow="hover">
          <div
            id="myPie"
            style="height:500px;"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, onBeforeMount, onMounted} from "vue";
import {findIp, getWeather} from "../../api/systemApi";
type ToDoItem={
  name: string;
  total: number;
  untreated: number;
  icon: string;
  color: string;
}

interface State{
    city:{id: string;
    name: string;
    weather: string;
    temperature: number;};
    todoList: Array<ToDoItem>;
}

const state: State = reactive({
    city:{id: "cityid",
    name: "cityname",
    weather:"weather",
    temperature:0,},
    todoList:[],
});
onBeforeMount(() => {
    findIp().then((res) => {
        // res.data为var returnCitySN = {"cip": "113.57.237.77", "cid": "420100", "cname": "湖北省武汉市"};
        let resStr = res.data.split("=")[1];
        let resCity = eval("(" + resStr.substring(1,resStr.length - 1) + ")");
        state.city.id = resCity.cid;
        state.city.name = resCity.cname;

        getWeather(state.city.id).then((res) =>{
        state.city.temperature = res.data.result.now.feels_like;
        state.city.weather = res.data.result.now.text;
    })
    });
});

onMounted(() => {
  onTodoList();
  onPie();
});

const onTodoList = () =>{
  state.todoList = [
      {name:'待办事项',total:100,untreated:28,icon:'Bell',color:'#f56c6c'},
			{name:'待办事项',total:84,untreated:78,icon:'ChatDotSquare',color:'#0084ff'},
			{name:'待办事项',total:25,untreated:21,icon:'Warning',color:'#63ba4d'},
			{name:'待办事项',total:12,untreated:5,icon:'Edit',color:'#006000'},];
}

const onPie = () =>{
		let myPie = echarts.init(document.getElementById("myPie") as any);
		myPie.setOption({
			title: {},
			legend: {},
			tooltip: {
				trigger: 'item',
                formatter: '{a} <br/>{b} : {c}￥ ({d}%)'
			},
			color: ['#94716B', '#6C5B7B', '#355C7D'],
			series: [
				{
					name: '渠道',
					type: 'pie',
					radius: '90%',
					avoidLabelOverlap: false,
                    roseType: 'radius',
					center: ['50%', '50%'],
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label:{
						show: true,
						position: 'inner'
					},
					labelLine: {
						show:false
					},
					data: [
						{value: 335, name: '指标一'},
						{value: 310, name: '指标二'},
						{value: 274, name: '指标三'},
					].sort(function (a, b) {
						return a.value - b.value;
					})
				}
			]
		});
		window.onresize = function () {
			myPie.resize();
		};
	}

</script>

<style lang="less" scoped>
el-card{
  padding: 10px;
}
.home{
    .home-header{
      display: flex;
			justify-content: space-between;
			padding: 1rem 4rem;
			.home-header-greetings{
				.greetings-text{
					font-size: 18px;
					padding-bottom: 0.6rem;
				}
				.greetings-weather{
					font-size: 13px;
					color: var(--t6);
				}  
            }   
      }
      .home-header-todos{
        display: flex;
        div{
          padding: 0 0.6rem;
          .todo-title{
            font-size: 14px;
            padding-bottom: 1rem;
            .el-icon{
              vertical-align: middle;
              padding-right: 0.2rem;
            }
            .span{
              vertical-align: middle;
            }
          }
          .todo-num{
            font-size: 16px;
            font-weight: 700;
            vertical-align: middle;
            padding-left: 1.8rem;
          }
        }
      }
}
</style>