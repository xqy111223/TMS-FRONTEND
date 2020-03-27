<template>
  <div class="app-container">
    <div class="mb20">
      <el-select v-model="listQuery.schoolId" placeholder="请选择所在学校" class="filter-item">
        <el-option v-for="item in schoolNameList" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-input v-model="listQuery.clzroomName" placeholder="请输入教室名" class="filter-item"/>
      <el-select v-model="listQuery.warnStatus" placeholder="请选择异常情况" class="filter-item" clearable>
        <el-option v-for="item in errorStatusData" :key="item.id" :label="item.name" :value="item.id"/>
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

      <el-table-column label="教室名称" prop="clzroomName"/>

      <el-table-column label="所在区域" prop="areaNamePath"/>

      <el-table-column label="所在学校" prop="schoolName"/>

      <el-table-column label="CPU使用率" prop="cpuRatio"/>

      <el-table-column label="磁盘使用率" prop="diskUse"/>

      <el-table-column label="内存使用率" prop="memoryUse"/>

      <el-table-column label="历史数据">
        <template>
          <el-button size="mini" @click="showDialog()">查看</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog
      v-loading="listLoading"
      :visible.sync="dialogVisible"
      title="提示"
      width="776px">
      <div class="block mb20">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          size="small">
        </el-date-picker>
        <el-button class="filter-item" type="primary" icon="el-icon-search" size="small" @click="search()">查询</el-button>
      </div>
      <div id="main1" class="className" style="height: 225px;width: 712px"></div>
      <div id="main2" class="className" style="height: 225px;width: 712px"></div>
      <div id="main3" class="className" style="height: 225px;width: 712px"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getExceptionDetailList } from '@/api/terminal';
import { getSchoolList } from '@/api/commons';
import { errorStatus } from '@/config/statusType';
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'

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
  mixins: [resize],
  data() {
    return {
      value1: new Date(),
      dialogVisible: false,
      errorStatusData: errorStatus.data,
      schoolNameList: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        warnStatus: '',
        currentStatus: '',
        schoolId: '',
        clzroomName: '',
        areaId: ''
      },
      time: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
        '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
        '20:30', '21:00', '21:30', '22:00'
      ],
      value: [0, 0.3, 0.4, 0.8, 0.5, 0.9, 0.1, 0.3, 0.4, 0.8, 0.5, 0.9, 0.1, 0.5, 0.9, 0.1, 0.3, 0.4, 0.8, 0.5, 0.9, 0.1, 0.5, 0.9, 0.9,
        0.1, 0.5, 0.9, 0.9]
    }
  },
  created() {
    console.log(this.$route.params.id)
    this.getList()
    this.getSchoolList()
    this.listQuery.areaId = this.$route.params.id
  },
  methods: {
    search() {
      console.log(this.value1)
    },
    showDialog() {
      this.dialogVisible = true
      setTimeout(() => {
        this.initChart()
      })
    },
    initChart() {
      var myChart1 = echarts.init(document.getElementById('main1'))
      var myChart2 = echarts.init(document.getElementById('main2'))
      var myChart3 = echarts.init(document.getElementById('main3'))

      myChart1.setOption({
        title: {
          text: 'cpu使用率',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.time
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          itemStyle: {
            normal: {
              color: 'rgba(47, 82, 143)',
              lineStyle: {
                color: 'rgba(47, 82, 143)'
              }
            }
          },
          data: this.value,
          type: 'line'
        }]
      })
      myChart2.setOption({
        title: {
          text: '磁盘使用率',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.time
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          itemStyle: {
            normal: {
              color: 'rgba(47, 82, 143)',
              lineStyle: {
                color: 'rgba(47, 82, 143)'
              }
            }
          },
          data: this.value,
          type: 'line'
        }]
      })
      myChart3.setOption({
        title: {
          text: '内存使用率',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.time,
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          itemStyle: {
            normal: {
              color: 'rgba(47, 82, 143)',
              lineStyle: {
                color: 'rgba(47, 82, 143)'
              }
            }
          },
          data: this.value,
          type: 'line'
        }]
      })

    },

    // 获取总设备列表
    getList() {
      this.listLoading = true
      getExceptionDetailList(this.listQuery).then(response => {
        this.list = response.list
        console.log(this.list)
        console.log(response)
        this.total = response.total
        this.listLoading = false
      })
    },

    // 获取该地区学校下拉框
    getSchoolList() {
      this.listLoading = true
      getSchoolList(this.$route.params.id).then(response => {
        response.map(v => {
          this.schoolNameList.push(v.schoolName)
        })
      })
    },

    // 获取当前状态
    getCurrentStatus(state) {
      return currentStatus.getText(state)
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
</style>
