<template>
  <div id="reg">
    <el-row type="flex" justify="space-around" align="middle">
      <el-col :xs="10" :sm="10" :md="10" :lg="10">
        <el-form ref="form1" :model="form1" :rules="rules">
          <el-form-item label="用户名" class="r-f-label" prop="username">
            <el-input placeholder="请输入3-10位字母或数字用户名" @blur="is_username()" v-model="form1.username"></el-input>
            <span class="el-icon-circle-check phone-ok" v-show="rightUsername"></span>
          </el-form-item>
          <el-form-item label="邮箱" class="r-f-label" prop="email">
            <el-input placeholder="请输入邮箱" @blur="is_email" v-model="form1.email"></el-input>
            <span class="el-icon-circle-check phone-ok" v-show="rightEmail"></span>
          </el-form-item>
          <el-form-item label="密码" class="r-f-label" prop="password">
            <el-input type="password" placeholder="请输入6位以上密码" v-model="form1.password"></el-input>
            <span class="el-icon-circle-check pass-ok" v-if="isPass"></span>
          </el-form-item>
          <el-form-item label="确认密码" class="r-f-label" prop="passwordOk">
            <el-input type="password" placeholder="请再次输入密码" v-model="form1.passwordOk"></el-input>
            <span class="el-icon-circle-check both-ok" v-if="isSamePass"></span>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :offset="5">
                <el-button :offset="6" type="primary" @click="register('form1')" style="margin-top: 25px;">立即注册
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2">
        <span class="r-line"></span>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8">
        <div>
          <span class="r-login-text">已注册YMALL账号？</span>
          <el-button type="primary" @click="$router.push('/user/login')" class="r-login">登录账号
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {input, form, validateState, icon, formItem, option} from 'element-ui'
  import {register,isusername,isemail} from 'service/getData'
  Vue.use(input)
  Vue.use(form)
  Vue.use(formItem)
  Vue.use(icon)
  Vue.use(option)
  export default {
    mixins: [],     //混合
    components: {},//注册组件
    data(){         //数据
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error("请输入用户名"))
        } else if (!/^[a-zA-Z0-9_]{3,10}$/ .test(value)) {
          callback(new Error("用户名格式不正确"))
        } else {
          callback();
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error("请输入邮箱"))
        } else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)) {
          callback(new Error("邮箱格式不正确"))
        } else {
          callback();
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error("长度必须大于6位"))
        } else {
          callback();
        }
      };
      var validatePassOk = (rule, value, callback) => {
        if (this.form1.password.length >= 6) {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form1.password) {
            callback(new Error('两次密码不一致'))
          } else {
            callback();
          }
        }
      }
      return {
        title: "用户注册",//父组件名字
        computedTime: 0, //倒数记时
        form1: {
          username: "",
          email: "",
          password: "",
          passwordOk: "",
        },
        rules: {
          username: [
            {validator: validateUsername, trigger: 'change'}
          ],
          email: [
            {validator: validateEmail, trigger: 'change'}
          ],
          password: [
            {validator: validatePass, trigger: 'change'}
          ],
          passwordOk: [
            {validator: validatePassOk, trigger: 'change'}
          ],
        },

      };
    },
    created(){
      //this.$parent.$data.titleData.title="用户注册";
    },
    props: ["parentData"],
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.parentData.title = "用户注册";
      });
    },
    computed: {
      rightUsername(){
        return /^[a-zA-Z0-9_]{3,10}$/.test(this.form1.username);
      },
      rightEmail(){
        return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(this.form1.email);
      },
      isSamePass(){
        let flag = /^\d{6,}$/g.test(this.form1.password);
        return flag && this.form1.password == this.form1.passwordOk;
      },
      isPass(){
        return /^\d{6,}$/g.test(this.form1.password);
      }
    },  //计算属性
    //挂载
    methods: {
      is_username(){
        isusername({value:this.form1.username}).then(
            response=>{
            },
            error=>{
              this.form1.username='';
              this.message({
                message: error.response.data.msg,
                type: 'error',

              });
            }
        )
      },
      is_email(){
          isemail({value:this.form1.email}).then(
              response=>{},
              error=>{
                this.form1.email='';
                this.message({
                  message: error.response.data.msg,
                  type: 'error',
                });
              }

          )
      },
      register(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let myData = {
              username: this.form1.username,
              password: this.form1.password,
              email:this.form1.email
            }
            register(myData).then(response => {
              this.message({
                message: '注册成功',
                type: 'success',
                duration: '1500'
              });
              this.$router.push("/user/login");
            }).catch(error => {
              this.message({
                message: error.response.data.msg,
                type: 'warning',
                duration: '1500'
              });
            })
          } else {
            this.message({
              message: '您有信息未填写完整',
              type: 'warning',
              duration: '1500'
            });
          }
        });

      },
    },   //方法
    watch: {}      //监听

  }
</script>

<style scoped>
  .el-button--primary {
    margin-left: 25px;
    border-radius: 13px;
    width: 160px;
    height: 40px;
  }

  .r-line {
    width: 1px;
    height: 320px;
    background-color: #f0ebf0;
    display: block;
    text-align: center;
    margin: 0 auto;
  }

  .r-f-label {
    margin-bottom: 12px;
  }

  .r-login {
    width: 150px;
  }

  .r-login-text {
    color: #324057;
    font-size: large;
    margin-left: 29px;
    line-height: 45px;
  }

  .codeNumber {
    width: 107px;
  }

  .el-icon-circle-check {
    display: inline;
    position: absolute;
  }

  .both-ok,
  .phone-ok,
  .pass-ok {
    right: -30px;
    top: 46px;
    color: green;
  }

  .right-phone-number {
    background: red;
  }
</style>
