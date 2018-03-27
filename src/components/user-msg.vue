<template>
  <el-container>
    <el-header>
      <b type="primary" icon="el-icon-menu">用户管理系统</b>
      <el-button id="home-page" type="text"><router-link to="/home">首页</router-link></el-button>
      <el-button id="als-page" type="text" >分析</el-button>
      <el-input class="user-ipt" v-model="uipt" placeholder="输入您的姓名" ></el-input>
      <el-button type="info" icon="el-icon-search" @click="searchUser">搜索</el-button>
      <el-button type="info" icon="el-icon-refresh" @click="refreshUser">刷新</el-button>
    </el-header>
    <el-main>
      <adduser  ref="search"></adduser>
      <analysis v-if="analysisOpen"></analysis>
    </el-main>
  </el-container>

</template>

<script>
import adduser from './adduser'
import analysis from './analysis'
import {Bus} from '../bus.js'
export default {
  name: 'user-msg',
  data () {
    return {
      uipt: '',
      analysisOpen: false
    }
  },
  methods:{
    searchUser(){
      this.$refs.search.searchUserArr(this.uipt);
    },
    refreshUser(){
      this.uipt = '';
      this.$refs.search.refresh();
    }
  },
  computed: {
  },
  mounted () {
    Bus.$on('analysis-open', arg => {
      this.analysisOpen = arg;
      console.log(arg);
    })
  },
  components: {
    adduser,
    analysis
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/base';
  .el-header{
    @extend %el-header;
  }
  .el-main {
    @include el-main;
  }
  body> el-container {@extend %el-container;}
  .user-ipt{
    width: $ipt-width;
  }
  .el-button--text{
    @include button-size;
  }
</style>
