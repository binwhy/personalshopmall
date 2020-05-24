<template>
    <scroll
      :probeType="3"
      class="content"
      ref="scroll">
      <cart-list-item
        v-for="(item,index) in cartList"
        :key="index"
        :shop-info="item"/>
    </scroll>
</template>

<script>

  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  import {mapGetters} from "vuex";

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      //当我们每次进入时都要刷新下scroll的可滚动区域
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .content{
    height: calc(100% -44px -40px);
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
