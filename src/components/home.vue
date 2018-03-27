<template>
  <h1>{{title}}</h1>
</template>

<script>
import home from './home'
export default{
  name:'home',
  data(){
    return {
      title:'首页'
    }
  }
}
</script>

<style lang="scss" scoped>
  h1{
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>
