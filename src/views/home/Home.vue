<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll
      ref="scroll"
      class="content"
      :probeType=3
      :pullUpLoad=true
      @scroll="contentScroll"
    >
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control @itemClick="tabControlClick" class="tab-control" :titles="['流行','新款','精选']"/>
      <goods-list :goods="showGoodList"></goods-list>
    </scroll>
<!--
当我们想要监听组件根元素的事件时 需要加修饰符 .native
也可以在外层包一个div
-->
    <back-top @click.native="backTopClick"/>
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
        scroll: null
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
    computed: {
      showGoodList() {
        return  this.goodsList[this.currentType].list
      }
    },
    created() {
     this.getHomeMultidata();

     this.getHomeGoods('pop');
     this.getHomeGoods('new');
     this.getHomeGoods('sell');
    },
    methods: {
      contentScroll(scroll) {
        console.log(scroll);
      },
      backTopClick() {
        this.$refs.scroll._data.scroll.scrollTo(0, 0, 300);
        console.log('回到顶部');
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
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position:relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  /*简单吸顶效果实现 不是所有浏览器都支持*/
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;/*不想被覆盖就设置这个属性*/
  }

  .content {
    position: absolute;
    margin-top: 44px;
    height: calc(100% - 93px);
    /*overflow: hidden;*/
  }
</style>
