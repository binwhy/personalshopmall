<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default: []
      }
    },
    methods: {
      stopTimer() {
        this.$refs.swiper.stopTimer()
      },
      startTimer() {
        if (this.$refs.swiper) {
          this.$refs.swiper.startTimer()
        }
      },
      swiperImageLoad() {
        //这样直接发射事件 会发现有几个图片就会发射几个事件
        //其实当我们获取到一张图片的高度后 就可以发射事件 只发射一次就行了
        if(!this.isLoad){
          this.$emit('swiperImageLoad');
          //console.log('homeSwiper 图片加载完成');
          //结束后直接赋值isLoad 为true 下一张图片加载完成后就不会进入了
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
