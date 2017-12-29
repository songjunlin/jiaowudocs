<template>
  <div id="">
    <a>profile-个人中心</a>
    <button @click="test()">dianji</button>
  </div>
</template>

<script>

  export default {

    //注册组件
    components: {

    },
    //数据
    data(){
      return {

      }
    },
    //组件创建时
    created(){
    },
    //数据挂载时
    mounted(){
    },
    //计算属性
    computed: {},
    //方法
    methods: {
        test(){
          this.message({
            message: 'lalall',
            duration: '1500',
            type: 'info'
          });
        }
    },
    //观测方法
    watch: {}
  };
</script>

<style scoped>

</style>
