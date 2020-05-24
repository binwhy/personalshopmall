<template>
  <div class="goods-item">
<!--
js 中使用onload
vue 中监听图片加载 用@load
-->
    <img :src="showImage" alt="" @load="imgLoad" @click="itemClick">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default: {}
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad() {
        //默认$bus 是不存在的  我们得在vue原型中定义一个$bus 并赋值一个vue实例
        //参见main.js中

        //当多个组件调用这个组件时 我们会像多个组件发送itemImageLoad事件
        //如果我们只想在对应组件里面监听这个事件 不影响其他组件的监听
        //有两种方法
        //方法一：对不同的组件发送不同的事件 组件直接监听对应的事件就行了
        // if (this.$route.path.indexOf('/home')){
        //   //如果是在home里面的item的就发送给home
        //   this.$bus.$emit('homeItemImageLoad')
        // }else if(this.$route.path.indexOf('/detail')){
        //   //如果是在detail里面的item的就发送给detail
        //   this.$bus.$emit('detailItemImageLoad')
        // }

        //方法二：发射同一个事件
        //当我们离开对应的组件时 取消监听就行了
        //console.log('图片加载完成');
        this.$bus.$emit('itemImageLoad')
      },
      itemClick(){
        if (this.goodsItem.iid){
          this.$router.push('/detail/'+this.goodsItem.iid)
        }
      }
    }
  }
</script>

<style scoped>
  /*父绝对定位 子相对定位*/
  .goods-item {
    padding-bottom: 49px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
