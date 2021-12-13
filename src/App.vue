<template>
  <!--  头部-->
  <div>
    <Header />
  </div>
  <!--  主体-->
  <div style="display: flex">
  <!--    侧边栏-->
    <side-bar />
    <router-view style="flex: 1"/>
  </div>

</template>

<style>

</style>
<script>
  import Header from "./components/Header";
  import sideBar from "./components/sideBar";

  export default {
    name:"layout",
    components:{
      Header,
      sideBar
    }
  }
</script>
