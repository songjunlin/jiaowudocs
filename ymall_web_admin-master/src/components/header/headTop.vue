<template>
  <div class="headerWrapper">
    <div id="header" class="header">
      <div class="w">
        <div class="h-right">
          <ul>
            <li><a href="/home">首页</a></li>
            <li class="logout" v-if="userInfo!=null">
              <span @click="$router.push('/my')">个人中心</span>
              <span @click="logOut"> 注 销 </span>
            </li>
            <li class="auth" v-else>
              <router-link class="login" to="/user/login">登录</router-link>
              <router-link class="register" to="/user/reg">注册</router-link>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <div>
    </div>
    <div class="backgroudback">
      <Searchbar></Searchbar>
    </div>

  </div>
</template>

<script>
  import Vue from "vue";
  import {input} from 'element-ui'
  import {mapActions, mapState} from 'vuex';
  import  Searchbar from "components/assembly/Searchbar"
  Vue.use(input)
  export default {
    components:{
        Searchbar
      },
    data(){
      return {
        isPersonalShow: false
      }

    },
    computed: {
      ...mapState(["userInfo"]),
    },
    methods: {
      ...mapActions([
        'ACTION_USER_LOGOUT'
      ]),
      logOut(){
        this.ACTION_USER_LOGOUT();
      },
    }
  };
</script>

<style scoped>
  .headerWrapper {
    width: 100%;
    background-color: #fcfcff;
  }

  #header {
    width: 100%;

    font-size: 16px;
    background-color: #c4c4c4;
    color: #8f8f8f;
    margin: 0 auto;
  }
  .w {
    width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  .h-left {
    float: left;

  }

  .header a {
    color: #000000;
    text-decoration: none;
  }

  .h-l-logo {
    width: 26px;
    vertical-align: middle;
    height: 26px;
  }

  .h-l-logo-text {
    font-size: 22px;
    font-family: "Comic Sans MS";
  }

  .h-right {
    float: right;
    font-size: 14px;
    line-height: 26px;
  }

  .h-right .h-r-personalHide {
    margin-top: 10px;
    position: absolute;
    background: #39393b;
    line-height: 33px;
    text-align: center;
    width: 70px;
  }

  .h-right ul.h-r-personalHide > li {
    border-bottom: 1px solid #fff;
  }

  .h-right div.h-r-searchWrapper {
    float: right;
    margin-left: 20px;
    width: 180px;
    position: relative;
  }

  .h-right div.h-r-searchWrapper i {
    position: absolute;
    width: 26px;
    line-height: 26px;
    cursor: pointer;
    height: 100%;
    right: 0;
    top: 0;
    text-align: center;
    color: #bfcbd9;
    transition: all .3s;
  }

  .h-right .h-r-search {
    padding-right: 35px;
    background-color: #fff;
    background-image: none;
    border-radius: 15px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: block;
    font-size: inherit;
    height: 26px;
    line-height: 1;
    outline: none;
    padding: 3px 10px;
    width: 100%;
  }

  .h-right > ul {
    list-style: none;
    float: left;
  }

  .h-right > ul > li {
    float: left;
  }

  .h-right > ul > li + li {
    margin-left: 20px;
  }

  .h-right .logout,
  /*.h-right .login {*/
    /*float: left;*/
    /*margin-left: 20px;*/
  /*}*/

  .h-right .logout span,
  .h-right .login span {
    cursor: pointer;
    margin-left: 5px;
  }
.backgroudback{
  background-color: #f8f7ff;
}
  .router-link-active {
    border-bottom: 3px solid #42b983
  }


  .auth a{
    height: 52/@rem;
    display: inline-flex;
  }
  .auth .login:after{
    content: "\B7";
    margin: 0 7/@rem;
  }
  .auth .register {
    color: #000000;
  }
</style>
