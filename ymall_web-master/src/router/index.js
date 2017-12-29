/*
 * 路由表
 * */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "store/index";
import {ACTION_GET_USERINFO} from "store/type";

const Home = resolve => require(['page/home/home'], resolve)
const User = resolve => require(['page/user/user'], resolve)
const Login = resolve => require(['page/user/children/login'], resolve)
const Reg = resolve => require(['page/user/children/reg'], resolve)
const Reset = resolve => require(['page/user/children/reset'], resolve)

const notFound = resolve => require(['page/errorPage/notFound'], resolve);
const serverError = resolve => require(['page/errorPage/serverError'], resolve);

const my = resolve => require(['page/my/my'], resolve);
const orderList = resolve => require(['page/my/children/orderList'], resolve);
const profile = resolve => require(['page/my/children/profile'], resolve);

const cart = resolve => require(['page/cart/cart'], resolve);
const orderPlace = resolve => require(['page/orderPlace/orderPlace'], resolve);
const payment = resolve => require(['page/payment/payment'], resolve);
const productDetail = resolve => require(['page/productDetail/productDetail'], resolve);
const productList = resolve => require(['page/productList/productList'], resolve);



Vue.use(VueRouter);//创建路由实例

const routes = [
  {
    path: '/', redirect: '/home', //自动转跳到home
  },

  {
    path: '/home', component: Home,
    meta: {title: "YMALL-主页"}
  },
  {
    path: '/user',
    component: User,
    redirect: "/user/login",
    children: [
      {
        path: 'login',// /login相当于在Page路径下的页面，login相当于在当前页面的相对路径
        component: Login,
        meta: {title: "YMALL-用户登陆"}
      },
      {
        path: 'reg',
        component: Reg,
        meta: {title: "YMALL-用户注册"}
      },
      {
        path: 'reset',
        component: Reset,
        meta: {title: "YMALL-密码重置"}
      }
    ]
  },
  {
    path: '/my',
    component: my,
    redirect: '/my/profile',
    children: [
      {
        path:'oderList',
        component:orderList,
        meta:{requireAuth:true,title:"我的订单"}
      },{
        path:'profile',
        component:profile,
        meta:{requireAuth:true,title:"个人中心"}
      }
    ]

  },
  {path:'/cart',
    component:cart,
    meta:{requireAuth:true,title:"购物车"}
  } ,
  {path:'/orderPlace',
    component:orderPlace,
    meta:{requireAuth:true,title:"下单"}
  } ,
  {path:'/payment',
    component:payment,
    meta:{requireAuth:true,title:"支付页"}
  } ,
  {path:'/productDetail',
    component:productDetail,
    meta:{requireAuth:false,title:"商品详情页"}
  } ,
  {path:'/productList',
    component:productList,
    meta:{requireAuth:false,title:"商品列表"}
  } ,
  {path: "/404", component: notFound, meta: {title: "404页面找不到"}},
  {path: "/500", component: serverError, meta: {title: "服务器错误"}},
  {path: "*", redirect: "/404", meta: {title: "404页面找不到"}},
];


//返回路由实例
const router = new VueRouter({
  routes,
  mode: 'history', //html5 模式去除锚点
  saveScrollPosition: false, //记住页面的滚动位置 html5模式适用
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  },
  strict: process.env.NODE_ENV !== 'production'//严格模式，发布阶段关闭它避免性能损耗
});


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem("is_login") === "true") {  // 通过localStorage获取当前的is_login是否存在
      next();
    }
    else {
      next({
        path: '/user/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
router.afterEach((to, from) => {
  document.title = to.meta.title;
})
router.onReady(() => {
  //console.log("first")//手输+第一次进入路由器的时候被调用
  store.dispatch(ACTION_GET_USERINFO); //刷新进行权限认证,并重新获取用户信息
})
export default router;
