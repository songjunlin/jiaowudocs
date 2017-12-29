<template>
  <div id="homeWrapper">
    <head-top></head-top>
    <div class="w">
      <left-sidebar></left-sidebar>
      <div class="main-container">
        <banner :listImg="imgArr" :cssBanner="cssBanner"></banner>
      </div>
    </div>
    <commodity-bar></commodity-bar>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import vue from "vue";
  import headTop from "components/header/headTop";//导入组件
  import footGuide from "components/footer/footGuide";
  import banner from './banner.vue';
  import leftSidebar from "./leftSidebar"
  import commodityBar from "./commodityBar"

  export default{

    mixins: [],
    components: {
      leftSidebar,
      commodityBar,
      headTop, footGuide, banner
    },//注册组件
    created(){
    },
    data(){
      return {
        cssBanner: "css-banner",
        imgArr: [
          {url: '../../../static/img/background.jpg'},
          {url: '../../../static/img/background1.jpg'},
          {url: '../../../static/img/background2.jpg'},
          {url: '../../../static/img/background3.jpg'}
        ],
        is_switch: true,
        num: 4,
      }
    },
    methods: {},
    filters: {}

  }
</script>
<style lang="less" scoped>
  @rem: 12rem;

  .css-banner {
    width: 100%;
    height: 300/@rem;
    margin: 0 auto;
    box-shadow: 0 0 5/@rem #ccc;
  }

  .main-container {
    float: left;
    padding: 1px 0;
    width: 830px;
    /*margin-right: 10px;*/
    height: 300px;
    background: #ccc;
    color: #fff;
  }

  #homeWrapper{
    background-color: #f9f9f9;
    /*min-height: 2500px;*/
  }


  .w {
    width: 75%;
    min-width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

</style>
