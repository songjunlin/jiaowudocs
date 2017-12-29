<template>
  <div id="productDetail" class="body">
    <head-top></head-top>
    <div class="crumb">
      <div class="w">
        <div class="crumb-list">
          <a class="crumb-item" href="./index.html">YMALL</a>
          <span></span>
          <span class="crumb-item">商品详情</span>
        </div>
      </div>
    </div>
    <div class="w">
      <div class="intro-wrap clear">
        <div class="p-img-wrap">
          <div class="main-img-con">
            <img class="main-img" :src="showImage"/>
          </div>
          <ul class="p-img-list">
            <li class="p-img-item" v-for="(image,index) in productDetail.subImages">
              <img @mouseover="clickImage(image)" class="p-img" :src="image"/>
            </li>
          </ul>
        </div>
        <div class="p-into-wrap">
          <p class="p-name">
            {{productDetail.name}}
          </p>
          <p class="p-subtitle">{{productDetail.subtitle}}</p>
          <div class="info-item p-price-con">
            <span class="lable">价格</span>
            <span class="p-price">￥{{productDetail.price}}</span>
          </div>
          <div class="info-item p-quantity-con">
            <span class="lable">库存</span>
            <span class="p-price">{{productDetail.stock}}</span>
          </div>
          <div class="info-item">
            <span class="lable">数量</span>
            <el-input-number v-model="count" @change="handleChange"
                             :min="1" :max=productDetail.stock></el-input-number>
          </div>
          <div class="btn_group">
            <a class="shopping">立即购买</a>
            <a class="btn cart-add" @click="addProduct()">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="w">
      <div class="floor-wrap">
        <div class="floor-title"><span class="floor-text">商品详情</span></div>
        <div class="floor-con">
          <div class="RichText" style="width: 750px;margin: 0 auto" v-html="productDetail.detail"></div>
        </div>
      </div>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
  import vue from "vue";
  import headTop from "components/header/headTop";//导入组件
  import footGuide from "components/footer/footGuide";
  import {inputNumber} from "element-ui"
  import {getCommodityDetail} from "service/getData"
  import {mapState, mapMutations, mapActions} from "vuex"
  import "assets/css/RichText.css"
  vue.use(inputNumber);
  export default {

    //注册组件
    components: {
      headTop,
      footGuide,
    },
    //数据
    data(){
      return {
        productDetail: '',
        count: 1,
        showImage: ''
      }
    },
    //组件创建时
    created(){
      getCommodityDetail(this.$route.query.id).then(
        responds => {
          this.productDetail = responds.data
          this.showImage = responds.data.mainImage
        },
        error => {
          console.log(error.response.data.content)
        }
      )
    },
    //数据挂载时
    mounted(){
    },
    //计算属性
    computed: {
      ...mapState(["is_login"])
    },
    //方法
    methods: {
      handleChange(value) {
        console.log(value);
      },
      addProduct(){
        if (this.is_login) {
          this.ADD_CART({productId: this.$route.query.id, count: this.count}).then(() => {
              this.$message.success("添加成功");
              this.$router.push('/cart')
            },
            error => {
              this.$message.info(error.response.data.msg)
            }
          )
        } else {
          this.$message.info("请先登录");
//            this.$router.push({path:'/user/login',query: {redirect: $router.currentRoute.fullPath}});
          this.$router.push({path: "/user/login", query: {redirect: this.$router.currentRoute.fullPath}})
        }

      },
      ...mapActions([
        'ADD_CART',
      ]),
      clickImage(index){
        this.showImage = index;
      }
    },
    //观测方法
    watch: {}
  };
</script>

