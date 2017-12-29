<template>
  <div id="login">
    <el-row type="flex" justify="space-around" align="middle">
      <el-col :xs="8" :sm="8" :md="8" :lg="8">
        <el-form ref="user" style="margin-top: 20px;" :rules="rules" :model="user"
                 :label-position="labelPosition">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" v-model="user.password" @keydown.enter.native="onSubmit('user')" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :xs="4" :sm="4" :md="4" :lg="4">
                <el-button style="margin-left: 36px" type="primary" @click="onSubmit('user')">授权并登录
                </el-button>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :offset="15">
                <router-link to="/user/reset" class="reset">忘记密码?</router-link>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :offset="5">
        <span class="r-line"></span>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8">
        <el-row>
          <span class="wissky-user-font">还没有YMALL账户?</span>
        </el-row>
        <el-row>
          <el-button type="primary" @click="$router.push('/user/reg')">立即注册
          </el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from "vue";
  import {form, input, formItem} from 'element-ui'
  import {mapState, mapMutations, mapActions} from "vuex"
  import {login} from "service/getData"

  Vue.use(form);
  Vue.use(input);
  Vue.use(formItem);

  export default {

    mixins: [],     //混合
    components: {},//注册组件
    data(){
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error("请输入用户名"))
        } else if (!/^[a-zA-Z0-9_]{3,10}$/.test(value)) {
          callback(new Error("用户名格式不正确"))
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error("密码不为空"))
        } else {
          callback();
        }
      }
      return {
        labelPosition: 'top',
        user: {
          username: "",//13220858781
          password: ""
        },
        rules: {
          username: [
            {validator: validatePhone, trigger: 'change'}
          ],
          password: [
            {validator: validatePass, trigger: 'change'}
          ],
        },
      }
    },
    created(){
      //this.$parent.$data.titleData.title="用户登录";
    },
    props: ["parentData"],
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.parentData.title = "用户登录";
      });
    },
    computed: {//计算属性
      ...mapState([
        'userInfo'
      ]),
    },


    methods: {
      ...mapMutations([]),
      ...mapActions([
        'ACTION_USER_LOGIN'
      ]),
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ACTION_USER_LOGIN(this.user).then(() => {//成功
              this.message({
                message: '登录成功',
                duration: '1500',
                type: 'success'
              });
              let url = this.$route.query.redirect;
              if (url==undefined || url=="") url = '/home';
              this.$router.replace(url);
            },error=>{
              this.$message.error(error.response.data.msg);
            });

          }else {
            this.message({
              message: '您有信息未填写完整',
              duration: '1500',
              type: 'error'
            });
          }
        });
      }
    },
    watch: {},      //监听

  }
</script>

<style scoped>
  .reset {
    display: inline-block;
    font-size: 12px;
    color: #303b57;
  }

  .reset:hover {
    color: #252d57;
  }

  .r-line {
    width: 1px;
    height: 270px;
    background-color: #f0ebf0;
    display: block;
    margin-top: 10px;
  }

  .el-col-9 {
    margin-left: 82px;
  }

  .el-button--primary {
    margin-left: 25px;
    border-radius: 13px;
    width: 160px;
    height: 40px;
  }

  .col1 {
    margin-left: 10px;
  }

  .el-form-item {
    margin-bottom: 28px;
    width: 330px;
  }

  .wissky-user-font {
    color: #324057;
    font-size: large;
    margin-left: 29px;
    line-height: 45px;
  }
</style>
