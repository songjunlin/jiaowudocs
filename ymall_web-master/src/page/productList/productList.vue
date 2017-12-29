<template>
  <div id="productList" class="body">
    <head-top></head-top>
    <div class="crumb">
      <div class="w">
        <div class="crumb-list">
          <router-link class="crumb-item" :to="{ path: 'Home' }">YMALL</router-link>
          <span></span>
          <span class="crumb-item">
                <router-link class="crumb-item" :to="{ path: 'Home' }">商品列表</router-link></span>
        </div>
      </div>
    </div>
    <div class="w">
      <load-list ref="refProductList" :data_list="dataList" class="p-list-con"
                 :total_page="totalPage"
                 @loadData="loadData"
                 mode="pen">
        <template slot="item" slot-scope="product">
          <li class="p-item">
            <div class="p-img-con">
              <router-link class="link" :to="{ path: 'productDetail', query: { id: product.obj.id }}">
                <img class="p-img" alt="APPLE PHONE" :src="product.obj.mainImage"/>
              </router-link>
            </div>
            <div class="p-price-con">
                <span class="p-price">
                  ￥{{product.obj.price}}</span>
            </div>
            <div class="p-name-con">
              <router-link :to="{ path: 'productDetail', query: { id: product.obj.id }}" class="p-name">
                {{product.obj.name}}
              </router-link>
            </div>
          </li>
        </template>
      </load-list>
    </div>
    <foot-guide style=""></foot-guide>
  </div>
</template>

<script>
  import vue from "vue"
  import headTop from "components/header/headTop";//导入组件
  import footGuide from "components/footer/footGuide";
  import loadList from  "components/common/loadList"
  import {getCommodityList} from "service/getData"
  export default {

    //注册组件
    components: {headTop, footGuide, loadList, getCommodityList},
    //数据
    data(){
      return {
        isPersonalShow: false,
        dataList: [],
        productList: [],
        totalPage: 0,
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
    methods: {
      //获取数据
      loadData(myData){
        getCommodityList(Object.assign(myData, {
          keyword: this.$route.query.keyword,
          categoryId: this.$route.query.categoryId,
        })).then(response => {
          this.totalPage = response.data.pageCount;
          this.dataList = response.data.results;
        }, error => {
          this.message.info(error.response.data.content)
        })
      },
    },
    //观测方法
    watch: {
      '$route': function () {//路由变化复用组件
        this.$refs.refProductList.reload();
      }
    },
    beforeRouteEnter (to, from, next) {
      if (to.query.keyword&&to.query.keyword.length <= 0) {
        next(from.fullPath);
      } else {
        next();
      }
    },
  };
</script>

<style scoped>
  .body {
    background-color: #f6f6f6;
    min-width: 1080px;
    font: 12px/1.5 tahoma, arial, Hiragino Sans GB, \\5B8B\4F53, sans-serif;
  }

  .w {
    width: 1080px;
    margin: 0px auto;
    position: relative;
    overflow: hidden;
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

  .crumb .crumb-item {
    color: #888;
    text-decoration: none;
    cursor: pointer;
  }

  .sorter-con .sorter-item {
    float: left;
    display: inline-block;
    position: relative;
    padding: 0 8px;
    height: 23px;
    line-height: 23px;
    margin-right: -1px;
    cursor: pointer;
  }

  li {
    list-style: none;
  }

  .sorter-con .sorter-item .fa-sort-desc {
    position: absolute;
    top: 7px;
    right: 8px;
  }

  .p-list-con {
    margin-top: 15px;
    margin-right: -20px;
    overflow: hidden;
  }

  .p-list-con .p-item {
    position: relative;
    width: 200px;
    padding: 10px;
    margin: 0 20px 20px 0;
    float: left;
    cursor: pointer;
    background: #ffffff;
    transition: box-shadow .5s ease;
  }

  .p-list-con .p-item:hover {
    box-shadow: 0 0 2px 2px #ddd;
  }

  .p-list-con .p-item .p-img-con {
    width: 180px;
    height: 200px;
  }

  .link {
    color: #999;
    text-decoration: none;
    cursor: pointer;
  }

  .p-item .p-img-con .p-img {
    width: 100%;
  }

  img {
    display: block;
    border: none;
  }

  .p-item .p-price-con {
    line-height: 30px;
    height: 30px;
  }

  .p-item .p-price-con .p-price {
    font-size: 16px;
    color: #c60023;
  }

  .p-list-con .p-item .p-name-con {
    height: 40px;
    overflow: hidden;
  }

  .p-list-con .p-item .p-name-con .p-name {
    height: 40px;
    margin-bottom: 10px;
    line-height: 20px;
    color: #666;
    text-decoration: none;
  }

</style>
