<template>
  <div id="table_test">
    <!--头部-->
    <el-row>
      <div>
        <el-input v-model="aaa"></el-input>
        keyword:
        <el-input v-model="params.keyword"></el-input>
        productId:
        <el-input v-model="params.productId"></el-input>
        <el-button @click="init()">查询</el-button>
      </div>
    </el-row>
    <!--table-->
    <el-row></el-row>
    <!--底部加载-->
    <el-row>
      <div class="load-more">
        <el-pagination style="text-align: center"
                       layout="prev, pager, next"
                       :current-page="currentPage" :page-count="pageCount"
                       @current-change="toPage"></el-pagination>
      </div>
    </el-row>
  </div>
</template>
<script>
  import vue from "vue"
  import {table, tableColumn, input, pagination, inputNumber} from "element-ui"
  vue.use(input)
  vue.use(table)
  vue.use(tableColumn)
  vue.use(pagination)
  vue.use(inputNumber)


  import {getProductList} from "service/getData"
  import list from "components/mixins/list"
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";

  export default{
    components: {ElInput},
    mixins: [list],
    data(){
      return {
        params: {
          limit: 2,
          keyword: null,
          productId: null
        },
        aaa: "",
        data: [
          {check: true, name: 'iphone'},
          {check: true, name: 'iphone2'},
          {check: false, name: 'iphone3'}
        ]
      }
    },
    computed: {},
    methods: {
      /*
       *dataList: [],//数据
       currentPage: 1,//当前页码
       limit: 10, //每页多少条
       pageCount: 0,//总页数
       total: 0,//总条目数
       * */
      loadData(){
        getProductList(this.getParams(this.params)).then(
          response => {
            this.dataList = response.data.results
            this.pageCount = response.data.pageCount
//            this.total = response.data.total
          },
          error => {
            this.$message.error(error.response.data.msg);
          }
        )
      },
      init(){
        this.data.forEach(item => {
            if(item.check){
              this.$refs.table.toggleRowSelection(item);
            }

        });
      }

    },
    watch: {},
    created(){

    },
    mounted(){
//        this.$nextTick(vm=>{
//
//        })
      this.init()
    }
  }
</script>
<style scoped>
  .load-more {
    margin-top: 10px;
  }

  .load-more button {
    margin: 25px auto;
    display: block;
  }
</style>
