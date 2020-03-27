// 终端管理 -- 设备管理  --- 批量升级

<template>
<div class="form-container mt10">
  <el-form ref="batchForm" :model="batchForm"  label-width="200px">

    <el-form-item label="选择区域：" prop="baseAreaId" :rules="[{ required: true, message: '请选择区域', trigger: 'change'}]">
      <AreaSelect :onChange="changeAreaSelect" :hasSchoolSelect="false"/>
    </el-form-item>

    <el-form-item label="强制升级：" :rules="[{ required: true }]">
      <el-radio v-for="item in upgradeTypeData" :key="item.id" v-model="batchForm.upgradeType" :label="item.id">{{item.name}}</el-radio>
    </el-form-item>

    <el-form-item label="操作系统：" prop="osTypeId" :rules="[{ required: true, message: '请选择操作系统'}]">
      <el-select clearable v-model="batchForm.osTypeId">
        <el-option v-for="item in osTypeStatusData" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="版本：" prop="softwareManageId" :rules="[{ required: true, message: '版本不能为空'}]" >
      <el-button type="primary" :disabled="batchForm.osTypeId ? false : true" @click="dialogVisible=true,getList()">选择</el-button>
      <span>{{this.versions.softwareVer}}</span>
    </el-form-item>

    <el-form-item label="下载地址：" prop="downloadUrl" :rules="[{ required: true, message: '下载地址不能为空'}]">
      <el-input v-model="batchForm.downloadUrl"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('batchForm')">保存</el-button>
    </el-form-item>
  </el-form>
  <!--点击版本-->
  <el-dialog
    title="选择版本"
    :visible.sync="dialogVisible"
    width="55%">
    <el-form ref="versions" :model="versions">

      <el-table
        v-loading="listLoading"
        :data="lll"
        row-key="id"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          width="65px"
          label="选择"
        >
          <template slot-scope="scope">
             <el-radio v-model="scope.row.flag" @change="chooseRad(scope.$index,scope.row.softwareManageId)"></el-radio>
          </template>
        </el-table-column>

        <el-table-column
          label="软件名称"
          prop="softwareName">
        </el-table-column>

        <el-table-column
          label="版本号"
          prop="softwareVer">
        </el-table-column>


        <el-table-column label="上传时间">
          <template slot-scope="scope">
            <span>{{ scope.row.uploadTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="versions.pageNum" :limit.sync="versions.size" @pagination="getList" />
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitbatchForm('versions')">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
import AreaSelect from '@/components/AreaSelect';
import { batchUpdateDevice, getSoftList} from '@/api/terminal'
import { upgradeType, osTypeStatus } from '@/config/statusType';
import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'EquipmentBatchUpgrade',
  components: {
    ElInput, ElButton, AreaSelect, Pagination
  },
  data () {

    return {
      lll:[
        {
          pageNum: 1,
          size: 10,
          softwareVer: 'aaa',
          uploadTime: '',
          softwareName: '',
          deviceId: '',
          softwareManageId:'1',
          flag:false
        },
        {
          pageNum: 1,
          size: 10,
          softwareVer: 'bbb',
          uploadTime: '',
          softwareName: '',
          deviceId: '',
          softwareManageId:'2',
          flag:false
        },
        {
          pageNum: 1,
          size: 10,
          softwareVer: 'ccc',
          uploadTime: '',
          softwareName: '',
          deviceId: '',
          softwareManageId:'3',
          flag:false
        },
      ],
      dialogVisible: false,
      upgradeTypeData: upgradeType.data,
      osTypeStatusData: osTypeStatus.data,
      total: 0,
      listLoading: true,
      versionList: null,
      batchForm: {
        baseAreaId: '',
        downloadUrl: '',
        osTypeId: '',       // 操作系统
        upgradeType: '0',     // 强制升级
        softwareManageId:''
      },
      versions: {
        pageNum: 1,
        size: 10,
        softwareVer: '',
        uploadTime: '',
        softwareName: '',
        deviceId: '',
        softwareManageId:'',
      },
      formLabelWidth: '100px',
      radio:''
    }
  },
  methods: {
    //改变区域或学校的值时
    changeAreaSelect (selectObj) {
      this.batchForm.baseAreaId = selectObj.baseAreaId;
    },

    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){
          batchUpdateDevice(this.batchForm).then(response => {
            this.$message.success('保存成功');
            const _self = this;
            setTimeout(function(){
              _self.$router.push({path: '/terminal/equipment-manage'});
            },2000)
          });
        }
      })
    },
    // 选择操作系统后，请求版本信息列表
    getList() {
      this.listLoading = true
      getSoftList(this.batchForm.osTypeId).then(response => {
          response.list.map(v=>{
              v.flag = false
          })
        console.log(response.list)
        this.versionList = response.list
        this.total = response.total;
        this.listLoading = false
      })
    },
    //    选中版本号
    chooseRad(index,softwareManageId){
      this.lll.map(v=>{
        if (v.softwareManageId == softwareManageId){
//          v.flag = true
          this.versions.softwareManageId = v.softwareManageId
          this.versions.softwareVer = v.softwareVer
          this.versions.softwareName = v.softwareName
          this.versions.uploadTime = v.uploadTime
          console.log(v)
        }else {
          v.flag = false
        }
      })

    },
        //    确定选中的版本号
     submitbatchForm(formName){
       this.$refs[formName].validate((valid) => {
         if (valid) {
           this.batchForm.softwareManageId = this.versions.softwareManageId
           this.$message.success('设置成功！')
           this.dialogVisible = false

         }
       })
     },

  }
}
</script>

<style scoped>
/*.el-form-item__content .el-button{*/
  /*width: 200px;*/
  /*height: 36px;*/
  /*padding-right: 30px;*/
  /*border: 1px solid #dcdfe6;;*/
/*}*/

</style>
