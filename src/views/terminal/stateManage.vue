// 终端管理 -- 状态管理


<template>
  <div class="app-container">
    <div class="mb20">
      <AreaSelect :onChange="changeSelect"/>
      <el-input placeholder="请输入教室名称" class="filter-item mr5" v-model="listQuery.clzroomName"/>
      <el-select placeholder="请选择当前状态" class="filter-item mr5" v-model="listQuery.state" clearable>
        <el-option v-for="item in currentStatusData" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
    </div>
    <div class="mb20">
      <span style="font-size: 16px">上报间隔 :</span>
      <el-input placeholder="请选择上报间隔" class="filter-item" v-model="listQuery.minInterval"/>
      至
      <el-input placeholder="请选择上报间隔" class="filter-item" v-model="listQuery.maxInterval"/>
      <el-button class="filter-item ml5" type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </div>
    <div class="mb20">
      <p class="total-count fl">共{{ total }}条数据</p>
      <el-button class="filter-item fr" type="primary" icon="el-icon-edit" @click="dialogVisible=true">
        批量设置间隔
      </el-button>
    </div>
    <!--批量设计间隔-->
    <el-dialog
      :visible.sync="dialogVisible"
      title="批量设置间隔"
      width="30%">
      <el-form ref="batchform" :model="batchform">
        <el-form-item
          :rules="[
            {required: true, message: '请选择范围',trigger:'blur'},
          ]"
          :label-width="formLabelWidth"
          label="选择范围"
          prop="baseAreaId"
        >
          <AreaSelect :on-change="changeAreaSelect" :has-school-select="false" v-model="batchform.baseAreaId" />
        </el-form-item>

        <el-form-item
          :rules="[
            { required: true, message: '请输入间隔时间',trigger:['blur','change']},
            { type: 'number',min:3, message: '输入的数值必须大于2'}
          ]"
          :label-width="formLabelWidth"
          label="设置上报间隔"
          prop="interval">
          <el-input v-model.number="batchform.interval" type="interval"/> 秒
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitbatchForm('batchform')">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--在列表中设置间隔-->
    <el-dialog
      title="设置间隔"
      :visible.sync="dialogVisibleset"
      width="30%">
      <el-form ref="form" :model="form">
        <el-form-item
          :rules="[
            { required: true, message: '请输入间隔时间',trigger:['blur','change']},
            { type: 'number',min:3, message: '输入的数值必须大于2'}
          ]"
          :label-width="formLabelWidth"
          label="设置上报间隔"
          prop="interval">
          <el-input v-model.number="form.interval" type="interval"/> 秒
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button @click="dialogVisibleset = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-table
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        width="65"
        type="index">
      </el-table-column>

      <el-table-column
        label="教室名称"
        prop="clzroomName">
      </el-table-column>

      <el-table-column
        label="所在区域"
        prop="areaNamePath">
      </el-table-column>

      <el-table-column
        label="所在学校"
        prop="schoolName">
      </el-table-column>

      <el-table-column
        label="上报间隔(秒)"
        prop="reportOnlineInterval">
      </el-table-column>

      <el-table-column label="最近上报时间">
        <template slot-scope="scope">
          <span>{{ scope.row.recentReportTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="当前状态"
        prop="onlineStat">
      </el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" @click="setUp(scope.$index,scope.row.clzroomId)">设置间隔</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { currentStatus } from '@/config/statusType'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getStateList,setupInterval,batchSet } from '@/api/terminal'
import AreaSelect from '@/components/AreaSelect'

export default {
  name: 'stateManage',
  components: { Pagination ,AreaSelect},
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
      dialogVisibleset: false,
      currentStatusData: currentStatus.data,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        size: 10,
        clzroomId: '',
        clzroomName:'',
        minInterval:'',
        maxInterval:'',
        baseAreaId:'',
        schoolId:'',
        state: '',
      },
//      列表中设置间隔返回数据
      form: {
        clzroomId: '',
        interval: '',
      },
//      批量设置间隔返回数据
      batchform:{
        baseAreaId:'',
        interval:'',
      },
      formLabelWidth: '100px',
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getStateList(this.listQuery).then(response => {
          console.log(response)
        this.list = response.list
        this.total = response.total;
        this.listLoading = false
      })
    },
    //改变区域或学校的值时
    changeSelect(selectObj){
        this.listQuery.schoolId = selectObj.baseSchoolId
        this.listQuery.baseAreaId = selectObj.baseAreaId
    },
//    批量设置 选择区域
    changeAreaSelect(selectObj){
        this.batchform.baseAreaId = selectObj.baseAreaId
    },

//点击查询
    search(){
        this.getList();
    },

//    点击设置间隔回填数据
    setUp(index,clzroomId){
      this.dialogVisibleset = true
      this.form.clzroomId = this.list[index].clzroomId
      this.form.interval = this.list[index].reportOnlineInterval
    },

//    提交设置间隔
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
            setupInterval(this.form).then(response =>{
                this.$message.success('设置成功！')
                this.getList()
                this.dialogVisibleset = false
            }).catch(this.$message.error('编辑失败！'))
        }
      })
    },

//    提交批量设置间隔
    submitbatchForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          batchSet(this.batchform).then(response =>{
              this.$message.success('设置成功！')
              this.getList()
              this.dialogVisible = false
          }).catch(this.$message.error('编辑失败！'))
        }
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
.el-form-item__label{
  width: 110px!important;
  display: inline-block;
  text-align: right;
  vertical-align: middle;
  cursor: default;
}
.el-input__inner{
  border: 1px solid #e0e0e0!important;
}
.el-form-item__error{
    left: 10px;
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
