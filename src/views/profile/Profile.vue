<template>
  <div id="profile">
    <nav-bar class="profile-bar"><div slot="center">我的</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  export default {
    name: "Profile",
    components: {NavBar},
  }
</script>

<style scoped>
  #profile {
    height: 100vh; /*这里是设置视口大小*/
    position: relative;
  }

  .profile-bar {
    background-color: var(--color-tint);
    color: #ffffff;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
</style>
