// 终端管理 -- 设备管理  --- 升级操作 -- 升级记录

<template>
  <div class="app-container">
  <!-- 查询 -->
  <div>
    <div class="demo-input-suffix mb20">

      <el-date-picker v-model="dataTime" type="datetimerange"  format="yyyy-MM-dd HH:mm" range-separator="至"
        start-placeholder="升级开始日期" end-placeholder="升级结束日期" class="mr5">
      </el-date-picker>

      <!--<el-select clearable placeholder="请选择升级模式" v-model="listQuery.upgradeMode" class="filter-item mr5">-->
        <!--<el-option v-for="item in upgradeModeStatusData" :key="item.id" :label="item.name" :value="item.id" />-->
      <!--</el-select>-->

      <el-select clearable placeholder="强制升级" v-model="listQuery.upgradeType" class="filter-item mr5">
        <el-option v-for="item in upgradeTypeData" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>

      <el-input v-model="listQuery.oprater" placeholder="操作人" class="mr5"></el-input>

      <el-button class="filter-item" type="primary" @click="getList">查询</el-button>
    </div>
  </div>
    <!-- 操作 -->
    <p class="total-count mb20">共{{total}}条数据</p>
    <!-- table -->
    <el-table v-loading="listLoading" ref="dragTable" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" width="65" label="序号" type="index">
      </el-table-column>

      <el-table-column align="center" label="升级时间">
        <template slot-scope="scope">
          {{ scope.row.upgradeTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作人">
        <template slot-scope="scope">
          <span>{{ scope.row.oprater }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="升级前版本">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.formerVersion }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="升级后版本">
        <template slot-scope="scope">
          <span>{{ scope.row.finshType }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作系统">
        <template slot-scope="scope">
          {{ scope.row.ostype }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="强制升级">
        <template slot-scope="scope">
          {{ getUpgradeType(scope.row.upgradeType) }}
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { upgradeRecordList } from '@/api/terminal.js';
import { upgradeType } from '@/config/statusType.js';   // 升级模式、强制升级
import Pagination from '@/components/Pagination';  // Secondary package based on el-pagination

export default {
  name: 'EquipmentUpgradeRecord',
  components: {
    Pagination
  },
  data() {
    return {
      dataTime: [],
      // upgradeModeStatusData: upgradeModeStatus.data,
      upgradeTypeData: upgradeType.data,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        size: 10,
        deviceId: '',
        upgradeStartTime: '',
        upgradeFinshTime: '',
        oprater: '',        // 操作人
        upgradeType: '',
        upgradeMode: ''
      }
    }
  },
  created() {
    // 获取设备id
    this.listQuery.deviceId = this.$route.params.id;

    // 获取升级记录列表
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      // 获取注册时间
      if(this.dataTime.length > 0){
        this.listQuery.upgradeStartTime = this.dataTime[0].getTime();
        this.listQuery.upgradeFinshTime = this.dataTime[1].getTime();
      }
      upgradeRecordList(this.listQuery).then(response => {
        this.list = response.list;
        this.total = response.total;
        this.listLoading = false;
      });
    },

    // 获取是否强制升级
    getUpgradeType(value) {
      return upgradeType.getText(value);
    }
  }
}
</script>

<style scoped>

</style>


