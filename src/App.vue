<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar

  }
}
</script>

<style>
  /*
  在样式中引用文件时 采用@import '文件路径'
  在js文件中引用时我们使用的是require()
*/
  @import "assets/css/base.css";
</style>
