<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      v-show="isTabFixed"
      @itemClick="tabControlClick"
      class="fixed"
      :titles="['流行','新款','精选']"
      ref="tabControlFixed"
    />
    <scroll
      ref="scroll"
      class="content"
      :data="showGoodsList"
      :probeType="3"
      :pullUpLoad=true
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImgeLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control
        @itemClick="tabControlClick"
        :titles="['流行','新款','精选']"
        ref="tabControl"
      />
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>
<!--
当我们想要监听组件根元素的事件时 需要加修饰符 .native
也可以在外层包一个div
-->
    <back-top class="back-top" @click.native="backTopClick" v-show="showBackTop"/>
  </div>
</template>

<script>
  //引用组件
  import HomeSwiper from "./childComs/HomeSwiper";//轮播图
  import HomeRecommendView from "./childComs/HomeRecommendView";//推荐
  import HomeFeatureView from "./childComs/HomeFeatureView";
  import GoodsList from "components/content/goods/GoodsList";


  import Scroll from 'components/common/scroll/Scroll';//滚动
  import NavBar from "components/common/navbar/NavBar";//导航栏
  import TabControl from "components/content/tabControl/TabControl";//分类
  import BackTop from "components/content/backTop/BackTop";//返回顶部按钮

  import {getHomeMultidata,getHomeData} from 'network/home';
  import {NEW, POP, SELL, BACKTOP_DISTANCE} from "@/common/const";
  import {debounce} from "../../common/utils";
  import {itemListenerMixin} from  "../../common/mixin";

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        keywords: [],
        dKeywords: [],
        goodsList: {
          'pop': {page: 1, list: []},
          'new': {page: 1, list: []},
          'sell': {page: 1, list: []}
        },
        currentType: POP,
        scroll: null,
        showBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY:0
      }
    },
    components: {
      HomeRecommendView,
      HomeSwiper,
      HomeFeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    //这里是我们混入的内容
    mixins:[
      itemListenerMixin
    ],
    computed: {
      showGoodsList() {
        return  this.goodsList[this.currentType].list
      }
    },
    created(){
     this.getHomeMultidata();

     this.getHomeGoods('pop');
     this.getHomeGoods('new');
     this.getHomeGoods('sell');
    },
    mounted() {
      //1.图片加载完成的事件监听
      //这里我们会发现  this.$refs.scroll.refresh() 会调用30次
      //刷新频率太高 对服务器压力太大
      //为了降低服务器压力 我们这里使用防抖函数 降低刷新频率
      //这里传 this.$refs.scroll.refresh 时 不雅加() 不然会报错 发现不了apply
      //这里不传时间 也会生效 因为事件循环 加setTimeout 属于异步操作 js 会把这个操作放到下一次的事件循环中
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // this.$bus.$on('homeItemImageLoad',() => {
      //   refresh()
      //   // console.log('刷新');
      //   //this.$refs.scroll.refresh()
      // })

      //取消监听 后面要跟两个参数 一个是事件 一个是要执行的函数
      //如果只传事件 那么会取消所有监听这个事件的地方 比如我们也在detail里面监听了这个事件
      //这个事件之前叫itemImageLoad home和detail都监听了这个事件
      //后面的要执行的函数 你得建一个变量进行保存this.refresh = refresh
      //this.$bus.$off('homeItemImageLoad',refresh)

      //2.获取tabControl 的offsetTop
      //所有的组件都有一个属性 $el: 用于获取组件中的元素
      //这里拿到的offsetTop的值 是不准确的 因为是在mounted的里面 这时只是挂载了 图片不一定加载出来了
      //所以不能在这里获取offsetTop值 可以监听轮播图的图片加载
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.tabOffsetTop);
      this.swiperImgeLoad()
    },
    updated() {
      //  this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.tabOffsetTop);
    },
    //以前的better-sroll 切换到其他页面再返回 不能记录之前滚动的位置 会有bug
    //最新的没有了 可以不加下面的两个函数的内容activated和deactivated
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      this.$bus.$off('itemImageLoad',this.itemListener);
    },
    methods: {
      swiperImgeLoad() {
        //等homeswiper中的图片加载完成后获取 offsetTop的值
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      tabControlClick(index) {
        switch (index)
        {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        //同步我们两个tabControl的数据
        this.$refs.tabControlFixed.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },
      contentScroll(position) {
        //console.log(position.y);
        // 1.决定backTop是否显示
        this.showBackTop = (-position.y) > BACKTOP_DISTANCE

        // 2.监听我们的滚动位置是否移动到 offsetTop 的位置 tabControl 是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      backTopClick() {
        //这种写法不太好
        //this.$refs.scroll.scroll.scrollTo(0, 0, 300);

        //可以在组件内部定义一个方法 我们这里调用组件内部的方法
        this.$refs.scroll.scrollTo(0, 0)
        //console.log('回到顶部');
      },
      loadMore() {
        //console.log('加载更多');
        this.getHomeGoods(this.currentType)
      },
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;

          this.keywords = res.data.keywords.list;
          this.dKeywords = res.data.dKeyword;
        })
      },
      getHomeGoods(type) {
        getHomeData(type,this.goodsList[type].page).then(res => {
            const currentGoodsList = res.data.list;
            this.goodsList[type].list.push(...currentGoodsList);//... 是一直运算符 结构 多个参数 这样可以保证数组中的原始数据不变
            //console.log(this.goodsList[type].list);
            this.goodsList[type].page += 1
            //请求完数据 得结束本次下拉加载更多的动作 不然下次不能继续下拉
            this.$refs.scroll.finishPullUp()
        })
      }
    },
    destroyed() {
      //这里 因为我们home是在keep-alive中 所以销毁是看不到的
      //我们只能去deactivated 中进行
      console.log('home销毁了');
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh; /*这里是设置视口大小*/
    /*padding-top: 44px;*/
    /*position:relative;*/
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  /*简单吸顶效果实现 不是所有浏览器都支持
    这里已经不生效了
    部分浏览器 不能识别 sticky属性
  */
  .fixed {
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 9;!*不想被覆盖就设置这个属性*!*/

    position: relative;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
  }

  /*.content {*/
  /*  margin-top: 44px;*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/

  /*两种样式写法  子绝对定位 父（home）相对定位*/
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .back-top {
    position: fixed;
    right: 8px;
    bottom: 44px;
  }
</style>
