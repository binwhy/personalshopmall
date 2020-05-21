<template>
  <div class="recommend-item">
    <!--
    js 中使用onload
    vue 中监听图片加载 用@load
    -->
    <img :src="recommendItem.image" alt="" @load="imgLoad" @click="itemClick">
    <div class="recommend-info">
      <p>{{recommendItem.title}}</p>
      <span class="price">{{recommendItem.price}}</span>
      <span class="collect">{{recommendItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailRecommendItem",
    props: {
      recommendItem: {
        type: Object,
        default: {}
      }
    },
    methods: {
      imgLoad() {
        //默认$bus 是不存在的  我们得在vue原型中定义一个$bus 并赋值一个vue实例
        //参见main.js中
        // this.$bus.$emit('itemImageLoad')
        //console.log('图片加载完成');
      },
      itemClick(){
        // this.$router.push('/detail/'+this.goodsItem.iid)
        // console.log('googsitem clidk');
      }
    }
  }
</script>

<style scoped>
  /*父绝对定位 子相对定位*/
  .recommend-item {
    padding-bottom: 49px;
    position: relative;
    width: 48%;
  }

  .recommend-item img {
    width: 100%;
  }

  .recommend-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .recommend-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .recommend-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .recommend-info .collect {
    position: relative;
  }

  .recommend-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
