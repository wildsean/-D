<template>
<div class="block-two">
  <el-row>
    <el-col :span="24">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">性别分析</el-menu-item>
        <el-menu-item index="2">年龄分析</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  <div id="main"></div>
</div>
</template>

<script>
  import {Bus} from '../bus.js'
export default {
  name: 'analysis',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '2',
      myChart: {},
      mansArr: [],
      sexArr: ['男生','女生'],
      ageArr: [],
      tableData: [],
      sexOption: {
        title: {
          text: '性别分析'
        },
        tooltip: {},
        legend: {
          data: ['人数']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          itemStyle:{
            normal:{
              color: '#66d1fb'
            }
          },
          data: []
        }]
      },
      ageOption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c}个<br/>({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data:['0-10','11-18','18-29','30-40','40-60','>60']
        },
        series: [
          {
            name: '年龄',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 0, name: '0-10'},
              {value: 0, name: '11-18'},
              {value: 0, name: '18-29'},
              {value: 0, name: '30-40'},
              {value: 0, name: '40-60'},
              {value: 0, name:  '>60'}
            ]
          }
        ]
      }
    }
  },
  created () {
    console.log (typeof  Bus );
    Bus.$on('add-tableData', arg => {
      console.log(arg  + '这是打他');
      this.tableData = arg ;

      this.myChart = this.$echarts.init(document.getElementById('main'));
      this.sexOption.xAxis.data = this.sexArr;
      this.sexOption.series[0].data = this.mansArr;
      console.log(this.sexOption.series[0].data);
      this.myChart.setOption(this.sexOption);
    })
  },
  mounted () {
    var mans = this.tableData.filter(item => item.sex === 1).length;
    var womans = this.tableData.length - mans;
    console.log(this.tableData);
    this.mansArr.push(mans,womans);

    // this.myChart = this.$echarts.init(document.getElementById('main'));
    // this.sexOption.xAxis.data = this.sexArr;
    // this.sexOption.series[0].data = this.mansArr;
    // console.log(this.sexOption.series[0].data);
    // this.myChart.setOption(this.sexOption);

    console.log(this.ageArr);
    console.log(this.ageOption.series[0].data);
    // this.ageOption.series[0].data.value = this.ageArr;
    this.getSexcount;
    this.getAgecount;
  },
  methods: {
    handleSelect (key, keyPath) {
      this.myChart.setOption(key === "1" ? this.sexOption : this.ageOption ,true);
      console.log(typeof (key))
    }
  },
  computed: {
    getSexcount() {
      var _this = this;
      // this.myChart = this.$echarts.init(document.getElementById('main'));
      // this.sexOption.xAxis.data = this.sexArr;
      // this.sexOption.series[0].data = this.mansArr;
      // console.log(this.sexOption.series[0].data);
      // this.myChart.setOption(this.sexOption);
    },
    getAgecount() {
      var item = this.ageOption.series[0].data;
      this.tableData.forEach(function (value) {
        var vage = Number(value.age);
        if (0 <= vage && vage <= 10) {
          return item[0].value++;
        } else if (11 <= vage && vage <= 18) {
          return item[1].value++;
        } else if (19 <= vage && vage <= 29) {
          return item[2].value++;
        } else if (30 <= vage && vage <= 40) {
          return item[3].value++;
        } else if (40 <= vage && vage <= 60) {
          return item[4].value++;
        } else if (60 <= vage) {
          return item[5].value++;
        }
      }, this);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/base";
.block-two{
  @include el-main-block;
  margin-top: 30px;
}
#main{
  height: 400px;
  margin: 20px auto;
}
</style>
