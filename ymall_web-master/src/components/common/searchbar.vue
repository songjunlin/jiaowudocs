<template>

  <el-row>
    <div class="header">
      <div class="w">
        <router-link class="logo" to="/home">YMALL</router-link>
        <div class="search-form">
          <input class="search-input" id="search-input" v-model="keyword"
                 @keyup.13="search()" placeholder="请输入商品名称">
          <button class="search-btn" id="search-btn" @click="search">搜索</button>
        </div>
      </div>
    </div>
  </el-row>


</template>

<script>
  import {trimStr} from "utils/util"
  export default{
    data(){
      return {
        keyword: ''
      }
    },
    methods: {
      search(){
        if (trimStr(this.keyword).length <= 0) {
          this.$message({
            message: '搜索内容不能为空',
            duration: '1800',
            type: 'warning'
          });
          return false;
        }
        this.$router.push({path: 'productList', query: {keyword: trimStr(this.keyword)}})
      }
    }
  }

</script>

<style scoped>
  .logo {
    position: absolute;
    left: 75px;
    top: 32px;
    display: block;
    width: 150px;
    font-size: 36px;
    font-weight: 700;
    color: #1D8CE0;
    text-decoration: none;
    text-align: center;
  }

  .w {
    width: 65%;
    min-width: 900px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .header .search-form {
    padding: 40px 0 30px 250px;
  }

  .search-input {
    width: 550px;
    padding: 10px;
    border: 2px solid #1D8CE0;
    font-size: 15px;
    outline: none;
  }

  .search-btn {
    position: absolute;
    width: 80px;
    height: 41px;
    border: none;
    background-color: #1D8CE0;
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    outline: none;
    cursor: pointer;
  }
</style>
