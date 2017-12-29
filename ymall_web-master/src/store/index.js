/**
 * Created by zc on 2017/3/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

export default

new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  // strict: process.env.NODE_ENV !== 'production'
})
