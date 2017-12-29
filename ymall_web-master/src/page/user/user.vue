<template>
  <div id="user" class="userWrapper">
    <div class="user">
      <div class="u-header" @click="$router.replace('/home')">
        <!--<img class="u-h-logo" src="../../../static/img/logo.png"/>-->
        <h1>YMALL</h1>
      </div>
      <div class="u-mainWrapper">
        <div class="u-main">
          <div class="u-m-header">
            <span class="wissky-user-font">{{titleData.title}}</span>
          </div>
          <div class="u-m-body">
            <router-view :parentData="titleData"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    mixins: [],     //混合
    components: {},//注册组件
    data(){         //数据
        return {
            titleData: {
                title: '',
            }
        };
    },
    computed: {},  //计算属性
    created(){
    },   //创建
    mounted(){
    },   //挂载
    methods: {},   //方法
    watch: {}      //监听
  }
</script>

<style scoped>
  .wissky-user-font {
    color: #324057;
    font-size: x-large;
  }

  #user {
    background-image: url("../../../static/img/background.jpg");
    background-size: cover;
    width: 100%;
    /*height: 660px;*/
  }

  .userWrapper {
    background: #f0f0f2;
    width: 100%;
    height: 100%;
    padding-top: 50px;
  }

  .user {
    width: 75%;
    margin: 0 auto;
    font-size: 12px;
  }

  .user .u-header {
    cursor: pointer;
    margin-left: -140px;
    line-height: 60px;
    height: 50px;
    margin-top: -34px;
  }

  .user .u-header h1 {
    /*font-family: "Comic Sans MS";*/
    display: inline-block;
    vertical-align: text-bottom;
    font-size: 38px;
    color: white;
    opacity: 0.97;
    position: relative;
    top:20px;
  }

  .user .u-header .u-h-logo {
    width: 45px;
    height: 45px;
    margin-right: 2px;
  }

  .user .u-mainWrapper {
    height: auto;
    background: #fff;
    max-width: 82%;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 80px;
    margin-bottom: 80px;
  }

  .user .u-main {
    padding-bottom: 50px;
    padding-top: 20px;
    padding-right: 90px;
    min-height: 280px;
    padding-left: 90px;
  }

  .user .u-main .u-m-header {
    border-bottom: 1px solid #f0ebf0;;
    line-height: 46px;
  }

  .user .u-main .u-m-header span {
    font-weight: bold;
    font-size: 28px;
    line-height: 36px;
    text-align: left;
    padding-bottom: 11px;
    border-bottom: 1px solid #6c799a;
  }

  .user .u-mainWrapper {
    height: auto;
    background-color: rgba(255, 255, 255, 0.95);
    border: 1px solid #ccc;
    border-radius: 40px;
  }

  .user .u-main {
    padding-bottom: 25px;
    padding-top: 50px;
    padding-right: 50px;
    padding-left: 50px;
  }

  .user .u-main .u-m-header {
    padding-left: 10px;
    line-height: 46px;
    width: 90%;
  }

  .user .u-main .u-m-header span {
    font-weight: bold;
    font-size: 28px;
    line-height: 36px;
    text-align: left;
    padding-bottom: 11px;
    border-bottom: 1px solid #6c799a;
  }

  .u-m-body{
    margin-left: 5px;
    margin-top: 12px;
  }
</style>