<style scoped>
  .body {
    background-color: #f6f6f6;
    min-width: 1080px;
    font: 12px/1.5 tahoma, arial, Hiragino Sans GB, \\5B8B\4F53, sans-serif;
    font-style: normal;
    font-variant-ligatures: normal;
    font-variant-caps: normal;
    font-variant-numeric: normal;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1.5;
    font-family: tahoma, arial, "Hiragino Sans GB", "\\5B8B体", sans-serif;
  }

  .crumb {
    margin-bottom: 15px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    background: #eeeeee;
    color: #888;
    border-top: 2px solid #1D8CE0;
  }

  .w {
    width: 1080px;
    margin: 0px auto;
    position: relative;
    overflow: hidden;
  }

  .crumb .crumb-item {
    color: #888;
    text-decoration: none;
    cursor: pointer;
  }

  .intro-wrap .p-img-wrap {
    width: 422px;
    float: left;
  }

  .intro-wrap .main-img-con {
    height: 400px;
    border: 1px solid #ddd;
  }

  .intro-wrap .main-img-con .main-img {
    width: 100%;
    height: 100%;
  }

  img {
    display: block;
    border: none;
  }

  .intro-wrap .p-img-list {
    height: 78px;
    margin-top: 5px;
    margin-right: -10px;
    overflow: hidden;
  }

  .detail-wrap .detail-tab-con .tab-list {
    background: #eee;
    border: 1px solid #ddd;
    border-bottom: 1px solid #c60023;
  }

  .intro-wrap .p-img-list .p-img-item {
    width: 74px;
    height: 74px;
    float: left;
    margin-right: 10px;
    border: 2px solid #eeeeee;
    cursor: pointer;
  }

  li {
    list-style: none;
  }

  .p-img {
    width: 100%;
    height: 100%;
    padding: 2px;
  }

  .p-img:hover {
    padding: 0px;
    border: 2px solid #1D8CE0;
  }

  .p-into-wrap {
    margin-left: 420px;
    padding: 0 15px;
  }

  .p-name {
    font-size: 20px;
    color: #333;
  }

  .p-subtitle {
    color: #c60023;
    line-height: 30px;
    font-size: 15px;
  }

  .p-price-con {
    padding: 10px;
    background: #eeeeee;
    margin-top: 20px;
  }

  .lable {
    display: inline-block;
    width: 50px;
    color: #999999;
  }

  .p-price {
    font-size: 18px;
    color: #c60023;
  }

  .info-item {
    position: relative;
    margin-top: 20px;
    padding: 0 10px;
  }

  .p-count {
    height: 36px;
    line-height: 36px;
    font-size: 15px;
    width: 45px;
    text-align: center;
    outline: none;
    border: 1px solid #aaaaaa;
  }

  .plus {
    top: 0px;
  }

  .p-count-btn.minus {
    bottom: 0px;
  }

  .p-count-btn {
    position: absolute;
    left: 115px;
    display: block;
    width: 20px;
    height: 15px;
    line-height: 15px;
    font-size: 10px;
    text-align: center;
    border: 1px solid #aaaaaa;
    background: #fff;
    cursor: pointer;
  }

  .info-item {
    position: relative;
    margin-top: 20px;
    padding: 0 10px;
  }

  .btn {
    display: inline-block;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    border: none;
    background-color:  #FF0036;
    font-size: 17px;
    /*font-weight: 700;*/
    color: #fff;
    outline: none;
    cursor: pointer;
    text-decoration: none;
  }

  .detail_wrap {
    margin-top: 15px;
    width: 80%;
    text-align: center;
    height: auto;
  }

  .floor-wrap {
    overflow: hidden;
    background-color: white;
  }

  .floor-wrap .floor-title {
    /*font-weight: 900;*/
    height: 50px;
    line-height: 50px;
    color: #1D8CE0;
    font-size: 15px;
    background-color: #eee;
    border-bottom: 1px solid #1D8CE0;
  }

  .floor-text {
    display: inline-block;
    width: 100px;
    background-color: #1D8CE0;
    text-align: center;
    color: #fff;
  }

  .shopping{
    margin-right: 25px;
    cursor: pointer;
    float: left;
    overflow: hidden;
    position: relative;
    width: 125px;
    background-color: #ffeded;
    border: 1px solid #FF0036;
    color: #FF0036;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 16px;
    font-family: 'Microsoft Yahei';
  }

  .btn_group{
    margin-top: 40px;
    margin-left: 20px;
    padding: 0 10px;
  }
</style>
