<template>
  <div id="">
    <head-top></head-top>
    <router-view></router-view>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import headTop from "components/header/headTop";//导入组件
  import footGuide from "components/footer/footGuide";
  export default {

    //注册组件
    components: {
      headTop,
      footGuide
    },
    //数据
    data(){
      return {

      }
    },
    //组件创建时
    created(){
    },
    //数据挂载时
    mounted(){
    },
    //计算属性
    computed: {},
    //方法
    methods: {},
    //观测方法
    watch: {}
  };
</script>

<style scoped>

</style>
