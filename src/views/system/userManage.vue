<!--用户管理-->
<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <div class="mb20">
      <el-input v-model="listQuery.username" placeholder="请输入用户名" class="filter-item mr5"/>
      <el-input v-model="listQuery.realname" placeholder="请输入姓名" class="filter-item mr5"/>
      <el-select v-model="listQuery.roleName" placeholder="请选择角色" class="filter-item mr5" clearable>
        <el-option v-for="item in roleStatusData" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select v-model="listQuery.locked" placeholder="请选择状态" class="filter-item mr5" clearable>
        <el-option v-for="item in lockStatusData" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-button icon="el-icon-search" class="filter-item" type="primary" @click="getList()">查询</el-button>
      <el-button id="userSetting" class="filter-item fr" type="primary" icon="el-icon-setting" @click="dialogVisible = true">
        用户设置
      </el-button>
      <el-dialog
        :visible.sync="dialogVisible"
        title="编辑参数"
        width="40%">

        <el-form ref="form" :rules="rules" :model="form">
          <el-form-item :label-width="formLabelWidth" label="非法登录次数" prop="illegalLoginTimes" required>
            <el-input v-model.number="form.illegalLoginTimes" autocomplete="off" type="number"/>  次
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="锁定时间" prop="lockTime" required>
            <el-input v-model.number="form.lockTime" autocomplete="off" type="number"/>  小时
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="账号有效时间" prop="activeTime" required>
            <el-input v-model.number="form.activeTime" autocomplete="off" type="number"/>  分钟
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitUserSetting('form')">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <router-link :to="'/system/add-user/'">
        <el-button class="filter-item fr" type="primary" icon="el-icon-edit" >
          新增用户
        </el-button>
      </router-link>
    </div>
    <div>
      <p class="total-count">共{{ total }}条数据</p>
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

      <el-table-column width="180px" label="用户名" prop="username"/>

      <el-table-column min-width="100px" label="姓名" prop="realname"/>

      <el-table-column width="200px" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="310px" label="角色">
        <template slot-scope="scope">
          <span>{{ roleNames }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建人" width="196" prop="createUserId"/>

      <el-table-column class-name="status-col" label="状态" width="110" >
        <template slot-scope="scope">
          <span>{{ getLockStatus(scope.row.locked) }}</span>
          <el-button v-if="scope.row.locked === '2'" size="mini" @click="centerDialogVisible2 = true">解锁</el-button>
          <el-dialog
            :visible.sync="centerDialogVisible2"
            title="解锁"
            width="30%"
            center>
            <span>确认解锁{{ scope.row.username }}？</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirmUnlocked(scope.row.adminUserId)">确 定</el-button>
              <el-button @click="centerDialogVisible2 = false">取 消</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <router-link :to="'/system/userDetail/' + scope.row.adminUserId">
            <el-button size="mini" >查看</el-button>
          </router-link>
          <router-link :to="'/system/edit-user/' + scope.row.adminUserId ">
            <el-button size="mini">编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click.native.prevent="remove(scope.row.adminUserId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { unlocked } from '@/api/system';
import { getUserList } from '@/api/system'
import { roleStatus } from '@/config/statusType'
import { removeUser } from '@/api/system'
import { saveUserSetting } from '@/api/system'
import { lockStatus } from '@/config/statusType'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'DragTable',
  components: { Pagination },
  data() {
    return {
      roleNames: '',
      lockStatusData: lockStatus.data,
      roleStatusData: roleStatus.data,
      list: null,
      total: 0,
      centerDialogVisible2: false,
      listLoading: true,
      formLabelWidth: '250px',
      dialogVisible: false,
      // 查询/获取列表时的参数
      listQuery: {
        page: 1,
        limit: 10,
        roleName: '',
        locked: '',
        username: '',
        realname: '',
      },
      // 需要校验的数据
      form: {
        illegalLoginTimes: '',
        lockTime: '',
        activeTime: '',
      },
      // 校验规则
      rules: {
        illegalLoginTimes: [
          { required: true, message: '请输入非法登录次数', trigger: 'blur', type: 'number' }
        ],
        lockTime: [
          { required: true, message: '请输入锁定时间', trigger: 'blur', type: 'number' }
        ],
        activeTime: [
          { required: true, message: '请输入账号有效时间', trigger: 'blur', type: 'number' }
        ],
      },
    }
  },
  created() {
    // 获取用户列表
    this.getList()
  },
  methods: {
    // 确认解锁
    confirmUnlocked(adminUserId) {
      unlocked(adminUserId).then(response => {
        this.$message.success('设置成功！')
        this.centerDialogVisible2 = false
      }).catch(() => {})
    },

    // 获取用户列表
    getList() {
      this.listLoading = true
      console.log(this.listQuery)
      getUserList(this.listQuery).then(response => {
        this.list = response.list
        this.list.map(v => {
          const roleNameList = [];
          v.roleList.map(s => {
            roleNameList.push(s.roleName)
            this.roleNames = roleNameList.join(',');
          })
        })
        this.total = this.list.length
        this.listLoading = false
      })
    },

    // 提交表单
    submitUserSetting(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveUserSetting(this.form).then(response => {
            this.$message.success('设置成功！')
            this.dialogVisible = false
          }).catch(() => {})
        }
      })
    },

    // 删除用户信息
    remove(userId) {
      this.$confirm('确认删除该数据？').then(() => {
        removeUser(userId).then(() => {
          this.$message.success('删除成功！')
          this.getList()
        })
      }).catch(() => {});
    },

    // 获取锁定标志
    getLockStatus(state) {
      return lockStatus.getText(state)
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
  #userSetting{
    margin-left: 10px;
  }
</style>
