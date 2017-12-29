/**
 * Created by zc on 2017/3/18.
 * AJAX 同一管理
 */

import ajax from "utils/http.js";


//用户登录
var login = myData => ajax('post', '/api/admin/user/login/', myData);

// 获取用户信息
var getUserInfo = () => ajax("get", "/api/user/my_info", {});

//用户注销
var logout = () => ajax("post", "/api/user/logout", {});

//获取产品列表
var ProductList = myData => ajax("get", "/api/admin/product/product_list", myData);

//获取产品品类
var getproductType = myData => ajax("get", "/api/category/sub_list", myData);

//添加商品
var addProduct = myData => ajax("post", "/api/admin/product/product", myData);

//更新销售状态
var updateProductStatus = (productId, status) => ajax("put", "/api/admin/product/sale_status/" + productId, {status: status});
export {
  login,
  logout,
  getUserInfo,
  ProductList,
  getproductType,
  addProduct,
  updateProductStatus
}



