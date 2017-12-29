<template>
  <div id="richContent">
    <div v-if="isexpand" style="">
      <div class="RichText" v-html="content"></div>
      <el-row>
        <el-col :span="2" :offset="22">
          <el-button type="text" @click="isexpand=false">收起<i class="el-icon-arrow-up"></i></el-button>
        </el-col>
      </el-row>
    </div>
    <div v-else :style="descStyle">{{ content | descOmit(wordnum)}}<el-button type="text" @click="isexpand=true">显示全部<i class="el-icon-arrow-down"></i></el-button>
    </div>

  </div>
</template>

<script>
  import {descOmit} from "components/filters/filter"
  import "assets/css/RichText.css"
  export default {

    mixins: [],
    components: {},
    props: {content: {required: true}, wordnum: {default: 3},descStyle:{}},
    data(){
      return {
        isexpand:false
      }
    },
    computed: {},
    created(){
    },
    mounted(){

    },
    methods: {},
    watch: {},
    filters: {descOmit}

  }
</script>

<style scoped>
  #richContent .el-button {
    font-size: 13px;
    margin-left: 5px;
  }

  #richContent .el-button i {
    margin-left: 3px;
  }
</style>

