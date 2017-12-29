/**
 * Created by zc on 2017/3/18.
 * AJAX 同一管理
 */

import ajax from "utils/http.js";


//用户登录
var login = myData => ajax('post', '/api/user/login/', myData);

//注册
var register = (myData) => ajax('post', '/api/user/register', myData)
//获取用户信息
var getUserInfo = () => ajax("get", "/api/user/my_info", {});

//用户注销
var logout = () => ajax("post", "/api/user/logout", {});

//验证用户名与邮箱是否存在
var isusername = (myData) => ajax("get", "/api/user/check_valid",
  Object.assign(myData, {type: "username"}));
var isemail = (myData) => ajax("get", "/api/user/check_valid",
  Object.assign(myData, {type: "email"}));

//获取商品品类
var CommodityCategory = myData => ajax("get", "/api/category/sub_list/", myData);

// 获取商品基本信息
var getCommodityList  = myData => ajax("get", "/api/product/product_list", myData);

//获取商品详情
var getCommodityDetail  = (productId,myData) => ajax("get", "/api/product/product_detail/" +productId,myData);

// 向购物车添加商品
var addCart = (myData) => ajax("post", "/api/cart/cart_item", myData)

// 更新购物车产品数量
var updateCartProductCount = (myData) => ajax("put", "/api/cart/cart_item", myData)

// 删除购物车某一产品
var deleteByProductId = (productId) => ajax("delete", "/api/cart/cart_item/" + productId, {})

// 删除购物车所有选择的产品
var deleteCartAllCheck = () => ajax("delete", "/api/cart/cart_item_checked", {})

// 获取购物车
var getCart = () => ajax("get", "/api/cart/cart_list", {})

// 全选或全反选
var cartCheckALL = (check) => ajax("post", "/api/cart/check_all", {checked: check})

// 单选或单反选
var cartCheckSingle = (myData) => ajax("post", "/api/cart/check_single", myData)

export {
  login,
  register,
  logout,
  getUserInfo,
  CommodityCategory,
  isusername,
  isemail,
  getCommodityList,
  getCommodityDetail,
  addCart,
  updateCartProductCount,
  deleteByProductId,
  deleteCartAllCheck,
  getCart,
  cartCheckALL,
  cartCheckSingle
}



