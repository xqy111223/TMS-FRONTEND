// 终端管理 -- 软件管理  --  操作日志

<template>
  <div class="app-container">
    <div class="mb20">
      <el-date-picker
        v-model="oprateTime"
        type="datetimerange"
        format="yyyy-MM-dd HH:mm"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="mr5"
        clearable/>

      <el-input placeholder="请输入操作人" class="filter-item mr5" v-model="listQuery.oprater" clearable/>
      <el-select placeholder="请选择操作类型" class="filter-item mr5" v-model="oprateType" clearable>
        <el-option v-for="item in operationTypeStatusData" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
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

      <el-table-column label="操作时间">
        <template slot-scope="scope">
          <span>{{ scope.row.operateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作人" prop="operatorName"/>

      <el-table-column label="操作类型">
        <template slot-scope="scope">
          <span>{{ scope.row.operateType }}</span>
          <el-button v-if="scope.row.operateType === '自检'" size="mini" @click="showDialog(scope.row.deviceId)">详情</el-button>
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
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getOplogList, getSelfCheck } from '@/api/remote'
import { operationTypeStatus } from '@/config/statusType';

export default {
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
      selfCheckData: null,
      operationTypeStatusData: operationTypeStatus.data,
      list: null,
      total: 0,
      listLoading: true,
      oprateTime: [],      /* 操作时间 */
      oprateTimeQuery: [],
      oprateType: '',
      listQuery: {
        pageNum: 1,
        size: 10,
        oprateType: '',           /* 操作类型 */
        oprater: '',              /* 操作人 */
        classroomId: '',           /* 教室ID */
        oprateStartTime: '',          /* 转换成时间戳传给后台 */
        oprateFinshTime: ''
      },
    }
  },
  created() {
    this.getList()
    // console.log(this.$route.query.id)
    this.listQuery.classroomId = this.$route.query.id
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
    // 获取操作日志列表
    getList() {
      this.oprateTime.map(v => {
        this.oprateTimeQuery.push(v.valueOf())
      })
      this.listQuery.oprateStartTime = this.oprateTimeQuery[this.oprateTimeQuery.length - 2]  // 每次点击查询 获取最新查询的开始时间
      this.listQuery.oprateFinshTime = this.oprateTimeQuery[this.oprateTimeQuery.length - 1]  // 每次点击查询 获取最新查询的结束时间

      // console.log(this.oprateTimeQuery)
      // console.log(this.listQuery.oprateStartTime)
      // console.log(this.listQuery.oprateFinshTime)
      if (this.oprateType === '0') {
        this.listQuery.oprateType = '1'
      } else if (this.oprateType === '1') {
        this.listQuery.oprateType = '2'
      } else {
        this.listQuery.oprateType = '3'
      }
      this.listLoading = true
      console.log(this.listQuery)
      getOplogList(this.listQuery).then(response => {
        this.list = response.list
        console.log(this.list)
        this.total = response.total
        this.listLoading = false
        this.listQuery.oprateTimeQuery = []
      })
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
</style>
