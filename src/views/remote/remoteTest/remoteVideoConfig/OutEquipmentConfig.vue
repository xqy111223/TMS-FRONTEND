<template>
  <div class="config-container">
    <el-form ref="equipForm" :model="equipForm" label-width="200px" class="demo-ruleForm video-from">
      <h2 class="line-separate mt20"><span class="title">班班通配置</span></h2>
      <el-form-item label="内网IP" prop="ip" :show-message="equipForm.ipFlag" :rules="[{ required: equipForm.ipFlag, message: '请输入内网IP'}]">
        <el-input autocomplete="off" v-model="equipForm.ip" :disabled="!equipForm.ipFlag"/>
        <el-switch class="ml10" v-model="equipForm.ipFlag"></el-switch>
      </el-form-item>
      <h2 class="line-separate mt20"><span class="title">中控台配置</span></h2>
      <el-form-item label="端口" prop="portNo" :show-message="equipForm.portNoFlag" :rules="[{ required: equipForm.portNoFlag, message: '请输入内网IP'}]">
        <el-select clearable placeholder="请选择端口" class="filter-item mr5" v-model="equipForm.portNo" :disabled="!equipForm.portNoFlag">
          <el-option v-for="item in 16" :key="item" :label="'com' + (item - 1)" :value="item"/>
        </el-select>
        <el-switch class="ml10" v-model="equipForm.portNoFlag"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'OutEquipmentConfig',
  data() {
    return {
      equipForm: {
        ipFlag: true,
        ip: '',
        portNoFlag: true,
        portNo: '',
      },
    }
  },
  methods: {
    // 校验表单的方法
    validateEquipForm (){
      let flag = true;
      this.$refs.equipForm.validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },
  },
}
</script>
<style>
  .config-container{
    padding: 20px;
  }
</style>


