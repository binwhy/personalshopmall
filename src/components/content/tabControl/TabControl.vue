<template>
  <div class="tab-control">
    <div class="tab-control-item"
         :class="{active:currentIndex === index}"
         @click="itemClick(index)"
         v-for="(item,index) in titles" :key="index">
    <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        //发出一个事件 让父组件知道点击了哪个
        this.$emit('itemClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    background-color: #ffffff;
    text-align: center;
    font-size: 15px;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
