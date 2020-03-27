<template>
  <div class="config-container">
    <el-form ref="form" :model="form" label-width="200px" class="demo-ruleForm video-from">
      <el-form-item label="录制文件根路径" prop="oldPwd" required>
        <el-input type="oldPwd" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="电影录制编码" prop="newPwd" required>
        <span class="ml10">码率（kbps）</span>
        <el-select clearable placeholder="请选择激活状态" class="filter-item mr5" v-model="value">
          <el-option v-for="item in bitrateListList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-input type="password" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="互动录制编码" prop="confirmPwd" required>
        <span class="ml10">码率（kbps）</span>
        <el-select clearable placeholder="请选择激活状态" class="filter-item mr5" v-model="value">
          <el-option v-for="item in bitrateListList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-input type="password" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="资源录制编码" prop="confirmPwd" required>
        <span class="ml10">码率（kbps）</span>
        <el-select clearable placeholder="请选择激活状态" class="filter-item mr5" v-model="value">
          <el-option v-for="item in bitrateListList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
        <el-input type="password" autocomplete="off"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { activeStatus, registStatus, stateStatus } from '@/config/statusType.js';
import { bitrateList } from '@/config/videoConfigType';
export default {
  name: 'RecordConfig',
  data() {
    return {
      bitrateListList: bitrateList,
      value: '',
      form: {}
    }
  },
}
</script>
<style scoped>
  .config-container{
    padding: 20px;
  }
</style>
