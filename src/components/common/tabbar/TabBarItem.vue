<template>
  <div class="tab-bar-item" @click="itemClick">
<!--    在插槽的外部加上div 是为了让插槽继承我们设置的一些属性和样式
  因为我们如果在插槽里面直接定义一些属性和样式 在替换时会覆盖我们设置的样式和属性
-->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      link:String,
      activeColor: {
        type:String,
        default:'red'
      }
    },
    data() {
      return {
        // isActive:true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.link) !== -1
      },
      //v-bind动态绑定style时 可以放到计算属性中
      activeStyle() {
        //判断当前页面时不是处于活跃状态
        //如果是活跃状态 就读取传递的
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.link)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;/*49的高度是移动端固定的导航栏高度*/
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
  }
  .active {
    color: salmon;
  }
</style>
