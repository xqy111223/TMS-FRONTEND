<!--用户管理-系统参数-->
<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <p class="total-count mb20">共{{ total }}条数据</p>
    <el-table v-loading="listLoading" ref="dragTable" :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column label="序号" width="65" type="index" />

      <el-table-column label="参数名称" prop="paramName" />

      <el-table-column label="参数值" prop="paramValue" />

      <el-table-column label="备注" prop="remark" />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editor(scope.$index, scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑弹窗-->
    <el-dialog
      :visible.sync="dialogVisible"
      title="编辑参数"
      width="40%">

      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item :label-width="formLabelWidth" label="参数名称" prop="paramName" required>
          <el-input v-model="form.paramName" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="参数值" prop="paramValue" required>
          <el-input v-model="form.paramValue" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="备注">
          <el-input v-model="form.remark" autocomplete="off"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {  getSystemParameterList  } from '@/api/system'
import {  saveSystemParameterList } from '@/api/system'

export default {
  name: 'DragTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      dialogVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      centerDialogVisible: false,
      form: {
        paramName: '',
        paramValue: '',
        remark: '',
        systemDefaultParamsId: '',
      },
      rules: {
        paramName: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ],
        paramValue: [
          { required: true, message: '请输入参数值', trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      getSystemParameterList().then(response => {
        this.list = response
        this.total = this.list.length
        this.listLoading = false
      })
    },
    // 编辑
    editor(index, id) {
      this.dialogVisible = true
      this.form.paramName = this.list[index].paramName
      this.form.paramValue = this.list[index].paramValue
      this.form.remark = this.list[index].remark
      this.form.systemDefaultParamsId = this.list[index].systemDefaultParamsId
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveSystemParameterList(this.form).then(() => {
            this.$message.success('编辑成功！')
            this.getList()
            this.dialogVisible = false
          }).catch(this.$message.success('编辑成功！'))
        }
      })
      this.listLoading = false
    },

  },
}
</script>

<style>
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
</style>

<style scoped>
  .icon-star{
    margin-right:2px;
  }
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .show-d{
    margin-top: 15px;
  }
  .text-center{
    text-align:center;
  }
  .elinput-width{
    width:500px;
  }
  .el-input{
    width: 80%;
  }
</style>
