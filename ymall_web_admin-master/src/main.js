// 入口 main.js

import Vue from "vue";
import App from "./App";
import router from "./router/index";
import store from "./store/index";
import "./assets/css/reset.css";
import element from "element-ui";
import "element-theme-default"
import {defaultImg, toTime,formateData} from "components/filters/filter";

Vue.config.productionTip = false;

// Vue.prototype.message = message;
// Vue.prototype.$message = message;
// Vue.prototype.$msgBox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.use(row);
// Vue.use(col);
// Vue.use(button);
// Vue.use(card);
Vue.use(element)



Vue.filter("defaultImg", defaultImg);
Vue.filter("toTime", toTime);
Vue.filter("formateData", formateData);
new Vue({
  el: '#app',
  router,
  store,
  components: {App}
});
