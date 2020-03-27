// 终端管理 -- 设备管理  --- 注册
<template>

<div class="form-container">
  <el-form ref="registerForm" :model="registerForm"  label-width="200px">
    
    <el-form-item label="所在区域：" prop="baseAreaId" :rules="[{ required: true, message: '请选择区域'}]">
      <AreaSelect :onChange="changeAreaSelect" :selectAreaPath="selectAreaPath" :hasSchoolSelect="false"/>
    </el-form-item>

    <el-form-item label="所在学校：" prop="schoolId" :rules="[{ required: true, message: '请选择学校'}]">
      <el-select clearable v-model="registerForm.schoolId" @change="changeSchoolSelect">
        <el-option v-for="item in schoolList" :label="item.schoolName" :value="item.baseSchoolId" :key="item.baseSchoolId"></el-option>
      </el-select>
    </el-form-item>
 
    <el-form-item label="所在教室：" prop="clzroomId" :rules="[{ required: true, message: '所在教室不能为空'}]">
      <el-select clearable v-model="registerForm.clzroomId">
        <el-option v-for="item in classroomList" :label="item.roomName" :value="item.baseClassroomId" :key="item.baseClassroomId"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="教室识别码：" prop="clzroomCode" :rules="[{ required: true, message: '教室识别码不能为空'}]">
      <el-input v-model="registerForm.clzroomCode"></el-input>
    </el-form-item>

    <el-form-item label="终端高级设置密码：" prop="devicePassword" :rules="[{ required: true, message: '密码不能为空'}]">
      <el-input v-model="registerForm.devicePassword"></el-input>
    </el-form-item>

    <!-- 编辑页面显示的部分开始 -->
    <span v-if="pageType === 'edit'">
      <el-form-item label="激活时间：">
        <span>2019-10-10</span>
      </el-form-item>
      <el-form-item label="操作系统版本">
        <span>2019-10-10</span>
      </el-form-item>
      <el-form-item label="操作系统位数">
        <span>2019-10-10</span>
      </el-form-item>
      <el-form-item label="音频驱动版本号">
        <span>2019-10-10</span>
      </el-form-item>
      <el-form-item label="视频驱动版本号">
        <span>2019-10-10</span>
      </el-form-item>
      <el-form-item label="显卡驱动版本号">
        <span>2019-10-10</span>
      </el-form-item>
    </span>
    <!-- 编辑页面显示的部分结束 -->

    <el-form-item prop="firmName" label="厂商：">
      <el-input v-model="registerForm.firmName"></el-input>
    </el-form-item>

    <el-form-item prop="hardwareSN" label="硬件SN号：">
      <el-input v-model="registerForm.hardwareSN"></el-input>
    </el-form-item>

    <el-form-item prop="constructorFirm" label="施工人所在公司：">
      <el-input v-model="registerForm.constructorFirm"></el-input>
    </el-form-item>

    <el-form-item prop="constructorName" label="施工人姓名：">
      <el-input v-model="registerForm.constructorName"></el-input>
    </el-form-item>

    <el-form-item prop="constructorPhone" label="施工人手机号：">
      <el-input v-model="registerForm.constructorPhone"></el-input>
    </el-form-item>

    <el-form-item prop="teamViewerNum" label="TeamViewer号码：">
      <el-input v-model="registerForm.teamViewerNum"></el-input>
    </el-form-item>

    <el-form-item prop="teamViewerPassword" label="TeamViewer密码：">
      <el-input v-model="registerForm.teamViewerPassword"></el-input>
    </el-form-item>

    <el-form-item label="状态：" prop="status" required>
      <el-radio v-for="item in lockStatusData" :key="item.id" v-model="registerForm.status" :label="item.id">
        {{item.name}}
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('registerForm')">保存</el-button>
    </el-form-item>

  </el-form>
</div>
</template>

<script>
import AreaSelect from '@/components/AreaSelect';
import { lockStatus } from '@/config/statusType';
import { getSchoolList, getClassroomList } from '@/api/commons'
import { addDevice, editDevice, terminalDetail } from '@/api/terminal'

export default {
  name: 'EquipmentRegister',
  components: {
    AreaSelect
  },
  data () {
    return {
      pageType: 'add',
      lockStatusData: lockStatus.data,
      schoolList: [],           // 学校下拉列表
      classroomList: [],        // 教室下拉列表
      selectAreaPath: [],       // 区域默认选中
      registerForm: {
        deviceId: '',
        baseAreaId: '',         // 所在区域
        schoolId: '',           // 所在学校
        clzroomId: '',          // 所在教室
        clzroomCode:'',         // 教室识别码
        devicePassword:'',      // 终端高级设置密码
        firmName:'',            // 厂商
        hardwareSN:'',          // 硬件SN号
        constructorFirm: '',    // 施工人所在公司
        constructorName: '',    // 施工人姓名
        constructorPhone: '',   // 施工人手机号
        teamViewerNum: '',      // TeamViewer号码
        teamViewerPassword: '', // TeamViewer密码
        status: '1'              // 状态
      },
    }
  },
  created() {

    // 获取设备id
    this.registerForm.deviceId = this.$route.params.id;
    if(this.$route.params.id){
      this.pageType = 'edit';
      this.setPageData();
    }

  },
  methods: {
    //改变区域
    changeAreaSelect(selectObj){
      this.registerForm.baseAreaId = selectObj.baseAreaId;
      if(selectObj.baseAreaId) {
        // 获取学校列表
        getSchoolList(selectObj.baseAreaId).then(resopnse => {
          this.schoolList = resopnse;
        });
      }else{
        this.schoolList = [];
      }

    },

    // 改变学校选择
    changeSchoolSelect(value) {
      if(value) {
        getClassroomList(value).then(response => {
          this.classroomList = response;
        });
      }else{
        this.classroomList = [];
      }
    },

    // 编辑数据回填
    async setPageData() {
      const deviceInfo = await terminalDetail(this.registerForm.deviceId);
      this.registerForm = {...this.registerForm, ...deviceInfo};
      const areaList = deviceInfo.areaIdPath.split(',');
      this.selectAreaPath = areaList;
      this.registerForm.baseAreaId = areaList[areaList.length - 1];
      this.registerForm.devicePassword = deviceInfo.devicePwd;
      this.registerForm.firmName = deviceInfo.hardwareFirm;
      this.registerForm.hardwareSN = deviceInfo.hardwareSn;
      this.registerForm.teamViewerNum = deviceInfo.teamviewerId;
      this.registerForm.teamViewerPassword = deviceInfo.teamviewerPwd;
      this.registerForm.status = deviceInfo.deviceStat + '';
      this.registerForm.clzroomCode = deviceInfo.classroomCode;
    },

    // 提交保存数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){
          if(this.pageType === 'add'){
            addDevice(this.registerForm).then( () => {
              this.$message.success('保存成功');
              const _self = this;
              setTimeout(function(){
                _self.$router.push({path: '/terminal/equipment-manage'});
              },2000)
            });
          }else{
            editDevice(this.registerForm).then( () => {
              this.$message.success('保存成功');
              const _self = this;
              setTimeout(function(){
                _self.$router.push({path: '/terminal/equipment-manage'});
              },2000)
            });
          }
        }
      })
    }
  }
}
</script>

<style>

</style>


