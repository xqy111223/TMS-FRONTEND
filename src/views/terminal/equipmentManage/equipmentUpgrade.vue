// 终端管理 -- 设备管理  --- 升级操作 -- 升级

<template>
<div class="form-container">
  <el-form ref="batchForm" :model="batchForm" label-width="200px" >
    <el-form-item label="强制升级：">
      <el-radio v-for="item of upgradeTypeData" :key="item.id" v-model="batchForm.upgradeType" :label="item.id">{{item.name}}</el-radio>
    </el-form-item>
    <el-form-item label="操作系统：" prop="osTypeId" :rules="[{ required: true, message: '操作系统不能为空'}]">
      <el-select clearable v-model="batchForm.osTypeId" @change="changeOsStatus">
        <el-option v-for="item in osTypeStatusData" :label="item.name" :value="item.id" :key="item.id" ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="版本：" prop="version" :rules="[{ required: true, message: '版本不能为空'}]">
      <el-select clearable v-model="batchForm.version">
        <el-option v-for="item in versionList" :label="item.softwareVer" :value="item.osTypeId" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="下载地址：" prop="downloadUrl" :rules="[{ required: true, message: '下载地址不能为空'}]">
      <el-input v-model="batchForm.downloadUrl"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('batchForm')">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { upgradeType, osTypeStatus } from '@/config/statusType.js';
import { getSoftList, updateDevice, getSoftForOneUpgrade } from '@/api/terminal'

export default {
  name: 'EquipmentUpgrade',
  data () {
    return {
      upgradeTypeData: upgradeType.data,
      osTypeStatusData: osTypeStatus.data,
      versionList: [],
      batchForm: {
        deviceId: '',
        downloadUrl: '',
        osTypeId: '',    // 操作系统
        upgradeType:'0',     // 强制升级
        version:''
      },
    }
  },
  mounted() {
    // 获取设备id
    this.batchForm.deviceId = this.$route.params.id;
  },
  methods: {
    // 选择操作系统后，请求版本信息
    async changeOsStatus(value){
      console.log(value);
      if (value){
    // 升级版本下拉列表
        this.versionList = this.versionList.splice(0,this.versionList)
        const versionlist = await getSoftForOneUpgrade(this.batchForm.deviceId,value)
        versionlist.map(v=>{
          const list = {
            softwareVer: v.softwareVer,
            osTypeId: v.osTypeId
          };
          this.versionList.push(list);
        })
      }else {
          this.$confirm('请先选择操作系统！')
      }
    },

    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){
          updateDevice(this.batchForm).then(response => {
            this.$message.success('保存成功');
            const _self = this;
            setTimeout(function(){
              _self.$router.push({path: '/terminal/equipment-manage'});
            },2000)
          });
        }
      })
    },


  },

}
</script>

<style>

</style>
