<template>
  <tab-bar>
    <tab-bar-item link="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item link="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item >
    <tab-bar-item link="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item link="/profile">
      <!--
      这里写图片路径太麻烦
      后面可以给路径起别名解决
      样式中别名 前面需要加上 ~ 这是固定写法，不加就不能识别编译会报错
      -->
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  //这里是使用别名引用的 参数wepack.base.config.js->resolve 中配置的别名
  //没有起别名不能乱写
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
