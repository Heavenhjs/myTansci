<template>
  <div class="home">
    <el-card shadow="hover">
      <!-- <el-button @click="tiaoshi">调试</el-button> -->
      <div class="home-header">
        <div class="home-header-greetings">
          <div class="greetings-text">
            您好，祝您新的一天工作愉快。
          </div>
          <div class="greetings-weather">
            {{ state.city.name }} 天气：{{ state.city.weather }}，{{ state.city.temperature }}° 
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
                style="vertical-align: middle;"
                class="todo-icon"
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
      <div class="home-main-card">
        <el-card
          v-for="(card,index) in state.cards"
          :key="index"
          shadow="hover"
          :style="{flex: 1, padding: '2rem 0', marginLeft: index==0?'0':'0.5rem'}"
        >
          <div class="main-card-value">
            <el-icon
              :color="card.color"
              style="vertical-align: middle;"
            >
              <component :is="card.icon" />
            </el-icon>
            <span class="card-value-ratio"> {{ card.ratio }}%</span>
          </div>
          <div class="main-card-text">
            {{ card.name }}
          </div>
        </el-card>
      </div>
      <div class="home-main-chart">
        <div class="chart-left">
          <el-card shadow="hover">
            <div
              id="myColumnar"
              style="height:500px;"
            />
          </el-card>
        </div>
        <div class="chart-right">
          <el-card shadow="hover">
            <div
              id="myPie"
              style="height:500px;"
            />
          </el-card>
        </div>
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
type Card={
  name: string;
  total: number;
  ratio: number;
  icon: string;
  color: string;
}

interface State{
    city:{id: string;
    name: string;
    weather: string;
    temperature: number;};
    todoList: Array<ToDoItem>;
    cards: Array<Card>;
}

const state: State = reactive({
    city:{id: "cityid",
    name: "cityname",
    weather: "weather",
    temperature: 0,},
    todoList: [],
    cards: [],
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
    });
    // 每半小时（1800毫秒）更新一次天气情况
  //   setInterval(()=>{
  //   getWeather(state.city.id).then((res) =>{
  //       state.city.temperature = res.data.result.now.feels_like;
  //       state.city.weather = res.data.result.now.text;
  //   })
  // },1800000);
    });
});

onMounted(() => {
  onTodoList();
  onCard();
  onColumnar();
  onPie();
  // 每半小时（1800毫秒）更新一次天气情况
});

const onTodoList = () =>{
  state.todoList = [
      {name:'待办事项',total:100,untreated:28,icon:'Bell',color:'#f56c6c'},
			{name:'待办事项',total:84,untreated:78,icon:'ChatDotSquare',color:'#0084ff'},
			{name:'待办事项',total:25,untreated:21,icon:'Warning',color:'#63ba4d'},
			{name:'待办事项',total:12,untreated:5,icon:'Edit',color:'#006000'},];
}

const onCard = () =>{
  state.cards = [
      {name:'指标一',total:1542,ratio:98,icon:'AddLocation',color:'#006000'},
			{name:'指标二',total:542,ratio:88,icon:'Coin',color:'#f56c6c'},
			{name:'指标三',total:8562,ratio:86,icon:'Collection',color:'#0084ff'},
			{name:'指标四',total:1458,ratio:54,icon:'HelpFilled',color:'#63ba4d'},
			{name:'指标五',total:2561,ratio:90,icon:'Histogram',color:'#67C23A'},
			{name:'指标六',total:5782,ratio:87,icon:'Microphone',color:'#E6A23C'},
  ]

}

const onColumnar = () =>{
		let myColumnar = echarts.init(document.getElementById("myColumnar") as any);
		myColumnar.setOption({
			legend: {},
			tooltip: {},
			color: ['#bdc3c7', '#2c3e50', '#242e42'],
			dataset: {
				dimensions: ['product', '2021', '2020', '2019'],
				source: [
					['1月', 43.3, 85.8, 93.7 ],
					['2月', 83.1, 73.4, 55.1 ],
					['3月', 86.4, 65.2, 82.5 ],
					['4月', 73.4, 53.9, 39.1 ],
					['5月', 71.4, 53.9, 69.1 ],
					['6月', 70.4, 53.9, 49.1 ],
					['7月', 67.4, 53.9, 79.1 ],
					['8月', 68.4, 58.9, 65.1 ],
					['9月', 69.4, 61.9, 53.1 ],
					['10月', 58.4, 75.9, 59.1 ],
					['11月', 43.4, 45.9, 71.1 ],
					['12月', 82.4, 65.9, 49.1 ],
				]
			},
			xAxis: { 
				type: 'category',
				axisTick: {
					show: false // 不显示坐标轴刻度线
				},
			},
			yAxis: {
				show: true, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
				axisTick: {
					show: false // 不显示坐标轴刻度线
				},
				axisLine: {
					show: false // 不显示坐标轴线
				},
				splitLine: {
					show: true // 不显示网格线
				},
			},
			series: [
				{type: 'bar'}, 
				{type: 'bar'}, 
				{type: 'bar'}
			]
		});
		window.onresize = function () {
			myColumnar.resize();
		};
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
            .todo-icon{
            }
            span{
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
  .home-main{
    .home-main-card{
        width:100%;
        height: 150px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				text-align: center;
				padding: 0.3rem 0;
				.main-card-value{
					font-size: 20px;
					font-weight: 700;
					.card-value-num{
						padding: 0 0.4rem;
						vertical-align: middle;
					}
					.card-value-ratio{
						vertical-align: middle;
					}
				}
        .main-card-text{
					font-size: 14px;
					padding-top: 0.4rem;
					color: var(--t6);
				}
      }
      .home-main-chart{
        width:100%;
				display: flex;
        flex-wrap: wrap;
				.chart-left{
					width:70%;
				}
				.chart-right{
					width: 30%;
				}
			}
  }
}
</style>