<template>
  <div class="headerWrapper">
    <div id="header" class="header">
      <div class="w">
        <router-link class="cart_link"
                     :to="{ path: '/cart' }"><i class="ion-android-cart"></i>
          购物车
          <span v-if="cart!=null&&cart.productTotal!=null">
            ({{cart.productTotal}})
          </span>
        </router-link>
        <div class="h-right">
          <ul>
            <li>
              <router-link :to="{ path: '/home' }">首页</router-link>
            </li>
            <li v-if="userInfo!=null">
              <router-link :to="{ path: '/my' }">个人中心</router-link>
              <span @click="logOut" class="logout">注销<i class="ion-reply"></i></span>
            </li>
            <li class="auth" v-else>
              <router-link class="login"
                           :to="{path:'/user/login',query: {redirect: $router.currentRoute.fullPath}}">登录
              </router-link> |
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
  import  Searchbar from "components/common/searchbar"
  Vue.use(input)
  export default {
    components: {Searchbar},
    data(){
      return {
        isPersonalShow: false
      }

    },
    computed: {
      ...mapState(["userInfo", "cart"]),
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
    background-color: #eee;
    color: #8f8f8f;
    margin: 0 auto;
  }

  .w {
    width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    line-height: 26px;
  }

  .header a {
    color: #000000;
    text-decoration: none;
  }

  .h-right {
    /*float: right;*/
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
    margin-left: 25px;
  }

  .h-right .login span {
    cursor: pointer;
    margin-left: 5px;
  }

  .backgroudback {
    background-color: #f8f7ff;
  }

  .router-link-active {
    border-bottom: 1px solid #1D8CE0;
  }

  .auth .register {
    color: #000000;
  }

  .cart_link {
    color: #999;
    font-size: 13px;
    font-family: "Kaiti SC";
    float: right;
  }

  .cart_link:hover {
    color: #1D8CE0;
  }

  .logout {
    margin-left: 10px;
    cursor: pointer
  }

</style>
