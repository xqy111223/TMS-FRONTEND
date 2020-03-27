// 远程操作 ---- 远程调式 ---- 导播配置页
<template>
  <div class="broadcast-config form-container">
    <div class="broadcast-function">
      <el-radio v-model="radio" label="1">自动导播</el-radio>
      <el-radio v-model="radio" label="2">设备调试</el-radio>
      <el-button type="primary">运行</el-button>
      <el-button type="primary" class="">参数上传</el-button>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="参数设置">
       <BroadSetting />
      </el-tab-pane>

      <el-tab-pane label="跟踪调式">
        <Debugging />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import BroadSetting from './broadcast/broadSetting.vue';
import Debugging from './broadcast/debugging.vue';

export default {
  name: 'BroadcastConfig',
  components: {
    BroadSetting,
    Debugging
  },
  data() {
    return {
      radio: '2'
    }
  }
}
</script>

<style lang = 'scss'>
.broadcast-config{
  position: relative;
}
.broadcast-function{
  position: absolute;
  right: 20px;
  z-index: 1;
  display: flex;
  height: 40px;
  align-items: center;
  button{
    margin-left: 30px;
    margin-right: 10px;
  }
}
</style>
