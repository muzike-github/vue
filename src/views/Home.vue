<template>
  <div style="padding: 10px">
<!--    功能区域-->
    <div style="margin:10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
<!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入搜索内容" style="width: 20%" clearable></el-input>
      <el-button type="primary" @click="load">查询</el-button>
    </div>
<!--    表格-->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="100" />
      <el-table-column prop="username" label="username" width="180" />
      <el-table-column prop="password" label="password" width="180" />
      <el-table-column prop="age" label="age" width="180" />
      <el-table-column prop="sex" label="sex" width="180" />
      <el-table-column prop="address" label="Address" />
<!--      增加和删除-->
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)" >编辑</el-button>
          <el-popconfirm title="确认删除吗?">
            <template #reference>
              <el-button type="danger" >删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
<!--    分页-->
    <div class="demo-pagination-block">
      <span class="demonstration">Jump to</span>
      <el-pagination
          v-model:currentPage="currentPage"
          :page-size="pageSize"
          layout="total,prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!--      新增弹窗-->
    <el-dialog v-model="dialogVisible" title="新增用户" width="30%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
          <el-radio v-model="form.sex" label="未知">未知</el-radio>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>

</template>

<script>
import { ElMessage } from 'element-plus'
import request from "@/utils/request";
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
      form:{},
      search:'',
      currentPage:1,
      pageSize:10,
      total:100,
      dialogVisible:false,//新增按钮的弹出框默认为false
      tableData:[]
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      request.get("/user",{
        params:{
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          search:this.search,
        }
      }).then(res=>{
        console.log(res)
        this.tableData=res.data.records
        this.total=res.data.total
      })
    },
    add(){//增加按钮
      this.dialogVisible=true
      this.form={}
    },
    save(){
      //此处需要判断，到底是新增用户还是编辑用户信息，因为用的同一个弹窗
      if(this.form.id){//如果form表单里有id属性值，则说明该数据已经存在，表示更新数据
        //编辑用户,发送put请求
        request.put("/user",this.form).then(res=>{
          console.log(res)
          if(res.code==='0'){
            ElMessage({
              type:"success",
              message:"更新成功"
            })
            this.dialogVisible=false
          }else {
            ElMessage({
              type:"error",
              message:res.msg,
            })
          }
          this.load()//刷新数据
          this.dialogVisible=false//关闭弹窗
        })
      } else {//新增用户
        request.post("/user",this.form).then(res=>{
          console.log(res)
          if(res.code==='0'){
            ElMessage({
              type:"success",
              message:"新增用户成功"
            })
          }else {
            ElMessage({
              type:"error",
              message:res.msg,
            })
          }
          this.load()//刷新数据
          this.dialogVisible=false//关闭弹窗
        })
      }

    },
    handleEdit(row){
      this.form=JSON.parse(JSON.stringify(row))//深拷贝
      this.dialogVisible=true
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    }
  },



}

</script>
