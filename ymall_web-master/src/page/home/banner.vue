<template>
  <div class="swiper-container" :class="cssBanner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in listImg" :style="{ backgroundImage: 'url(' + item.url + ')' }"></div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
    <div class="swiper-button-prev swiper-button-white"></div>
    <div class="swiper-button-next swiper-button-white"></div>
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    props: {
        listImg:{require:true},//图片对象
        cssBanner:{default:"css-banner"}//轮播图样式
    },
    mounted() {
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        //back go
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

        // 如果需要滚动条
        scrollbar: '.swiper-scrollbar',
        loop: true,
        speed: 600,
        autoplay: 4000,
      });
    }
  }
</script>

<style scoped lang="less" >
  @rem:12rem;
  .swiper-container {
    width: 100%;
    height:300/@rem;

  }
  .css-banner{
  }
    .swiper-wrapper {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 100%;
    }
   .swiper-slide img {
    width: 100%;
    height: 100%;
  }
    .swiper-pagination-bullet {
      width:0.833rem;
      height: 0.833rem;
      display: inline-block;
      background: #7c5e53;
    }
  .swiper-button-black{
    opacity:0.3;
  }
</style>
