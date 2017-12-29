<template>
  <div id="CommodityBar" class="w" v-if="isShow">
    <div class="floor-wrap">
      <h1 class="floor-title">F1家用电器</h1>
      <ul class="floor-con">
        <li class="floor-item" v-for="(item,index) in list1" :key="item.id" >
          <router-link :to="{ path: 'productList', query: { categoryId: item.id }}">
              <span class="floor-text">{{item.name}}</span>
              <img class="floor-img" :src="item.categoryImage | defaultImg"/>
            </router-link>


        </li>
      </ul>
    </div>
    <div class="floor-wrap">
      <h1 class="floor-title">F2数码3c</h1>
      <ul class="floor-con">
        <li class="floor-item" v-for="(item,index) in list2" :key="item.id" >
          <router-link :to="{ path: 'productList', query: { categoryId: item.id }}">
            <span class="floor-text">{{item.name}}</span>
            <img class="floor-img" :src="item.categoryImage | defaultImg"/>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="floor-wrap">
      <h1 class="floor-title">F3服装箱包</h1>
      <ul class="floor-con">
        <li class="floor-item" v-for="(item,index) in list3" :key="item.id" >
          <router-link :to="{ path: 'productList', query: { categoryId: item.id }}">
            <span class="floor-text">{{item.name}}</span>
            <img class="floor-img" :src="item.categoryImage | defaultImg"/>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="floor-wrap">
      <h1 class="floor-title">F4食品生鲜</h1>
      <ul class="floor-con">
        <li class="floor-item" v-for="(item,index) in list4" :key="item.id" >
          <router-link :to="{ path: 'productList', query: { categoryId: item.id }}">
            <span class="floor-text">{{item.name}}</span>
            <img class="floor-img" :src="item.categoryImage | defaultImg"/>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="floor-wrap">
      <h1 class="floor-title">F5酒水饮料</h1>
      <ul class="floor-con">
        <li class="floor-item" v-for="(item,index) in list5" :key="item.id" >
          <router-link :to="{ path: 'productList', query: { categoryId: item.id }}">
            <span class="floor-text">{{item.name}}</span>
            <img class="floor-img" :src="item.categoryImage | defaultImg"/>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import {input} from 'element-ui'
  import {CommodityCategory} from "service/getData"
  Vue.use(input)
  export default {

    //注册组件
    components: {

    },
    //数据
    data(){
      return {
        isPersonalShow: false,
        isShow:false,
        list1:[

        ],
        list2:[

        ],
        list3:[

        ],
        list4:[

        ],
        list5:[

        ],
        }
    },
    //组件创建时
    created(){
      CommodityCategory({parentId:100001}).then(
        responds=>{
          this.list1=responds.data
        },
        error=>{
          console.log(error.response.data.content)
        }
      ),
        CommodityCategory({parentId:100002}).then(
          responds=>{
            this.list2=responds.data
          },
          error=>{
            console.log(error.response.data.content)
          }
        ),
        CommodityCategory({parentId:100003}).then(
          responds=>{
            this.list3=responds.data
          },
          error=>{
            console.log(error.response.data.content)
          }
        ),
        CommodityCategory({parentId:100004}).then(
          responds=>{
            this.list4=responds.data
          },
          error=>{
            console.log(error.response.data.content)
          }
        ),
        CommodityCategory({parentId:100005}).then(
          responds=>{
            this.list5=responds.data
            this.isShow=true
          },
          error=>{
            console.log(error.response.data.content)
          }
        )

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
  .w {
    /*width: 76%;*/
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  .floor-wrap {
    overflow: hidden;
  }
  .floor-wrap .floor-title {
    height: 50px;
    line-height: 50px;
    color: #d58717;
    font-weight: 400;
    font-size: 20px;
    border-bottom: 1px solid #d58717;
  }
  .floor-wrap .floor-con {
    margin-right: -20px;
  }
  .floor-item {
    position: relative;
    width: 200px;
    height: 220px;
    margin: 15px 20px 15px 0;
    float: left;
    cursor: pointer;
    background: #fff;
    transition: box-shadow .5s ease;
  }
  .floor-text {
    position: absolute;
    top: 12px;
    left: 20px;
    font-size: 16px;
    color: #5e5e5e;
  }
  .floor-img {
    position: absolute;
    right: 15px;
    bottom: 10px;
    width: 80%;
    height: 75%;
    border: none;
    cursor: pointer;
  }
</style>
