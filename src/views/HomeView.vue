<template>
  <div class="home">
    <el-row :gutter="10">
      <el-col :xl="6" :lg="6" :md="12" :sm="24" :xs="24" v-for="(item, index) in list" :key="index">
        <div class="row-center dashboard-item">
          <div class="row-center" style="width: 90%;">
            <div class="row-center" style="margin-right: 18px; height:100%"><img :src="item.imageUrl"></div>
            <div
              style=" height:100%;  flex-direction: column; display: flex;justify-content: center;align-items: flex-start;">
              <countTo style="height: 30px" :startVal='0' :endVal='item.val' :duration='3000'></countTo>
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-------------------------------------- echart图表 --------------------------------------------->
    <div class="echarts-box">
      <div style="display: flex;justify-content:space-between">
        <div class="chart1"></div>
        <div class="chart2"></div>
      </div>
      <div style="margin-top: 20px;display: flex;justify-content:space-between">
        <div class="chart5"></div>
        <div class="chart4"></div>
        <div class="chart3"></div>
      </div>

    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
import echarts from 'echarts';
export default {
  data() {
    return {

      list: [
        { val: 13594, title: '最高可借金额', color: '#67ca3a', imageUrl: require('@/assets/img/jine.svg') },
        { val: 9833, title: '回报率', color: '#ff6600', imageUrl: require('@/assets/img/huibaolv.svg') },
        { val: 8888, title: '业绩领跑', color: '#f56c6c', imageUrl: require('@/assets/img/yeji.svg') },
        { val: 6666, title: '安稳底薪战队', color: '#409eff', imageUrl: require('@/assets/img/anwen.svg') }
      ]
    }
  },
  components: {
    countTo
  },
  methods: {
    initCharts() {
      this.chart1 = echarts.init(document.querySelector('.chart1'));
      let option1 = {
        title: {
          text: '近年业绩统计',
          left: 'center', // 标题位置，可以是 'left', 'center', 'right' 或具体的像素值/百分比
          top: '15px', // 也可以设置 'top' 来调整垂直位置
        },
        xAxis: {
          type: 'category',
          data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [3820, 3932, 4901, 5934, 6290, 7330, 8320],
            type: 'line',
            smooth: true
          }
        ]
      };
      this.chart1.setOption(option1)


      this.chart2 = echarts.init(document.querySelector('.chart2'))
      let option2 = {
        title: {
          text: '2024月份业绩统计',
          left: 'center', // 标题位置，可以是 'left', 'center', 'right' 或具体的像素值/百分比
          top: '15px'// 也可以设置 'top' 来调整垂直位置
        },

        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'center',
          top: 'bottom'
        },
        series: [
          {
            name: 'Results From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 2735, name: '六月' },
              { value: 2280, name: '五月' },
              { value: 1984, name: '四月' },
              { value: 1300, name: '三月' }
            ]
          }
        ]
      };
      this.chart2.setOption(option2)


      this.chart3 = echarts.init(document.querySelector('.chart3'))
      let option3 = {
        title: {
          text: '主要地区成交量',
          top: '10px',
          left: 'center'
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['广东', '广西']
        },
        series: [
          {
            name: '地区',
            type: 'bar',
            barWidth: 20, // 设置柱状图的宽度
            data: [200, 300],
            itemStyle: {
              color: '#d48265' // 设置柱状图的颜色
            }
          }
        ]
      };
      this.chart3.setOption(option3)

      this.chart4 = echarts.init(document.querySelector('.chart4'))
      let option4 = {
        title: {
          text: '周终审量',
          top: '10px',
          left: 'center'
        },
        grid: {
          bottom: '10%',  // 底边距为容器高度的15%
          containLabel: true  // 包含坐标轴标签在内
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五',]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            barWidth: 20, // 设置柱状图的宽度
            color: '#61a0a8',
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      this.chart4.setOption(option4)

      this.chart5 = echarts.init(document.querySelector('.chart5'))
      let option5 = {
        title: {
          text: '周初审量',
          left: 'center',
          top: '10px',

        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'center',
          top: 'bottom'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 12, name: '周五' },
              { value: 16, name: '周四' },
              { value: 9, name: '周三' },
              { value: 23, name: '周二' },
              { value: 18, name: '周一' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.chart5.setOption(option5)
    }
  },
  mounted() {
    this.initCharts()
  }

}
</script>

<style lang="scss" scoped>
.dashboard-item {
  height: 120px;
  line-height: 30px;
  font-weight: bold;
  background-color: #ffffff;
  border-radius: 5px;

  p {
    height: 30px;
    color: black;
    margin: 0;
  }

  img {
    width: 28px;

  }

}

.echarts-box {
  margin-top: 20px;

  .chart1 {
    background-color: #fff;
    border-radius: 5px;
    width: 64%;
    height: 270px;

  }

  .chart2 {
    background-color: #fff;
    border-radius: 5px;
    width: 34%;
    height: 270px;
  }

  .chart3 {
    background-color: #fff;
    border-radius: 5px;
    height: 170px;
    width: 30%;
  }

  .chart4 {
    background-color: #fff;
    border-radius: 5px;
    height: 170px;
    width: 35%;
  }

  .chart5 {
    background-color: #fff;
    border-radius: 5px;
    height: 170px;
    width: 30%;
  }


  overflow: hidden;
}
</style>
