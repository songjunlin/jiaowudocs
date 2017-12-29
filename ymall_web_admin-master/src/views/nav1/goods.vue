<template>
    <section id="add">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="keyword" placeholder="商品名称" @keyup.enter.native="select()"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="productId" placeholder="商品ID" @keyup.enter.native="select()"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="select()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="dataList" :stripe="true" highlight-current-row v-loading="listLoading"
                  @selection-change="selsChange" style="width: 100%;">
            <el-table-column prop="id" label="ID" width="60">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="250" sortable>
            </el-table-column>
            <el-table-column prop="subtitle" label="商品详情" min-width="180" sortable>
            </el-table-column>
            <el-table-column prop="price" label="价格" width="150" sortable>
            </el-table-column>
            <el-table-column label="状态" width="150">
                <template scope="scope">
                    <!--dataliat.stratus-->
                    <el-button v-if="scope.row.status ==2" type="success" size="small" @click="setState(scope.row.id,1)">上架
                    </el-button>
                    <el-button v-if="scope.row.status==1" type="warning" size="small" @click="setState(scope.row.id,2)">下架
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button type="danger" size="small" @click="handleDel
					(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增商品" v-model="addFormVisible" size="large" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品简介" prop="subtitle">
                    <el-input v-model="addForm.subtitle" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品单价" prop="price">
                    <el-input-number v-model="addForm.price"></el-input-number>
                </el-form-item>
                <el-form-item label="初始库存" prop="stock">
                    <el-input-number v-model="addForm.stock"></el-input-number>
                </el-form-item>
                <el-form-item label="品类">
                    <el-select id="productType" v-model="key1" placeholder="请选择一级分类" @change="changetype()">
                        <el-option
                                v-for="item in productType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="key2" placeholder="请选择二级分类">
                        <el-option
                                v-for="item in productType2"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="图片详情">
                    <el-upload
                            class="upload-demo"
                            action="/api/file/upload_img"
                            :on-success="handleSuccess"
                            :before-upload="beforeAvatarUpload"
                            :on-error="uploadError"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <edit-vue ref="editvue" :minHeight="30" :isModal="false" img_top="60%"
                      style="margin-bottom: 10px"></edit-vue>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addSubmit()"
                           :loading="addLoading">提交
                </el-button>
            </div>
        </el-dialog>
        <!--底部分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next"
                           :current-page="currentPage" :page-count="pageCount"
                           @current-change="toPage"
                           style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    import list from "components/mixins/list.js"
    import {ProductList, getproductType, addProduct,updateProductStatus} from "service/getData"
    import editVue from  "components/common/edit-vue.vue"

    export default {
        components: {
            editVue
        },
        mixins: [list],
        data() {
            return {
                product_img: [],
                key1: "",
                key2: "",
                productType2: '',
                filters: {
                    name: ''
                },
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{required: true, message: '请输入商品名称', trigger: 'blur'}],
                    subtitle: [{required: true, message: '请输入商品简介', trigger: 'blur'}]
                },
                //新增界面数据
                addForm: {
                    name: "",
                    subtitle: "",
                    categoryId: "",
                    subImages: "",
                    price: "",
                    stock: "",
                    detail: ""
                },
                listLoading: false,
                params: {limit: 3},
                keyword: null,
                productId: null,
                productType: []
            }
        },
        methods: {
            //产品数据获取
            loadData(){
                ProductList(this.getParams(this.params)).then(
                    response => {
                        this.dataList = response.data.results //填充dataList数据
                        this.pageCount = response.data.pageCount//填充总分页数
                    },
                    error => {
                        this.$message.error(error.response.data.msg);
                    }
                )
            },
            //选中一级分类，向二级分类填充
            changetype(value){
                getproductType({parentId: this.key1}).then(
                    responds => {
                        this.productType2 = responds.data
                        this.key2 = ""
                    },
                    error => {
                        console.log(error.response.data.content)
                    }
                )
            },
            //搜索数据
            select(){
                this.params = Object.assign(
                    this.params,
                    {keyword: this.keyword, productId: this.productId}
                );
                console.log(this.params)
                this.reload();
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //上传图片
            handleCommand(command) {
                this.$message('click on item ' + command);
            },
            handleSuccess(response, file, fileList){
                this.product_img.push(response.data.uri)

                this.$message({
                    type: 'success',
                    duration: 1000,
                    message: '上传成功!'
                });

            },
            beforeAvatarUpload(file) {
                let accept = "image/png,image/gif,image/jpeg,image/bmp,image/jpg";
                const isJPG = accept.indexOf(file.type) >= 0;
                const isLt5M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是image格式!');
                }
                if (!isLt5M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                return isJPG && isLt5M;
            },
            uploadError(){
                this.$message.error('上传失败');
            },
            addSubmit(){
                if (this.key1 === "") {
                    this.$message.info("请选择品类");
                } else {
                    if (this.key2 !== "") {
                        this.addForm.categoryId = this.key2;
                    } else {
                        this.addForm.categoryId = this.key1;
                    }

                    this.addForm.subImages = this.product_img.join();
                    this.addForm.detail = this.$refs.editvue.content;


                    addProduct(this.addForm).then(response => {
                        this.$message.success("添加成功");
                        this.addFormVisible = false;
                        this.reload();
                    }, error => {
                        this.$message.error(error.response.data.msg);
                    })
                }
            },
          setState(productId,status){
            updateProductStatus(productId,status).then(response=>{
              this.$message.success("修改在售状态成功");
              this.reload();
            },error=>{
              this.$message.error(error.response.data.msg);
            })
          }
        },
        mounted() {

        },
        created(){
            //获取产品列表
            getproductType({}).then(
                responds => {
                    this.productType = responds.data
                },
                error => {
                    console.log(error.response.data.content)
                }
            );
        }
    }

</script>

<style scoped>

</style>
