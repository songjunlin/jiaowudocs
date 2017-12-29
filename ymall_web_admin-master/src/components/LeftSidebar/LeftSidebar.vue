<template>
 <div class="cate-wrap">
   <div class="index-left-block">
     <h2>全部产品</h2>
     <ul v-for="product in productList" >
       <li >
         <a class="cate-link" @click="clicklist(product.id)">{{ product.name }}</a>
       </li>
     </ul>
   </div>
 </div>
</template>
<script>
  import {CommodityCategory} from "service/getData"
  export default {
    created(){
        CommodityCategory({}).then(
            responds=>{
                this.productList=responds.data
            },
          error=>{
                console.log(error.response.data.content)
          }
        )
    },
    data(){
      return {
        cssBanner: "css-banner",
        productList: [
          {}
        ]
      }
    },
    methods: {
      clicklist(aa){
          alert(aa)

      }
    },
    filters: {}


  }
</script>
<style>
  .cate-wrap {
    float: left;
    padding: 10px 0;
    width: 240px;
    margin-right: 10px;
    height: 300px;
    background: #666;
    color: #fff;
  }
  .index-left-block {

  }
  .index-left-block .hr {
    margin-bottom: 20px;
  }
  .index-left-block h2 {
    background:  #c60023;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .cate-link {
    margin-right: 3px;
    color: #fff;
    text-decoration: none;
  }
  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }
  .index-left-block ul {
    padding: 10px 15px;
  }
  .index-left-block li {
    padding: 5px;
  }
</style>
