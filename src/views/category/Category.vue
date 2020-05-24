<template>
  <div id="category">
    <nav-bar class="category-bar"><div slot="center">分类</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  export default {
    name: "Category",
    components: {NavBar},
  }
</script>

<style scoped>
  #category {
    height: 100vh; /*这里是设置视口大小*/
    position: relative;
  }

  .category-bar {
    background-color: var(--color-tint);
    color: #ffffff;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
</style>
