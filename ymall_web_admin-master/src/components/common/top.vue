<template>
  <div id="top">
    <el-button type="primary" :style="cssTop" :class="[cssOriginTop]" @click="toTop" v-show="isTopShow">
      <i class="ion ion-arrow-up-a"></i>
    </el-button>
  </div>

</template>
<script>
  export default{
    data(){
      return {
        scroll_top: "",
        cssOriginTop:"btn-top",
      }

    },
    props: {
      cssTop: {},//以行内样式加入到组件中
      scrollTop: {default: 500, type: Number}//回到顶部按钮显示的边界值
    },
    computed: {
      isTopShow: function () {
        return this.scroll_top >= this.scrollTop;
      }
    },
    mounted() {
      window.addEventListener('scroll', this.setScrollTop)
    },
    methods: {
      setScrollTop(){
        this.scroll_top = document.documentElement.scrollTop || document.body.scrollTop;
      },
      toTop(){
        if (this.scroll_top >= this.scrollTop) {
          this.scroll_top = 0;
          document.documentElement.scrollTop = document.body.scrollTop=0;
        }
      }
    },
  }

</script>
<style scoped="">
  .btn-top {
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 50px;
    height: 50px;
  }
</style>
