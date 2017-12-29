<template>
    <div id="edit-vue">
        <quill-editor v-model="content"
                      :style="{ minHeight: minHeight + 'em',height:Height}"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @change="onEditorChange($event)"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>

        <el-dialog title="上传图片" v-model="dialogVisible" size="tiny"
                   @close="diaclose" :top="img_top"
                   :close-on-click-modal="false" :modal="isModal">
            <el-upload
                    class="upload-demo"
                    ref="imgupload"
                    :action="imgurl"
                    :file-list="myfileList"
                    :show-file-list="true"
                    :multiple="false"
                    list-type="picture"
                    :on-success="handleAvatarScucess"
                    :before-upload="beforeAvatarUpload"
                    :on-error="uploadError"
                    :on-remove="handleremove"
                    :on-preview="handleuploadPreview"
            >
                <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
                <el-button slot="tip" size="small" type="primary" style="margin-left: 50px" @click="insertImg()">插入图片


                </el-button>
                <div slot="tip" style="width: 75%;margin-top: 10px">
                    <el-input placeholder="或者输入网络图片地址" v-model="internetImg"></el-input>
                </div>
                <div slot="tip" class="el-upload__tip">只能上传图片，且不超过5MB</div>
            </el-upload>

        </el-dialog>

    </div>
</template>

<script>
    import Vue from "vue";
    import VueQuillEditor from 'vue-quill-editor';
    Vue.use(VueQuillEditor)
    const toolbarOptions = [
        ['bold', 'italic', 'underline'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
//    [{'list': 'ordered'}, {'list': 'bullet'}],
//    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
//    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
//    [{'direction': 'rtl'}],                         // text direction

//    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
//    [{'header': [1, 2, 3, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
//    [{'font': []}],
        [{'align': []}],

//    ['clean'],                                  // remove formatting button

        ['link', 'image']
    ];

    var self = null;

    export default {

        mixins: [],     //混合
        components: {},//注册组件
        props: {
            Content: {require: false},
            placeholder: {default: "请在此输入"},
            isModal: {default: true}, minHeight: {default: 15}, isFlex: {default: false},img_top:{default:'15%'}
        },
        data(){         //数据
            return {
                imgurl: "/api/file/upload_img/",
                content: "",
                editorOption: {
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // Selector for toolbar container
                            handlers: {
                                'image': function () {
                                    self.internetImg = "";
                                    self.imginlist = [];
                                    self.myfileList = [];
                                    self.dialogVisible = true;
                                }
                            }
                        },
                        history: {
                            delay: 1000,
                            maxStack: 50,
                            userOnly: false
                        },
                    },
                    placeholder: this.placeholder,
                    boundary: "#edit-vue"
                },
                dialogVisible: false,
                myfileList: [],
                imginlist: [],
                Height: "auto",
                internetImg: "",
            }
        },
        computed: {//计算属性
//      editor() {
//        return this.$refs.myQuillEditor.quillEditor;
//      }
        },
        created(){
            self = this;
            if (!this.isFlex) {
                this.Height = this.minHeight + "em"
            }
        },   //创建
        mounted(){

        },   //挂载
        methods: {
            onEditorChange({editor, html, text}) {
                //console.log('editor change!', editor, html, text)
                //console.log(editor);
                this.content = html;
            },
            onEditorBlur(editor) {
//        console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                //       console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
//        console.log('editor ready!', editor)
            },

            handleAvatarScucess(response, file, filelist){
                this.imginlist.push(response.data.url);
                this.$message({
                    type: 'success',
                    duration: 1000,
                    message: '上传成功!'
                });
            },
            handleremove(file, fileList){
//        removeByValue(this.imginlist, file.response.image_path);
            },
            beforeAvatarUpload(file) {
                let accept = "image/png,image/gif,image/jpeg,image/bmp,image/jpg";
                const isJPG = accept.indexOf(file.type) >= 0;
                const isLt5M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是image格式!');
//          this.myfileList.splice(this.myfileList.length - 2, 1)
                }
                if (!isLt5M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
//          this.myfileList.splice(this.myfileList.length - 2, 1)
                }
                return isJPG && isLt5M;
            },
            uploadError(){
                this.$message.error('上传失败');
                this.myfileList.splice(this.myfileList.length - 2, 1)
            },
            handleuploadPreview(file) {
//        console.log(file);
            },
            insertImg(){
                if (this.internetImg.trim().length > 0) {
                    this.imginlist.push(this.internetImg);
                }
                if (this.imginlist.length > 0) {
                    this.$refs.imgupload.clearFiles();
                    this.dialogVisible = false;
                    for (var imgsrc of this.imginlist) {
                        this.$refs.myQuillEditor.quill.insertEmbed(this.$refs.myQuillEditor.quill.getLength(), 'image', imgsrc);
                    }
                    this.$refs.myQuillEditor.quill.setSelection(this.$refs.myQuillEditor.quill.getLength(), this.$refs.myQuillEditor.quill.getLength());
                } else {
                    this.$message.info('请先上传图片');
                }

            },
            diaclose(){
                self.$refs.imgupload.clearFiles();
            }
        },

        watch: {
            Content: function (newVal) {
                this.content = newVal;
            }
        } //监听

    }

    function removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }
</script>

<style>
    .ql-snow .ql-editor pre.ql-syntax {
        background-color: #f0f0f0 !important;
        color: #313545 !important;
        overflow: visible;
    }

    /*.quill-editor.ql-container.ql-snow {*/
    /*font-size: 15px;*/
    /*}*/

    .ql-container .ql-editor {
        /*min-height: 10em;*/
        padding-bottom: 1em;
        font-size: 15px;
        /*max-height: 25em;*/
    }

    .ql-container img {
        margin: 6px 0;
        display: block;
        overflow: hidden;
        max-width: 100%;
        height: auto;
    }

    .el-dialog.el-dialog--tiny {
        min-width: 230px !important;
    }

    .ql-toolbar {
        line-height: 21px;
    }

</style>

