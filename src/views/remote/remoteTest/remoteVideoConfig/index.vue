<template>
  <div class="form-container">
    <div class="container">
      <el-tabs type="border-card" :before-leave="changeTab">
        <el-tab-pane label="视频设置">
          <VideoConfig ref="videoConfig"></VideoConfig>
        </el-tab-pane>
        <el-tab-pane label="音频设置">
          <AudioConfig ref="audioConfig"></AudioConfig>
        </el-tab-pane>
        <el-tab-pane label="外设配置">
          <OutEquipmentConfig ref="outEquipmentConfig"></OutEquipmentConfig>
        </el-tab-pane>
        <el-tab-pane label="串流配置">
          <SerialPortConfig ref="serialPortConfig"></SerialPortConfig>
        </el-tab-pane>
        <el-tab-pane label="录制设置">
          <RecordConfig ref="recordConfig"></RecordConfig>
        </el-tab-pane>
      </el-tabs>
      <div class="opt">
        <el-button type="primary">保存</el-button>
      </div>
    </div>
  </div>
  
</template>

<script>
import VideoConfig from './VideoConfig'
import AudioConfig from './AudioConfig'
import OutEquipmentConfig from './OutEquipmentConfig'
import SerialPortConfig from './SerialPortConfig'
import RecordConfig from './RecordConfig'

export default { 
  name: 'remoteVideo',
  components: { VideoConfig, AudioConfig, OutEquipmentConfig, SerialPortConfig, RecordConfig },
  data() {
    return {
      tabPosition: 'top'
    }
  },
  methods: {
    changeTab(activeName, oldActiveName) {

      // 切换tab时校验各模块的表单，表单校验通过可以切换，不通过不能切换
      let resultFlag = true;
      let flag = true;
      switch(oldActiveName) {
        case '0': 
          // 校验视频设置的表单
          flag = this.$refs.videoConfig.validateVideoForm();
          // resultFlag = flag;
          break;
        case '1':
          // 校验音频设置的表单
          flag = this.$refs.audioConfig.validateAudioForm();
          // resultFlag = flag;
          break;
         case '2':
          // 校验外设设置的表单
          flag = this.$refs.outEquipmentConfig.validateEquipForm();
          // resultFlag = flag;
          break;
      }
      return resultFlag;
    }
  }
}
</script>

<style scoped>
  .config-container{
    padding: 20px;
  }
  .container{
    position: relative;
  }
  .opt{
    position: absolute;
    top: 2px;
    right: 30px;
  }
</style>


