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
      <detail-bottom-bar @addToCart="addToCart"/>
      <back-top class="back-top" @click.native="backTopClick" v-show="showBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComs/DetailNavBar";
  import DetailSwiper from "./childComs/DetailSwiper";
  import DetailShopInfo from "./childComs/DetailShopInfo";
  import DetailBaseInfo from "./childComs/DetailBaseInfo";
  import DetailGoodsInfo from "./childComs/DetailGoodsInfo";
  import DetailParamInfo from "./childComs/DetailParamInfo";
  import DetailCommentInfo from "./childComs/DetailCommentInfo";
  import DetailRecommendInfo from "./childComs/DetailRecommendInfo";
  import DetailBottomBar from "./childComs/DetailBottomBar";

  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from "components/content/backTop/BackTop";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "../../network/detail";
  import {debounce} from "../../common/utils";
  import {itemListenerMixin,backTopMixin} from  "../../common/mixin";
  import {BACKTOP_DISTANCE} from "@/common/const";

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
      DetailRecommendInfo,
      DetailBottomBar,
      BackTop
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
        currentTitleIndex:0,
        message: '',
        isShow:false
      }
    },
    //这里是我们混入的内容
    mixins:[
      itemListenerMixin,
      backTopMixin
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
      addToCart() {
        //1.获取购物车商品需要展示的信息
        // 1.1创建对象
        const product = {}
        // 1.2对象信息
        product.iid = this.iid;
        product.img = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.newPrice = this.goods.nowPrice;

        //2.加入购物车
        //this.$store.commit('addCart',product);
        this.$store.dispatch('addCart',product).then(res=>{
          this.$toast.showMessage(res)
        })
      },
      contentScroll(position) {
        // 1.决定backTop是否显示
        this.showBackTop = (-position.y) > BACKTOP_DISTANCE
        // 2.监听我们的滚动位置是否移动到 对应主题的offsetTop 的位置
        this.listenScrollTheme(-position.y)
      },
      listenScrollTheme(position){
          if (this.themeTops){
            for (let i=0;i<this.themeTops.length;i++){
              if (this.currentTitleIndex !== i  &&  position >= this.themeTops[i]  &&  position < this.themeTops[i+1]){
                this.currentTitleIndex = i;
                break;
              }
            }
          }else{
            this.currentTitleIndex = 0
          }
      },
      getOffsetTops(){
        //因为我们是在updated里面调用的 所以每次数据更新时 你得先赋值为空 再重新拿到offsetTop
        //不然会每次数据更新时都会往里面塞数据
        this.themeTops = []
        this.themeTops.push(0)
        //this.themeTops.push(this.$refs.base.$el.offsetTop)
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

          //这里也是不行的 因为这里只是监听dom挂载完成了，图片的加载是否完成是不知道
          // this.$nextTick(() => {
          //   this.themeTops = []
          //   this.themeTops.push(this.$refs.base.$el.offsetTop)
          //   this.themeTops.push(this.$refs.param.$el.offsetTop)
          //   this.themeTops.push(this.$refs.comment.$el.offsetTop)
          //   this.themeTops.push(this.$refs.recommend.$el.offsetTop)
          //   this.themeTops.push(Number.MAX_VALUE)
          // })

          //如果非要在这里那我们使用防抖
          //定义个变量getOffsetTops 在别处调用即可
          // this.getOffsetTops = debounce(()=>{
          //     this.themeTops = []
          //     this.themeTops.push(0)
          //     this.themeTops.push(this.$refs.param.$el.offsetTop)
          //     this.themeTops.push(this.$refs.comment.$el.offsetTop)
          //     this.themeTops.push(this.$refs.recommend.$el.offsetTop)
          //     this.themeTops.push(Number.MAX_VALUE)
          // },50)
        })
      },
      getRecommend() {
        getRecommend().then((res,error)=> {
          if (error) return
          this.recommendInfo = res.data.list
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

  .back-top {
    position: fixed;
    right: 8px;
    bottom: 54px;
  }
</style>
