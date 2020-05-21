<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" :current-title-index="currentTitleIndex"/>
      <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages" @detailSwiperImageLoad="detailInfoImageLoad"/>
        <detail-base-info ref="base" :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @detailInfoImageLoad="detailInfoImageLoad"/>
        <detail-param-info ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <detail-recommend-info ref="recommend" :recommend-list="recommendInfo"/>
      </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import DetailNavBar from "./childComs/DetailNavBar";
  import DetailSwiper from "./childComs/DetailSwiper";
  import DetailShopInfo from "./childComs/DetailShopInfo";
  import DetailBaseInfo from "./childComs/DetailBaseInfo";
  import DetailGoodsInfo from "./childComs/DetailGoodsInfo";
  import DetailParamInfo from "./childComs/DetailParamInfo";
  import DetailCommentInfo from "./childComs/DetailCommentInfo";
  import DetailRecommendInfo from "./childComs/DetailRecommendInfo";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "../../network/detail";
  import {debounce} from "../../common/utils";
  import {itemListenerMixin} from  "../../common/mixin";
  export default {
    name: "Detail",
    components:{
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailShopInfo,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo
    },
    data() {
      return {
        iid: null,
        details:null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendInfo:[],
        themeTops: [],
        currentTitleIndex:0
      }
    },
    //这里是我们混入的内容
    mixins:[
      itemListenerMixin
    ],
    // mounted() {
    //   //监听detail-recommend中图片加载
    //   const refresh = debounce(this.$refs.scroll.refresh, 500)
    //   this.$bus.$on('detailItemImageLoad',() => {
    //     refresh()
    //   })
    // },
    created() {
      this.getDetail();
      this.getRecommend();
    },
    updated() {
      this.getOffsetTops()
    },
    methods: {
      contentScroll(position) {
        this.listenScrollTheme(-position.y)
      },
      listenScrollTheme(position){
          if (this.themeTops){
            for (let i=0;i<this.themeTops.length;i++){
              if (position >= this.themeTops[i]  &&  position < this.themeTops[i+1]){
                this.currentTitleIndex = i;
                break;
              }
            }
          }else{
            this.currentTitleIndex = 0
          }
      },
      getOffsetTops(){
        this.themeTops = []
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      titleClick(index) {
        this.currentTitleIndex = index;
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100)
      },
      detailInfoImageLoad() {
        this.$refs.scroll.refresh()
      },
      getDetail() {
        //1.获取iid
        const iid = this.$route.params.iid
        this.iid = iid

        //2.请求数据
        getDetail(this.iid).then(res =>{
          //1.获取请求结果
          const data = res.result

          //2.获取顶部轮播图图片数据
          this.topImages = data.itemInfo.topImages;
          //console.log(this.topImages);

          //3.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          //4.创建店铺信息的对象
          this.shop = new Shop(data.shopInfo);

          //5.获取商品详情信息
          this.detailInfo = data.detailInfo;

          //6.保存商品参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          //7.保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
      },
      getRecommend() {
        getRecommend().then((res,error)=> {
          if (error) return
          this.recommendInfo = res.data.list
          console.log(this.recommendInfo);
        })
      }
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemListener);
    }
  }
</script>

<style scoped>
  #detail {
    /*让详情页覆盖之前的主页的导航 主页要加背景颜色*/
    position: relative;
    background-color: #fff;
    height: 100vh;
    z-index: 1;
  }

  .detail-nav-bar {
    z-index: 9;
    position: relative;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>
