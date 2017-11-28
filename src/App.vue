<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>  
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
  body {
    background-image: url('./assets/bg1.jpg');
    background-size: cover;
    height: 100%;
    width: 100%;
  }
</style>
