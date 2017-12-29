<!--<template>-->
  <!--<div id="reset">-->
    <!--<el-col type="flex" :span="13" justify="center">-->
      <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm">-->
        <!--<el-row>-->
          <!--<el-form-item label="用户名" class="r-f-label" prop="username">-->
            <!--<el-input placeholder="请输入用户名" v-model="ruleForm.username"></el-input>-->
            <!--<span class="el-icon-circle-check phone-ok" v-show="rightUsername"></span>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="邮箱" class="r-f-label" prop="email">-->
            <!--<el-input placeholder="请输入邮箱" v-model="ruleForm.email"></el-input>-->
            <!--<span class="el-icon-circle-check phone-ok" v-show="rightEmail"></span>-->
          <!--</el-form-item>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-form-item>-->
            <!--<el-col :offset="6">-->
              <!--<el-button type="primary" @click="resetPass('ruleForm')" style="margin-top: 10px; ">重置密码-->
              <!--</el-button>-->
            <!--</el-col>-->
          <!--</el-form-item>-->
        <!--</el-row>-->
      <!--</el-form>-->
    <!--</el-col>-->

  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import Vue from 'vue'-->
  <!--import {input, form, validateState, icon, formItem, option, messageBox} from 'element-ui'-->
  <!--import {getSmsCode, resetPassword, isAuthCodeRight} from 'service/getData'-->

  <!--Vue.use(input)-->
  <!--Vue.use(form)-->
  <!--Vue.use(formItem)-->
  <!--Vue.use(icon)-->
  <!--Vue.use(option)-->

  <!--export default {-->

    <!--mixins: [],     //混合-->
    <!--components: {},//注册组件-->
    <!--data(){-->
      <!--var validateUsername = (rule, value, callback) => {-->
        <!--if (value === '') {-->
          <!--callback(new Error("请输入用户名"))-->
        <!--} else if (!/^[a-zA-Z0-9_]{3,10}$/ .test(value)) {-->
          <!--callback(new Error("用户名格式不正确"))-->
        <!--} else {-->
          <!--callback();-->
        <!--}-->
      <!--}-->
      <!--var validateEmail = (rule, value, callback) => {-->
        <!--if (value === '') {-->
          <!--callback(new Error("请输入邮箱"))-->
        <!--} else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)) {-->
          <!--callback(new Error("邮箱格式不正确"))-->
        <!--} else {-->
          <!--callback();-->
        <!--}-->
      <!--}-->
      <!--return {-->
        <!--computedTime: 0, //倒数记时-->
        <!--ruleForm: {-->
          <!--username: '',//手机号码-->
          <!--email: '',//验证码-->
        <!--},-->
        <!--rules: {-->
          <!--username: [-->
            <!--{validator: validateUsername, trigger: 'change'}-->
          <!--],-->
          <!--email: [-->
            <!--{validator: validateEmail, trigger: 'change'}-->
          <!--]-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--props: ["parentData"],-->
    <!--beforeRouteEnter(to, from, next){-->
      <!--next(vm => {-->
        <!--vm.parentData.title = "重置密码";-->
      <!--});-->
    <!--},-->
    <!--computed: {-->
      <!--rightUsername(){-->
        <!--return /^[a-zA-Z0-9_]{3,10}$/.test(this.ruleForm.username);-->
      <!--},-->
      <!--rightEmail(){-->
        <!--return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(this.ruleForm.email);-->
      <!--},-->

    <!--},  //计算属性-->
    <!--created(){-->
    <!--},   //创建-->
    <!--mounted(){-->
    <!--},   //挂载-->
    <!--methods: {-->
      <!--sendCode(){-->
        <!--if (this.rightPhoneNumber) {-->
          <!--getSmsCode({flag: "change_password", phone_number: this.ruleForm.number})-->
            <!--.then(response => {-->
              <!--console.log(response.data.status);-->
              <!--this.computedTime = 60;-->
              <!--this.timer = setInterval(() => {-->
                <!--this.computedTime&#45;&#45;;-->
                <!--if (this.computedTime == 0) {-->
                  <!--clearInterval(this.timer)-->
                <!--}-->
              <!--}, 1000)-->
            <!--})-->
            <!--.catch(error => {-->
              <!--var content = error.response.data.content;-->
              <!--this.message({-->
                <!--message: content,-->
                <!--type: "warning",-->
                <!--duration: "1500",-->
              <!--});-->
            <!--});-->
        <!--} else {-->
          <!--this.message({-->
            <!--message: '用户名不能为空',-->
            <!--type: 'warning',-->
            <!--duration: "1500"-->
          <!--});-->
        <!--}-->

      <!--},-->
      <!--resetPass(formName){-->
        <!--this.$refs[formName].validate((valid) => {-->
          <!--if (valid) {-->
            <!--//验证码是否正确-->
            <!--let myData = {-->
              <!--phone_number: this.ruleForm.number,-->
              <!--auth_code: this.ruleForm.captcha-->
            <!--};-->
            <!--isAuthCodeRight(myData).then(response => {-->
              <!--messageBox.prompt('请输入新密码', '重置密码', {-->
                <!--confirmButtonText: '确定',-->
                <!--cancelButtonText: '取消',-->
                <!--inputPattern: /^\d{6,}$/,///[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,-->
                <!--inputErrorMessage: '密码格式不正确'-->
              <!--}).then(({value}) => {-->
                <!--let myData = {-->
                  <!--new_password: value,-->
                  <!--auth_code: this.ruleForm.captcha,-->
                  <!--phone_number: this.ruleForm.number-->
                <!--};-->
                <!--return resetPassword(myData);-->
              <!--}).then(response => {-->
                <!--this.$router.push("/user/login");-->
              <!--}).catch(error => {-->
                <!--var content = error.response.data.content;-->
                <!--this.message({-->
                  <!--message: content,-->
                  <!--type: "error",-->
                  <!--duration: "1500"-->
                <!--});-->
              <!--});-->
            <!--}).catch(error => {-->
              <!--var content = error.response.data.content;-->
              <!--this.message({-->
                <!--message: content,-->
                <!--type: "warning",-->
                <!--duration: "1500"-->
              <!--})-->
            <!--})-->
          <!--}-->
        <!--});-->
      <!--}-->
    <!--},   //方法-->
    <!--watch: {}  //监听-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->
  <!--#reg {-->
    <!--margin-left: -14px;-->
  <!--}-->

  <!--.r-line {-->
    <!--width: 1px;-->
    <!--height: 320px;-->
    <!--background-color: #f0ebf0;-->
    <!--display: block;-->
    <!--text-align: center;-->
    <!--margin: 0 auto;-->
  <!--}-->

  <!--.r-f-label {-->
    <!--margin-bottom: 12px;-->
  <!--}-->

  <!--.r-login {-->
    <!--width: 150px;-->
  <!--}-->

  <!--.el-button&#45;&#45;primary {-->
    <!--border-radius: 13px;-->
    <!--width: 160px;-->
    <!--height: 40px;-->
  <!--}-->

  <!--.r-login-text {-->
    <!--color: #324057;-->
    <!--font-size: large;-->
    <!--line-height: 45px;-->
  <!--}-->

  <!--.codeNumber {-->
    <!--width: 107px;-->
  <!--}-->

  <!--.el-icon-circle-check {-->
    <!--display: inline;-->
    <!--position: absolute;-->
  <!--}-->

  <!--.both-ok,-->
  <!--.phone-ok,-->
  <!--.pass-ok {-->
    <!--right: -30px;-->
    <!--top: 46px;-->
    <!--color: green;-->
  <!--}-->

  <!--.right-phone-number {-->
    <!--background: red;-->
  <!--}-->
<!--</style>-->
