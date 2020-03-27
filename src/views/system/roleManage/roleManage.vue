<template>
  <div class="app-container">
    <div>
      <p class="total-count fl">共{{total}}条数据</p>
      <div class="fr">
        <router-link :to="'/system/add-role/'">
          <el-button class="filter-item fr" type="primary" icon="el-icon-edit" >
            新增角色
          </el-button>
        </router-link>
      </div>
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
      <el-table-column label="序号" width="65" type="index">
      </el-table-column>

      <el-table-column width="300" label="角色名称" prop="roleName">
      </el-table-column>

      <el-table-column min-width="300" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')  }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" label="绑定用户数">
        <template slot-scope="scope">
          <span class="view-detail" @click="openUserList(scope.row.adminRoleId)">{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column width="500" label="备注" prop="roleDesc">
      </el-table-column>

      <el-table-column label="状态" width="95">
        <template slot-scope="scope">
          <span>{{ getLockStatus(scope.row.locked) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <router-link :to="'/system/view-role/' + scope.row.adminRoleId" >
            <el-button size="mini" >查看</el-button>
          </router-link>
          <router-link :to="'/system/edit-role/' + scope.row.adminRoleId" >
            <el-button size="mini" >编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="delRole(scope.row.adminRoleId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.size" @pagination="getList" />

    <!-- 查看绑定用户弹窗 -->
    <el-dialog title="绑定用户" :visible.sync="userListdialogVisible" width="700px">
      <el-table :data="roleUserList">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column property="username" label="用户名" width="300"></el-table-column>
        <el-table-column property="realname" label="姓名"></el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="roleUserTotal" :page.sync="roleUserQuery.pageNum" :limit.sync="roleUserQuery.size" @pagination="getRoleUserList" />
    </el-dialog>

  </div>
</template>

<script>
import {getRoleList, getRoleUserList, deleteRole} from '@/api/system'
import {lockStatus} from '@/config/statusType'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'roleManage',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      userListdialogVisible: false,
      listQuery: {
        pageNum: 1,
        size: 10,
      },
      roleUserQuery: {
        pageNum: 1,
        size: 10,
      },
      roleUserTotal: 0,
      selectAreaPath: ['6sdfsf23rfsdf', '6sdfsf23rfsdf', '6sdfsf23rfsdf'],
      roleUserList: [],
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true
      getRoleList(this.listQuery).then(response => {
        this.list = response.list;
        this.total = response.total;
        this.listLoading = false
      })
    },

    //获取状态值
    getLockStatus(status){
      return lockStatus.getText(status);
    },

    // 删除用户角色
    delRole(adminRoleId){
      this.$confirm('确定删除此数据？').then(() => {
        deleteRole(adminRoleId).then(v => {
          this.$message.success('删除成功')
          this.getList();
        })
      }).catch(() => {return});
    },

    // 绑定用户弹窗
    openUserList(adminRoleId) {
      this.getRoleUserList();
      this.userListdialogVisible = true;
    },

    //获取绑定用户
    async getRoleUserList() {
      const response = await getRoleUserList(this.roleUserQuery);
      this.roleUserList = response.list;
      this.roleUserTotal = response.total;
    }
  }
}
</script>

<style scoped>
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
</style>
