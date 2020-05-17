<template>
<!--
ref 绑定的是组件对象时 this.$refs 获取的是组件对象
ref 绑定的是普通元素 this.$refs 获取的是元素对象
-->
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType: {
        type: Number,
        default: 1
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      setTimeout(this.initBscroll, 20)
    },
    methods: {
      initBscroll() {
        // 1.初始化BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType: this.probeType,
          click: true,//不设置这个值 那滚动区域的点击事件不会触发
          pullUpLoad: this.pullUpLoad
        })

        // 2.将监听事件回调
        this.scroll.on('scroll',(option) => {
          //console.log(option);
          this.$emit('scroll', option)
        })
        // 3.监听上拉到底部
        this.scroll.on('pullingUp', () => {
          console.log('下拉加载更多');
          this.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>

</style>
