<template>
  <div class="detail-recommend-info" v-if="recommendList.length">
    <div class="info-header">热门推荐</div>
    <div class="recommend-info">
      <goods-list-item v-for="(item,index) in recommendList" :goodsItem="item" :key="index"/>
    </div>
  </div>
</template>

<script>
  import GoodsListItem from "components/content/goods/GoodsListItem";
  export default {
    name: "DetailRecommendInfo",
    components: {
      GoodsListItem
    },
    props: {
      recommendList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-recommend-info {
    position: relative;
    text-align: center;
    padding: 5px;
  }

  .recommend-info {
    display: flex;
    flex-wrap: wrap;/*设置这个属性就会根据子标签的宽度进行选择显示几个*/
    justify-content: space-around;
  }

  .info-header {
    position: relative;
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
