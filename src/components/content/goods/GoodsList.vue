<template>
<!--  <grid-view>-->
<!--      <goods-list-item class="goods-item" v-for="(item,index) in goods" :key="index" :goods-item="item"/>-->
<!--  </grid-view>-->
  <div class="goods">
    <goods-list-item class="goods-item" v-for="(item,index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
  import GridView from "../../common/gridView/GridView";
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components: {
      //GridView,
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;/*设置这个属性就会根据子标签的宽度进行选择显示几个*/
    justify-content: space-around;
    padding: 2px;
  }
</style>
