<template>
  <div>
    <div id="loadList" v-loading="listloading" element-loading-text="拼命加载中">
      <div v-if="!loading&&dataList.length<=0&&currentPage===0">
        <div>暂无数据</div>
      </div>
      <div v-else>
        <slot name="item"
              v-for="(item,index) in this.dataList"
              :index="index"
              :obj="item">
          <!-- 这里写入备用内容 -->
        </slot>

      </div>

    </div>
    <div class="load-more" :style="css_loadmore" v-if="!(!loading&&dataList.length<=0&&currentPage===0)">
      <div v-if="mode=='more'">
        <el-button v-if="loading" type="success" icon="loading">加载中</el-button>
        <el-button v-else-if="!loading&&!hasNextPage" type="info" @click="message.info('没有更多了')">没有更多了</el-button>
        <el-button v-else-if="!loading&&hasNextPage" type="primary" @click="loadMore()">加载更多</el-button>
      </div>
      <el-pagination v-else-if="mode=='pen'&&!loading" style="text-align: center"
                     layout="prev, pager, next"
                     :current-page="currentPage" :page-count="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
      >
        <!--:total="total" :page-size="limit"-->
      </el-pagination>
      <div v-else-if="mode=='infinite'">
        <el-button v-if="isMore" type="success" icon="loading">正在加载中...</el-button>
        <el-button v-else-if="!hasNextPage" type="info" @click="message.info('没有更多了')">没有更多了</el-button>
      </div>
      <div v-else-if="mode=='none'" style="display: none"></div>
    </div>
  </div>

</template>

<script>
  import {Loading,pagination} from "element-ui"
  import Vue from  "vue"
  Vue.use(Loading);
  Vue.use(pagination);
  export default {
    mixins: [],
    components: {},
    data(){
      return {
        dataList: this.data_list,//当前页数据
        currentPage: 0,//当前页码
        limit: 10,//每页条目数
        total: 0,//总条目数
        totalPage: this.total_page,//总页数
        loading: false,
        isMore: false,
        listloading: false,//整体加载动画
      }
    },
    watch: {
      data_list: function (newVal) {
        switch (this.mode) {
          case 'more':
            this.stopLoading();
            this.pushToList(newVal)
            break;
          case 'infinite':
            this.stopLoading();
            this.pushToList(newVal);
            break;
          case 'pen':
            this.stopLoading();
            this.coverToList(newVal)
            break;
          case 'none':
            this.stopLoading();
            this.pushToList(newVal);
            break;
        }

      },
      total_page: function (newVal) {
        this.totalPage = newVal;
      }
    },
    props: {data_list: {require: true}, total_page: {require: true}, mode: {default: 'infinite'}, css_loadmore:{}},
    computed: {
      //是否有下一页
      hasNextPage() {
        return this.currentPage < this.totalPage;
      },
    },
    created(){
      this.initData();
    },
    mounted() {
      if (this.mode == 'infinite') {
        window.addEventListener('scroll', this.debounce(this.doCheck), 250);
      }
    },
    methods: {
      /**
       * 获取请求参数 默认只传递index(页码) limit(每页条数) 可以由调用方传递指定对象合并(或者覆盖)原参数
       * @param params
       * @returns {*}
       */
      getParams (params) {
        return Object.assign({
          paging: true,
          pageNum: this.currentPage,
          limit: this.limit
        }, params)
      },
      /**
       * 加载更多
       */
      loadMore () {
        console.log("加载更多");
        this.currentPage++;
        this.loadData();
      },
      /**
       * 跳到第几页
       */
      toPage(pagenum){
        this.currentPage = pagenum;
        this.loadData();
      },
      /**
       * 替换原数据
       */
      coverToList(dataList){
        if (dataList && dataList.length > 0) {
          this.dataList = dataList;
        } else {
          this.currentPage--;
//          this.message.info("没有更多了")
        }
      },
      /**
       * 推送到list中 因为vue的监听特性 只能用push进行数据的添加 如果有特殊处理 通过传递一个filter来过滤数据
       * @param list
       * @param filter
       */
      pushToList (dataList, filter) {
        if (dataList && dataList.length > 0) {
          dataList.forEach((item) => {
            if (typeof filter === 'function') {
              this.dataList.push(filter(item))
            } else {
              this.dataList.push(item)
            }
          })
        } else {
          this.currentPage--;
//          this.message.info("没有更多了")
        }
      },
      /**
       * 初始化列表
       */
      initData () {
        this.currentPage = 1
        this.dataList = [];
        this.loadData()
      },
      /**
       * @overwrite
       * 加载数据方法 用到该mixin的都应该重写该方法 否则无法实现加载数据
       */
      loadData () {
        this.startLoading();
        this.$emit("loadData", this.getParams())// 调用父组件加载数据方法
//        this.stopLoading();
      },
      /**
       * 重新加载
       */
      reload() {
        this.initData();
      },
      /**
       * 加载动画
       */
      startLoading(){
        if (this.mode == 'pen') {
          this.listloading = true;
        }
        if(this.mode=='infinite'){
          this.isMore = true;
        }
        this.loading = true;
      },
      stopLoading(){
        this.loading = false;
        this.listloading = false;
        this.isMore = false;
      },
      handleSizeChange(limit) {
        console.log(`每页 ${limit} 条`);
      },
      handleCurrentChange(pageNum) {
        this.toPage(pageNum);
      },
      /**
       * 把当页数据添加到数组列表里
       * list：当页数据
       */
//      addToList(list){
//        if (productList && productList.length > 0) {
//          this.dataList.push.apply(this.dataList, list);
//        }else {
//            this.currentPage--;
//        }
//      },
      //检查是否还有更多数据
      doCheck(){
        let scrollTop = this.getScrollTop();
        let offsetHeight = this.getVisibleHeight();
        let scrollHeight = this.getScrollHeight();
        var scrollBottom=240;//你可以自己定义距离底部的距离
        let downTrigger = scrollTop + offsetHeight >= scrollHeight-240;
        if (downTrigger && this.hasNextPage) {
          this.loadMore();
        }
      },
      getScrollTop(event, el) {
        var scrollTop = el ? el.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
        return scrollTop;
      },
      //获取可视区高度
      getVisibleHeight(event, el){
        let height = el ? el.offsetHeight : window.innerHeight;
        return height;
      },
      //获取滚动条高度信息
      getScrollHeight(event, el) {
        let height = el ? el.scrollHeight : (document.documentElement.scrollHeight || document.body.scrollHeight);
        return height;
      },
      /**
       * 防抖动函数
       * 作用:在一定时间(wait)内某个事件(scroll,resize)没有被连续出发两次及以上，那么才会出发func
       * @param func 某个要执行防抖动的函数
       * @param func 延迟时间
       * */
      debounce(func, wait, immediate) {
        var timeout;
        return function () {
          var context = this, args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      }
    }
  }
</script>

<style scoped>
  #loadlist{

  }
  .load-more {
    margin-top: 10px;
  }

  /*.load-more:before {*/
    /*content: '.';*/
    /*display: block;*/
    /*line-height: 0;*/
    /*clear: both;*/
  /*}*/

  .load-more button {
    margin: 25px auto;
    display: block;
  }
</style>

