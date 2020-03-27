<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->

    <el-form :data="list" label-width="80px" size="mini" class="mb20" inline>

      <AreaSelect
        :on-change="changeSelect"
        :select-area-path="selectAreaPath"/>

      <el-input placeholder="教室名称" class="filter-item mr5"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" align="right" @click="getList()">查询</el-button>

    </el-form>

    <el-table v-loading="listLoading" ref="dragTable" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">

      <el-table-column label="序号" width="65" type="index"/>

      <el-table-column label="教室名称" prop="clzroomName"/>

      <el-table-column label="所在区域" prop="areaNamePath"/>

      <el-table-column label="所在学校" prop="schoolName"/>

      <el-table-column label="操作" prop="option">
        <template slot-scope="scope">
          <router-link :to="'/remote/remote-video-config/' + scope.row.adminRoleId" >
            <el-button size="mini" >音视频配置</el-button>
          </router-link>
          <router-link :to="'/remote/remote-broadcast-config/' + scope.row.adminRoleId" >
            <el-button size="mini" class="ml10">导播配置</el-button>
          </router-link>
        </template>
      </el-table-column>

    </el-table>
    <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
    <!--<div class="show-d">{{ $t('table.dragTips1') }} : &nbsp; {{ oldList }}</div>-->
    <!--<div class="show-d">{{ $t('table.dragTips2') }} : {{ newList }}</div>-->

  </div>
</template>

<script>
import AreaSelect from '@/components/AreaSelect';
import { getRemoteTestList } from '@/api/remote';

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
      selectAreaPath: [],
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        baseAreaId: '',
        clzroomName: '',
        pageNum: 1,
        size: 10,
        schoolId: '',
      },
      selectedOptions: '',

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true;
      console.log(this.listQuery)
      getRemoteTestList(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total
        this.listLoading = false
      });
    },
    changeSelect(selectObj) {
      this.listQuery.schoolId = selectObj.baseSchoolId
      this.listQuery.baseAreaId = selectObj.baseAreaId
    },
    handleChange() {
      console.log('先定义 在引用');
    }
  }
}
</script>

