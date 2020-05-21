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
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
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

        // 2.将监听事件回调 监听滚动的位置
        this.scroll.on('scroll',(position) => {
          //console.log(option);
          this.$emit('scroll', position)
        })

        // 3.监听上拉到底部
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
          //console.log('下拉加载更多');
          //this.scroll.finishPullUp()
        })
      },
      scrollTo(x,y,time=300) {
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.refresh && this.scroll.finishPullUp()
      },
      refresh() {
        //当我们图片加载的慢时 better-scroll 给我们计算出可滚动的区域会比实际加载完图片后可加载的区域要小
        //这时就会出现一个bug 当图片显示出来后 部分区域不可滚动
        //所以我们要监听我们请求的数据是否已经加载完毕 加载完成后需要手动刷新下better-scroll 重新计算出可滚动的区域大小
        //调用scroll.refresh()
        //console.log('better-scroll刷新');
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll?this.scroll.y:0
      }
    },
    watch: {
      //watch 就可以监听数据变化 我们把在home中请求到的数据传进来 进行监听
      data() {
        setTimeout(this.refresh, 20)
      }
    }
  }
</script>

<style scoped>

</style>
