<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->

    <el-form class="mb20" label-width="80px" size="mini" inline border="1px">
      <AreaSelect
        :on-change="changeAreaList"
        :has-school-select="hasSchoolSelect"
        :select-area-path="selectAreaPath"
      />
      <el-input v-model="listQuery.clzroomName" placeholder="教室名称" class="filter-item mr5"/>

      <el-select v-model="listQuery.status" placeholder="请选择状态" class="mr5" clearable >
        <el-option v-for="item in currentStatusData" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>

      <el-button class="filter-item " type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
    </el-form>

    <div>
      <p class="total-count">共{{ total }}条数据</p>
    </div>

    <el-table v-loading="listLoading" ref="dragTable" :data="list" row-key="id" border fit highlight-current-row class="mb20" style="width: 100%">

      <el-table-column label="序号" width="65" type="index"/>

      <el-table-column label="教室名称" prop="clzroomName"/>

      <el-table-column label="所在区域" prop="areaNamePath"/>

      <el-table-column label="所在学校" prop="schoolName"/>

      <el-table-column label="最近状态" prop="recentStatus"/>

      <el-table-column label="最近自检情况">
        <template slot-scope="scope">
          <span>{{ scope.row.selfCheckTime | parseTime('{y}-{m}-{d}') }}</span>
          <el-button size="mini" @click="showDialog(scope.row.deviceRemoteControlLogId)">详情</el-button>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="操作" >
        <template slot-scope="scope">
          <el-dropdown class="mr5">
            <el-button size="mini">
              远程操作<i class="el-icon-arrow-down el-icon--right"/>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item onclick="selfCheck()">{{ getSelfCheckStatus(0) }}</el-dropdown-item>
              <el-dropdown-item onclick="restart()">{{ getRestartStatus(0) }}</el-dropdown-item>
              <el-dropdown-item onclick="shutDown()">{{ getShutDownStatus(0) }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <router-link :to="{path:'/remote/remote-oplog', query:{id: scope.row.deviceId }}">
            <el-button size="mini">操作日志</el-button>
          </router-link>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      title="检测详情"
      width="35%">
      <template slot-scope="scope">
        <div class="block">
          <span style="width: 50%;display: inline-block">检测时间:{{ selfCheckData.checkTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span><span>检测人:{{ selfCheckData.checkUserName }}</span>
        </div>
        <div class="block">
          <div class="title mb15">检测情况</div>
          <div class="mb15">
            <span class="smalltitle">1.麦克风:</span><span>{{ }}正常,</span><span>{{ }}异常</span>
            <div>
              <span>异常设备:</span>
            </div>
          </div>
          <div class="mb15">
            <span class="smalltitle">2.音  响:</span><span>{{ }}正常,</span><span>{{ }}异常</span>
            <div>
              <span>异常设备:</span>
            </div>
          </div>
          <div class="mb15">
            <span class="smalltitle">3.摄像机:</span><span>{{ }}正常,</span><span>{{ }}异常</span>
            <div>
              <span>异常设备:</span>
            </div>
          </div>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->
    <el-pagination
      :total="1000"
      background
      layout="prev, pager, next"
    />

  </div>
</template>

<script>
import { selfChecking, restarting, shutDowning, getRemoteControlList, getSelfCheck } from '@/api/remote';
import  AreaSelect  from '@/components/AreaSelect'
import { selfCheckStatus, restartStatus, shutDownStatus, currentStatus } from '@/config/statusType'

export default {
  name: 'DragTable',
  components: { AreaSelect },
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
      dialogVisible: false,
      selfCheckData: null,
      currentStatusData: currentStatus.data,
      selectAreaPath: [],
      hasSchoolSelect: true,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        size: 10,
        baseAreaId: '',
        schoolId: '',
        clzroomName: '',
        status: ''
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 自检详情弹窗
    showDialog(id) {
      this.dialogVisible = true
      getSelfCheck(id).then(response => {
        // this.selfCheckData = response
        console.log(response)
        response.map(v => {
          this.selfCheckData = v
          console.log(this.selfCheckData.checkTime)
        })
      })
      console.log(id)
    },
    selfCheck() {
      selfChecking().then(response => {

      })
    },
    restart() {
      restarting().then(response => {

      })
    },
    shutDown() {
      shutDowning().then(response => {

      })
    },
    changeAreaList(data) {
      this.listQuery.schoolId = data.baseSchoolId
      this.listQuery.baseAreaId = data.baseAreaId
    },
    getList() {
      this.listLoading = true
      getRemoteControlList(this.listQuery).then(response => {
        console.log(this.listQuery)
        this.total = response.total
        this.list = response.list
        this.total = response.list.total
        this.listLoading = false
      })
    },
    getSelfCheckStatus(state) {
      return selfCheckStatus.getText(state)
    },
    getRestartStatus(state) {
      return restartStatus.getText(state)
    },
    getShutDownStatus(state) {
      return shutDownStatus.getText(state)
    },
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
  .block{
    width: 80%;
    height: 100%;
    margin: 0 auto 30px auto;
  }
  .title{
    font-size: 16px;
    font-weight: 700;
  }
  .smalltitle{
    font-weight: 700;
  }
  .mb15{
    margin-bottom: 20px;
  }
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
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
