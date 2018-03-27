<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/user">Go</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '用户中心请登陆'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    width: 100%;
    text-align: center;
    vertical-align: top;
    margin-top: 300px;
  }

</style>
