<template>
  <div id="cart">
    <nav-bar class="cart-nav"><div slot="center">购物车({{length}})</div></nav-bar>
    <cart-list class="cart-list"/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComs/CartList";
  import CartBottomBar from "./childComs/CartBottomBar";

  import {mapGetters} from 'vuex'


  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //两种语法
      //语法一 数组形式 直接用getters里面定义的名字
      // ...mapGetters([
      //   'cartListLength'
      // ])
      //语法二 对象形式 自定义名字
      //上面用的就是我们定义的名字
      ...mapGetters({
        length:'cartListLength'
      })
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh; /*这里是设置视口大小*/
    position: relative;
  }

  .cart-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }


</style>
