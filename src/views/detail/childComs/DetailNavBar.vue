<template>
  <nav-bar class="nav-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center"  class="title">
      <span
        v-for="(item,index) in titles"
        :key="index"
        class="title-item"
        @click="titleItemClick(index)"
        :class="{active:currentTitleIndex===index}"
      >
        {{item}}
      </span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    props:{
      titles: {
        type:Array,
        default() {
          return ['商品','参数','评价','推荐']
        }
      },
      currentTitleIndex:{
        type: Number,
        default: 0
      }
    },
    methods: {
      titleItemClick(index){
        // this.currentTitleIndex = index;
        this.$emit('titleClick',index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .nav-bar{
    text-align: center;
    font-size: 13px;
  }
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    margin-top: 8px;
  }
</style>
