<template>
  <div id="">
    <head-top></head-top>
    <div class="cart-main">
      <div class="crumb">
        <div class="w">
          <div class="crumb-list">
            <a class="crumb-item" href="/home">YMALL</a>
            <span></span>
            <span class="crumb-item">我的购物车</span>
          </div>
        </div>
      </div>
      <div class="cart-wrap w">
        <div>
          <el-table
            ref="cart_table"
            :data="cart.cartItemList"
            :stripe="true"
            @cell-click="handleCellClick"
            @select-all="selectAll"
            @select="selectSingle"
            :highlight-current-row="true"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="商品信息"
              width="550">
              <template slot-scop="scope">
                <div style="margin: 10px auto">
                  <router-link :to="{ path: 'productDetail', query: { id: scope.row.productId }}"
                               target="_blank">
                    <img class="p-img" :src="scope.row.productMainImage | defaultImg"/>
                  </router-link>
                  <router-link class="link p-name" :to="{ path: 'productDetail',
                   query: { id: scope.row.productId }}" target="_blank">
                    {{scope.row.productName}}
                  </router-link>
                </div>

              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              width="150">
              <template slot-scope="scope">
                ￥{{scope.row.productPrice}}
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              width="150"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.quantity"
                  size="small"
                  :debounce="300"
                  @change="updateCount"
                  :min="1" :max="scope.row.productStock"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              label="合计"
              width="120">
              <template slot-scope="scope">
                <span style="color: #333333;font-weight: bold">  ￥{{scope.row.productTotalPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="110">
              <template slot-scope="scope">
                <el-button type="text" icon="delete" @click="delete_item(scope.row.productId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="cart-footer clear">
          <!--<div class="select-con">-->
          <!--<el-button type="text" size="small">全选</el-button>-->
          <!--</div>-->
          <div class="delete-con">
            <a class="cart-delete-seleced link">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              <span @click="deleteSelect()">删除选中</span>
            </a>
          </div>
          <div class="submit-con">
            <span>总价：</span>
            <span class="submit-total">{{cart.cartTotalPrice}}元</span>
            <span class="btn submit-btn">去结算</span>
          </div>
        </div>
      </div>
    </div>
    <foot-guide></foot-guide>
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

  import headTop from "components/header/headTop";//导入组件
  import footGuide from "components/footer/footGuide";
  import {mapState, mapMutations, mapActions} from "vuex"


  export default {

    //注册组件
    components: {headTop, footGuide},
    //数据
    data(){
      return {
        currentProductId: "",
        multipleSelection: []
      }
    },
    //组件创建时
    created(){
    },
    //数据挂载时
    mounted(){
      this.init_check();
    },
    //计算属性
    computed: {
      ...mapState([
        'cart'
      ]),
    },
    //方法
    methods: {
      ...mapActions([
        'ADD_CART',
        'UPDATE_CART_PRODUCT_COUNT',
        'DELETE_CART_PRODUCT',
        'DELETE_CART_PRODUCT_ALL_CHECKED',
        'CART_CHECK_ALL',
        'CART_CHECK_SINGLE'
      ]),
      handleCellClick(row, column, cell, event){
        this.currentProductId = row.productId
      },
      updateCount(count){
        if (this.currentProductId == null || this.currentProductId.length <= 0) {
          setTimeout(() => {
            this.updateCount(count)
          }, 150)
        } else {
          this.UPDATE_CART_PRODUCT_COUNT({productId: this.currentProductId, count: count}).then(() => {
            this.currentProductId = "";
          }, error => {
            this.$message.info(error.response.data.msg)
          })
        }
      },
      selectAll(selection){
        if (selection.length > 0) {
          this.CART_CHECK_ALL(true).then(() => {

          }, error => {
            this.$message.info(error.response.data.msg)
          })
        } else {
          this.CART_CHECK_ALL(false).then(() => {

          }, error => {
            this.$message.info(error.response.data.msg)
          })
        }
      },
      selectSingle(select, row){
        let checked = !row.productChecked;
        let productId = row.productId;
        this.CART_CHECK_SINGLE({checked: checked, productId: productId}).then(() => {
        }, error => {
          this.$message.info(error.response.data.msg)
        })
      },
      deleteSelect(){
        this.DELETE_CART_PRODUCT_ALL_CHECKED().then(() => {
          },
          error => {
            this.$message.info(error.response.data.msg)
          })
      },
      delete_item(productId){
        this.$confirm('此操作将从购物车中移除商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.DELETE_CART_PRODUCT(productId).then(() => {
            this.$message.success("移除商品成功")
          }, error => {
            this.$message.info(error.response.data.msg)
          })
        });
      },
      handleSelectionChange(val) {
        console.log(val + "<=Change")
      },
      init_check(){
        this.$nextTick(vm => {
          this.cart.cartItemList.forEach(item => {
            if (item.productChecked) {
              this.$refs.cart_table.toggleRowSelection(item);
            }
          });
        })
      }
    },
    //观测方法
    watch: {
      'cart.cartItemList': function () {
        this.init_check();
      }
    }
  };
</script>

<style scoped>
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
    width: 1136px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .crumb .crumb-item {
    color: #888;
    text-decoration: none;
    cursor: pointer;
  }

  .cart-wrap {
    margin-top: 20px !important;
    text-align: left;
  }

  .link {
    color: #999999;
    text-decoration: none;
    cursor: pointer;
  }

  .link:hover {
    color: #20a0ff;
  }

  .p-img {
    width: 80px;
    height: 80px;
    border: 1px solid #dddddd;
    margin-right: 5px;
  }

  .p-name {
    font-size: 12px;
  }

  .cart-wrap .cart-footer {
    position: relative;
    line-height: 50px;
    background: #eee;
  }

  .cart-wrap .cart-footer .select-con {
    float: left;
    padding-left: 20px;
  }

  .cart-wrap .cart-footer .delete-con {
    float: left;
    margin-left: 20px;
  }

  .fa {
    display: inline-block;
    font-size: inherit;
  }

  .cart-wrap .cart-footer .submit-con {
    float: right;
  }

  .cart-wrap .cart-footer .submit-con .submit-total {
    font-size: 18px;
    color: #c60023;
    font-weight: 700;
    margin-right: 30px;
    vertical-align: middle;
  }

  .cart-wrap .cart-footer .submit-con .submit-btn {
    height: 50px;
    line-height: 50px;
  }

  .btn {
    display: inline-block;
    padding: 0 20px;
    vertical-align: middle;
    border: none;
    background-color: #c60023;
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    outline: none;
    cursor: pointer;
    text-decoration: none;
  }

  .cart-delete-seleced{
    font-size: 13px;
  }
</style>
