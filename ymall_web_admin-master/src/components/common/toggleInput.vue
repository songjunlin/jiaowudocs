<template>
  <div id="toggle-input" v-if="open">
    <el-row>
      <el-col :span="20">
        <el-input v-model="content" :placeholder="placeholder" @keyup.13.native="send()">
          <el-button slot="append" @click="send()">发送</el-button>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import isShow from "components/mixins/isShow"
  export default {

    mixins: [isShow],
    props:{placeholder:{}},
    components: {},
    data(){
      return {
          content:""
      }
    },
    computed: {},
    created(){
    },
    mounted(){

    },
    methods: {
        send(){
          this.$emit("sendmessage", this.content);
        }
    },
    watch: {}

  }
</script>

<style scoped>

</style>

