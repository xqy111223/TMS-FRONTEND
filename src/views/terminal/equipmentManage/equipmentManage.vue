// 终端管理 -- 设备管理

<template>
  <div class="app-container">
  <!-- 查询 -->
  <div>
    <div class="demo-input-suffix mb20">
      <AreaSelect :onChange="changeAreaSelect"/>
      <el-input v-model="listQuery.softVer" placeholder="请输入当前版本号" class="mr5"></el-input>
      <el-input v-model="listQuery.registUserName" placeholder="请输入注册人" class="mr5"></el-input>
      <el-input v-model="listQuery.clzroomName" placeholder="请输入教室名称" class="filter-item"/>
    </div>
    <div class="demo-input-suffix mb20">
      <el-date-picker v-model="dataTime" type="datetimerange"  format="yyyy-MM-dd HH:mm" range-separator="至" 
        start-placeholder="注册开始日期" end-placeholder="注册结束日期" class="mr5">
      </el-date-picker>
      <el-select clearable placeholder="请选择激活状态" v-model="listQuery.activeFlag" class="filter-item mr5">
        <el-option v-for="item in activeStatusData" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select clearable placeholder="注册方式" v-model="listQuery.registType" class="filter-item mr5">
        <el-option v-for="item in registStatusData" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select clearable placeholder="状态" v-model="listQuery.deviceStat" class="filter-item mr5">
        <el-option v-for = "item of stateStatusData" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button class="filter-item" type="primary" @click="getList">
        查询
      </el-button>
    </div>
  </div>
    <!-- 操作 -->
    <div class="hidden mb20">
      <p class="total-count fl">共{{total}}条数据</p>
      <div class="fr">
        <router-link :to="'/terminal/equipment-register/'">
          <el-button class="filter-item" type="primary">
            注册
          </el-button>
        </router-link>

        <router-link :to="'/terminal/equipment-batch-upgrade/'">
          <el-button class="filter-item" type="primary">
            批量升级
          </el-button>
        </router-link>
      </div>
    </div>

    <!-- table -->
    <el-table v-loading="listLoading" ref="dragTable" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" width="65" type="index" label="序号">
      </el-table-column>
      <el-table-column width="180px" align="center" label="教室名称">
        <template slot-scope="scope">
          <span>{{ scope.row.clzroomName }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="30px" label="所在区域">
        <template slot-scope="scope">
          <span>{{ scope.row.areaNamePath }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="所在学校">
        <template slot-scope="scope">
          <span>{{ scope.row.schoolName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="注册时间">
        <template slot-scope="scope">
          {{ scope.row.registTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="95" label="注册人">
        <template slot-scope="scope">
          <span>{{ scope.row.registUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" width="110" label="注册方式">
        <template slot-scope="scope">
          {{ scope.row.registTypeStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="80" label="激活状态">
        <template slot-scope="scope">
          {{ scope.row.activeFlagStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="当前版本号">
        <template slot-scope="scope">
          {{ scope.row.softVer }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="80" label="升级状态">
        <template slot-scope="scope">
          {{ scope.row.updateStatStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="80" label="状态">
        <template slot-scope="scope">
          {{ scope.row.deviceStatStr }}
        </template>
      </el-table-column>

      <el-table-column align="center" width="280" label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button size="mini">
              设备操作 <i class="el-icon-arrow-down el-icon--right"></i>
             </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="'/terminal/equipment-see/' + scope.row.deviceInfoId">查看</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="'/terminal/equipment-edit/' + scope.row.deviceInfoId">编辑</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="deleteDevice(scope.row.deviceInfoId)">删除</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown class="ml5">
            <el-button size="mini">
              升级操作 <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="'/terminal/equipment-upgrade/' + scope.row.deviceInfoId">升级</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="'/terminal/equipment-upgrade-record/'+ scope.row.deviceInfoId">升级记录</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { terminalList, deleteDevice } from '@/api/terminal.js';
import { activeStatus, registStatus, stateStatus } from '@/config/statusType.js';   // 激活状态、 注册方式标志、状态标志
import AreaSelect from '@/components/AreaSelect';
import Pagination from '@/components/Pagination';  // Secondary package based on el-pagination

export default {
  name: 'DragTable',
  components: {
    Pagination, 
    AreaSelect 
  },
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
      dataTime: [],
      activeStatusData: activeStatus.data,
      registStatusData: registStatus.data,
      stateStatusData: stateStatus.data,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        size: 10,
        activeFlag: '',
        baseAreaId: '',
        schoolId: '',
        clzroomName: '',
        deviceStat: '',
        softVer: '',
        startTime: '',
        endTime: '',
        registType: '',
        registUserName: ''
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true;
      if(this.dataTime.length > 0){
        this.listQuery.startTime = this.dataTime[0].getTime();
        this.listQuery.endTime = this.dataTime[1].getTime();
      }
      terminalList(this.listQuery).then(response => {
        this.list = response.list;
        this.total = response.total;
        this.listLoading = false;
      })

    },

    // 删除设备
    deleteDevice(deviceInfoId) {
      this.$confirm('确定删除此数据？').then(() => {
        deleteDevice(deviceInfoId).then(v => {
          this.$message.success('删除成功');
          this.getList();
        });
      }).catch(() => {});
    },

    // 改变区域或学校的值时
    changeAreaSelect(selectObj){
      this.listQuery.baseAreaId = selectObj.baseAreaId;
      this.listQuery.schoolId = selectObj.baseSchoolId;
    }
  }
}
</script>

