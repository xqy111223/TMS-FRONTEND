<template>
  <div class="config-container">
    <h2 class="line-separate mt20"><span class="title">视频参数</span></h2>
    <el-form ref="form" :model="form" label-width="300px" class="demo-ruleForm video-from">
      <el-form-item label="电影辅画面" prop="oldPwd" required>
        <el-switch class="ml10" v-model="value"></el-switch>
      </el-form-item>
      <el-form-item label="GOP" class="normal" prop="oldPwd" required>
        <el-input type="oldPwd" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="电影画面分辨率码率对应关系">
      </el-form-item>
      <div class="double-item">
        <el-form-item label="分辨率" class="normal" prop="oldPwd" required>
          <el-input type="oldPwd" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="对应码率" class="normal" prop="oldPwd" required>
          <el-input type="oldPwd" autocomplete="off"/>
        </el-form-item>
      </div>

      <el-form-item label="班班通画面" prop="oldPwd" required>
        <el-switch class="ml10" v-model="value"></el-switch>
      </el-form-item>
      <div class="double-item">
        <el-form-item label="分辨率" class="normal" prop="oldPwd" required>
          <el-input type="oldPwd" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="码率" class="normal" prop="oldPwd" required>
          <el-input type="oldPwd" autocomplete="off"/>
        </el-form-item>
      </div>

      <el-form-item label="互动画面" prop="oldPwd" required>
        <el-switch class="ml10" v-model="value"></el-switch>
      </el-form-item>
      <div class="double-item">
        <el-form-item label="分辨率" class="normal" prop="oldPwd" required>
          <el-input type="oldPwd" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="码率" class="normal" prop="oldPwd" required>
          <el-input type="oldPwd" autocomplete="off"/>
        </el-form-item>
      </div>

      <el-form-item label="机位画面" prop="oldPwd" required>
        <el-switch class="ml10" v-model="value"></el-switch>
      </el-form-item>
      <div class="double-item">
        <el-form-item label="分辨率" class="normal" prop="oldPwd" required>
          <el-input type="oldPwd" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="码率" class="normal" prop="oldPwd" required>
          <el-input type="oldPwd" autocomplete="off"/>
        </el-form-item>
      </div>
    </el-form>
  </div>
  
</template>
<script>
export default {
  name: 'SerialPortConfig',
  data (){
    return {
      form: {
        
      },
      value: '',
    }
  }
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
  .normal label{
    font-weight: 100;
  }
</style>
<style>
  .normal label{
    font-weight: 500;
  }
</style>


