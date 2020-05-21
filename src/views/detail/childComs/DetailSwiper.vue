<template>
  <swiper class="detail-swiper" v-if="topImages.length">
    <swiper-item class="detail-swiper-item" v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="" @load="detailSwiperImageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      detailSwiperImageLoad() {
        //这样直接发射事件 会发现有几个图片就会发射几个事件
        //其实当我们获取到一张图片的高度后 就可以发射事件 只发射一次就行了
        if(!this.isLoad){
          this.$emit('detailSwiperImageLoad');
          //console.log('homeSwiper 图片加载完成');
          //结束后直接赋值isLoad 为true 下一张图片加载完成后就不会进入了
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper-item {
    text-align: center;
    height: 300px;
  }
</style>
