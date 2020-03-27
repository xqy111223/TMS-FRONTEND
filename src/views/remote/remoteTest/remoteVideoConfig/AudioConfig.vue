<template>
  <div class="config-container">
    <el-form ref="audioForm" :model="audioForm" label-width="300px" class="demo-ruleForm mt30 video-from">
      <h2 class="line-separate mt20"><span class="title">音频处理器</span></h2>
      <el-form-item label="麦克风输入设备" :rules="[{ required: true, message: '请选择麦克风输入设备'}]"  prop="enableCancellation">
        <el-select clearable placeholder="请选择激活状态" class="filter-item mr5" v-model="audioForm.enableCancellation">
          <el-option v-for="item in enableCancellationList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-checkbox v-model="audioForm.useVirtualAudio" class="ml10">虚拟声卡模式</el-checkbox>
      </el-form-item>

      <h2 class="line-separate mt20"><span class="title">音频源配置</span></h2>
      <div class="double-item">
        <el-form-item label="麦克风输入设备" prop="microphoneId" :rules="[{ required: true, message: '请选择麦克风输入设备'}]">
          <el-select clearable placeholder="请选择麦克风输入设备" class="filter-item mr5" v-model="audioForm.microphoneId">
            <el-option label="请选择" value="-1"/>
          </el-select>
        </el-form-item>
        <el-form-item label="班班通输入设备" prop="bbtMicrophoneId" :rules="[{ required: true, message: '请选择麦克风输入设备'}]">
          <el-select clearable placeholder="请选择班班通输入设备" class="filter-item mr5" v-model="audioForm.bbtMicrophoneId">
            <el-option label="请选择" value="-1"/>
          </el-select>
        </el-form-item>
      </div>

      <h2 class="line-separate mt20"><span class="title">音频播放配置</span></h2>
      <el-form-item label="远端音频输入设备" prop="speakerId" :rules="[{ required: true, message: '请选择远端音频输入设备'}]">
        <el-select clearable placeholder="请选择远端音频输入设备" class="filter-item mr5" v-model="audioForm.speakerId">
          <el-option label="请选择" value="-1"/>
        </el-select>
      </el-form-item>

      <h2 class="line-separate mt20"><span class="title">软件回声消除参数</span></h2>
      <div class="double-item">
        <el-form-item label="自动增益级别" prop="automaticLevel" :rules="[{ required: true, message: '请选择自动增益级别'}]">
          <el-select clearable placeholder="请选择激活状态" class="filter-item mr5" v-model="audioForm.automaticLevel">
            <el-option v-for="item in automaticLevelList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="回声消除级别" prop="cancellationLevel" :rules="[{ required: true, message: '请选择自动增益级别'}]">
          <el-select clearable placeholder="请选择激活状态" class="filter-item mr5" v-model="audioForm.cancellationLevel">
            <el-option v-for="item in cancellationLevelList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </div>
      
    </el-form>
  </div>
  
</template>
<script>
import { activeStatus, registStatus, stateStatus } from '@/config/statusType.js';   
import { enableCancellation, automaticLevel, cancellationLevel } from '@/config/videoConfigType';   
export default {
  name: 'AudioConfig',
  data() {
    return {
      activeStatusData: activeStatus.data,
      enableCancellationList: enableCancellation,
      automaticLevelList: automaticLevel,
      cancellationLevelList: cancellationLevel,
      audioForm: {
        useVirtualAudio: false,      // 虚拟声卡模式开关
        enableCancellation: '1',     // 音频处理器
        microphoneId: '',            // 麦克风输入设备
        bbtMicrophoneId: '',         // 班班通输入设备
        speakerId: '',               // 远端音频输出设备
        automaticLevel: '1',           // 自动增益级别
        cancellationLevel: '1',        // 回声消除级别
      },
      value: '',
    }
  },
  methods: {
    // 校验表单的方法
    validateAudioForm (){
      let flag = true;
      this.$refs.audioForm.validate((valid) => {
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
<style scoped>
  .config-container{
    padding: 20px;
  }
  .double-item{
    overflow: hidden;
  }
  .double-item>div{
    float: left;
  }
</style>


