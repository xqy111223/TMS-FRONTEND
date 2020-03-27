// 终端管理 -- 软件管理

<template>
  <div class="app-container">
    <div class="mb20">
      <el-input placeholder="请输入软件名称" class="filter-item mr5" v-model="listQuery.softwareName"/>
      <el-select placeholder="请选择操作系统" class="filter-item mr5" v-model="listQuery.osTypeId" clearable>
        <el-option v-for="item in osTypeStatusData" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-input placeholder="请输入版本号" class="filter-item mr5" v-model="listQuery.softwareVer"/>
      <el-button class="filter-item ml5" type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </div>
    <div class="mb20">
      <p class="total-count fl">共{{ total }}条数据</p>
      <el-button class="filter-item fr" type="primary" icon="el-icon-edit" @click="add">
        新增版本
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="序号" width="65" type="index"/>

      <el-table-column label="软件名称" prop="softwareName"/>

      <el-table-column label="操作系统" prop="osTypeId"/>

      <el-table-column label="版本号" prop="softwareVer"/>

      <el-table-column label="上传时间">
        <template slot-scope="scope">
          <span>{{ scope.row.uploadTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="功能描述" prop="functionDescription"/>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button size="mini" >
              软件操作<i class="el-icon-arrow-down el-icon--right"/>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="edit(scope.$index, scope.row.softwareManageId)">编辑</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="deletes(scope.$index, scope.row.softwareManageId)">删除</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <router-link :to="'/terminal/operation-log/'+ scope.row.softwareManageId">
            <el-button size="mini" >
              操作日志
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.size" @pagination="getList" />

    <!--新增/编辑弹窗-->
    <el-dialog
      :title=titleMap[dialogStatus]
      :visible.sync="dialogVisible"
      width="30%">

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="软件名称">
          <el-input v-model="form.softwareName"/>
        </el-form-item>
        <el-form-item label="操作系统" prop="osTypeId">
          <el-select v-model="form.osTypeId" placeholder="请选择操作系统" clearable>
            <el-option v-for="item in osTypeStatusData" :label="item.name" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="版本号" prop="softwareVer">
          <el-input v-model="form.softwareVer"/>
        </el-form-item>

        <el-form-item
          label="上传软件"
          :rules="[
            { required: true, message: '请上传软件',trigger:'blur'},
          ]"
          prop="">
          <el-upload
            :limit="3"
            :file-list="fileList"
            class="upload-demo"
            accept=".exe"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
          <!--<el-input v-model="form.uploadSoftware"></el-input>-->
        </el-form-item>

        <el-form-item label="功能描述">
          <el-input v-model="form.functionDescription" type="textarea"/>
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
import { osTypeStatus } from '@/config/statusType'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getSoftList, addVersion, editVersion, deleteVersion } from '@/api/terminal'

export default {
  name: 'SoftwareManage',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status];
    }
  },
  data() {
    return {
      dialogVisible: false,
      osTypeStatusData: osTypeStatus.data,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        size: 10,
        softwareName: '',      // 软件名称
        osTypeId: '',          // 操作系统
        softwareVer: '',       // 版本号
        softwareManageId: ''   // 软件id
      },
      // 新增/编辑
      form: {
        softwareName: '',         // 软件名称
        osTypeId: '',             // 操作系统
        softwareVer: '',          // 版本号
        uploadSoftware: '',       // 上传软件
        functionDescription: '',  // 功能描述
        softwareManageId: '',     // 软件id
      },
      // 校验规则
      rules: {
        osTypeId: [
          { required: true, message: '请选择操作系统', trigger: 'blur' }
        ],
        softwareVer: [
          { required: true, message: '请输入版本号', trigger: 'blur' },
        ],

      },
      // 上传文件列表
      fileList: [],
      // 新增or编辑弹窗标题
      titleMap: {
        add: '新增版本',
        edit: '编辑版本',
      },
      //  新增and编辑弹窗标题
      dialogStatus: '',
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getSoftList(this.listQuery).then(response => {
        this.list = response.list
        console.log(this.list)
        this.total = response.total
        this.listLoading = false
      })
    },
    // 点击查询
    search() {
      console.log(this.listQuery)
      this.getList();
    },

    // 新增or编辑版本
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.softwareManageId) {
            editVersion(this.form).then(response => {
              this.$message.success('编辑成功！')
              // 关闭弹窗
              this.dialogVisible = false
              // 刷新列表
              this.getList()
            }).catch(this.$message.error('编辑失败！'))
          } else {
            addVersion(this.form).then(response => {
              this.$message.success('新增成功！')
              // 关闭弹窗
              this.dialogVisible = false
              // 刷新列表
              this.getList()
            }).catch(this.$message.error('新增失败！'))
          }
        }
      })
    },

    // 点击编辑，并把数据进行回填
    edit(index, softwareManageId) {
      //  数据进行回填
      this.form.softwareName = this.list[index].softwareName
      this.form.osTypeId = this.list[index].osTypeId
      this.form.softwareVer = this.list[index].softwareVer
      this.form.uploadSoftware = this.list[index].uploadSoftware
      this.form.functionDescription = this.list[index].functionDescription
      this.form.softwareManageId = this.list[index].softwareManageId
      // 显示弹窗
      this.dialogVisible = true
      // 编辑标题
      this.dialogStatus = 'edit'
    },

    // 点击新增
    add() {
      //  将数据进行清空
      this.form.softwareName = ''
      this.form.osTypeId = ''
      this.form.softwarever = ''
      this.form.uploadSoftware = ''
      this.form.functionDescription = ''
      this.form.softwareManageId = ''
      // 显示弹窗
      this.dialogVisible = true
      // 新增标题
      this.dialogStatus = 'add'
    },
    // 点击删除
    deletes(softwareManageId) {
      this.$confirm('确定要删除此数据？').then(() => {
        deleteVersion(softwareManageId).then(response => {
          this.$message('删除成功！')
          this.getList()
        })
      }).catch(() => {})
    }
  }
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
.el-textarea{
  vertical-align: top;
  width: 70%;
}
.el-textarea__inner{
  height: 100px !important;
  resize: none !important;
}
.el-form-item__error{
  left: 30px;
}
</style>
