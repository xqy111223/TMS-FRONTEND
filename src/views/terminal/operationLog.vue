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
        class="mr5"/>

      <!--<span style="font-size: 16px">操作时间 :</span>-->
      <!--<el-input placeholder="请选择操作时间"  class="filter-item" v-model="listQuery.minInterval"/>
      至
      <el-input placeholder="请选择操作时间"  class="filter-item mr5" v-model="listQuery.maxInterval"/>-->
      <el-input placeholder="请输入操作人" class="filter-item mr5" v-model="listQuery.oprater"/>
      <el-select placeholder="请选择操作内容" class="filter-item mr5" v-model="listQuery.oprateInfo">
        <el-option v-for="item in roleStatusData" :key="item.id" :label="item.name" :value="item.id"/>
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
          <span>{{ scope.row.oprateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作人" prop="oprater"/>

      <el-table-column label="软件名称" prop="softwareName"/>

      <el-table-column label="操作系统" prop="osTypeId"/>

      <el-table-column label="版本号" prop="softwareVer"/>

      <el-table-column label="上传软件" prop="uploadSoftWare"/>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { roleStatus } from '@/config/statusType'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getOperationList } from '@/api/terminal'

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
      roleStatusData: roleStatus.data,
      list: null,
      total: 0,
      listLoading: true,
      oprateTime: [],      /* 操作时间 */
      oprateTimeQuery: [],
      listQuery: {
        pageNum: 1,
        size: 10,
        oprateInfo: '',           /* 操作内容 */
        oprater: '',              /* 操作人 */
        softwareId: '',           /* 软件ID */
        oprateStartTime: '',          /* 转换成时间戳传给后台 */
        oprateFinshTime: ''
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.oprateTime.map(v => {
        this.oprateTimeQuery.push(v.valueOf())
      })
      this.listQuery.oprateStartTime = this.oprateTimeQuery[this.oprateTimeQuery.length - 2]
      this.listQuery.oprateFinshTime = this.oprateTimeQuery[this.oprateTimeQuery.length - 1]

      console.log(this.oprateTimeQuery)
      console.log(this.listQuery.oprateStartTime)
      console.log(this.listQuery.oprateFinshTime)

      this.listLoading = true
      getOperationList(this.listQuery).then(response => {
        this.list = response.list
        // console.log(this.listQuery)
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
