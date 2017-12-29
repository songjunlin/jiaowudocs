/**
 * Created by zc on 2017/3/18.
 * 全局异步逻辑处理
 */

import * as type from './type'
import {getUserInfo, login, logout} from "service/getData"
import router from "router/index"

export default {

  [type.ACTION_GET_USERINFO] ({commit}) {
    getUserInfo().then(response => {
      commit(type.RECORD_USERINFO, response.data);
    }, error => {
    });
  },
  async [type.ACTION_USER_LOGIN] ({commit}, user) {
    let response = await login(user);
    commit(type.RECORD_USERINFO, response.data);
  },
  [type.ACTION_USER_LOGOUT] ({commit}) {
    logout().then(response => {
      commit(type.CANCEL_USER);
      if(router.currentRoute.meta.requireAuth){
        router.push({
          path: '/login',
          // query: {redirect: router.currentRoute.fullPath}
        })
      }
    }, error => {
      console.log(error.response)
    });
  }


}
