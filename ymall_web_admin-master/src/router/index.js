import Login from 'views/Login.vue'
import NotFound from 'views/404.vue'
import Home from 'views/Home.vue'
import goods from 'views/nav1/goods.vue'
import order from 'views/nav2/order.vue'
import vue from "vue"
import VueRouter from 'vue-router'
import store from "store/index";
import {ACTION_GET_USERINFO} from "store/type";
vue.use(VueRouter)
let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  //{ path: '/main', component: Main },
  {
    path: '/',
    component: Home,
    name: '管理',
    iconCls: 'el-icon-message',//图标样式class
    redirect: { path: '/login' },
    children: [
      {   path: 'goods',
        component: goods,
        name: '商品管理',
        meta: {requireAuth:true},
      },
      {   path: 'order',
        component: order,
        name: '订单管理',
        meta: {requireAuth:true},
      },
    ],

  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
];

const router = new VueRouter({
  routes,
  mode: 'history', //html5 模式去除锚点
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem("is_login") === "true") {  // 通过localStorage获取当前的is_login是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});

router.afterEach((to, from) => {
  document.title = to.name;
})
router.onReady(() => {
  //console.log("first")//手输+第一次进入路由器的时候被调用
  store.dispatch(ACTION_GET_USERINFO); //刷新进行权限认证,并重新获取用户信息
})
export default router;
