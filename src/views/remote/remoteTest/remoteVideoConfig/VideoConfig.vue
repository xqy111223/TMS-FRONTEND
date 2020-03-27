<template>
  <div class="config-container video-config">
    <el-form ref="videoForm" :model="videoForm" label-width="200px" class="demo-ruleForm video-from">
      <el-tabs v-model="videoType" type="card" :before-leave="handleBeforeChangeTab">
        <el-tab-pane v-for="item in titleList" :key="item.id" :label="item.name" :name="item.id">
          <h2 class="line-separate mt20"><span class="title">视频源配置</span></h2>
          <div class="video-info">
            <el-form-item label="视频设备列表" :prop="+ videoType +'.deviceShareID'" :rules="[{ required: videoForm[videoType].useFlag, message: '请选择视频设备'}]">
              <el-select clearable placeholder="请选择视频设备列表" class="filter-item mr5" v-model="videoForm[videoType].deviceShareID">
                <el-option label="请选择" value="-1"/>
              </el-select>
              <el-button size="mini" >刷新设备</el-button>
            </el-form-item>
            <el-form-item label="分辨率" :prop="+ videoType +'.widthAndHeight'" :rules="[{ required: videoForm[videoType].useFlag, message: '请选择分辨率'}]">
              <el-select clearable placeholder="请选择分辨率" class="filter-item mr5" v-model="videoForm[videoType].widthAndHeight">
                <el-option label="请选择" value="-1"/>
              </el-select>
            </el-form-item>
            <el-form-item label="帧率" :prop="+ videoType +'.fps'" :rules="[{ required: videoForm[videoType].useFlag, message: '请选择帧率'}]">
              <el-select clearable placeholder="请选择激活状态" class="filter-item mr5" v-model="videoForm[videoType].fps">
                <el-option v-for="id in fpsStatusList" :key="id" :label="id" :value="id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-checkbox v-model="videoForm[videoType].useFlag"></el-checkbox>
            </el-form-item>
          </div>
          <div class="view-video">
            <div class="video"></div>
            <el-button size="mini" >查看视频</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import { fpsStatus } from '@/config/videoConfigType'

export default {
  name: 'VideoConfig',
  data() {
    return {
      fpsStatusList: fpsStatus,
      videoType: '1',
      titleList: [
        {
          id: '1',
          name: '教师跟踪',
        },
        {
          id: '2',
          name: '班班通',
        },
        {
          id: '3',
          name: '学生跟踪',
        },
        {
          id: '4',
          name: '板书全景',
        },
        {
          id: '5',
          name: '教师全景',
        },
        {
          id: '6',
          name: '学生全景',
        },
      ],
      videoForm: {
        1: {
          deviceType: '',
          deviceShareID: '',
          widthAndHeight: '',
          fps: 25,
          useFlag: false,
        },
        2: {
          deviceType: '',
          deviceShareID: '',
          widthAndHeight: '',
          fps: 25,
          useFlag: false,
        },
        3: {
          deviceType: '',
          deviceShareID: '',
          widthAndHeight: '',
          fps: 25,
          useFlag: false,
        },
        4: {
          deviceType: '',
          deviceShareID: '',
          widthAndHeight: '',
          fps: 25,
          useFlag: false,
        },
        5: {
          deviceType: '',
          deviceShareID: '',
          widthAndHeight: '',
          fps: 25,
          useFlag: false,
        },
        6: {
          deviceType: '',
          deviceShareID: '',
          widthAndHeight: '',
          fps: 25,
          useFlag: false,
        },
      },
    }
  },
  watch: {
    'videoForm.1.useFlag': function(value) {
      // 如果没有启用，则表单校验去掉
      if(!value){
        this.$refs.videoForm.clearValidate();
      }
    },
    'videoForm.2.useFlag': function(value) {
      // 如果没有启用，则表单校验去掉
      if(!value){
        this.$refs.videoForm.clearValidate();
      }
    },
    'videoForm.3.useFlag': function(value) {
      // 如果没有启用，则表单校验去掉
      if(!value){
        this.$refs.videoForm.clearValidate();
      }
    },
    'videoForm.4.useFlag': function(value) {
      // 如果没有启用，则表单校验去掉
      if(!value){
        this.$refs.videoForm.clearValidate();
      }
    },
    'videoForm.5.useFlag': function(value) {
      // 如果没有启用，则表单校验去掉
      if(!value){
        this.$refs.videoForm.clearValidate();
      }
    },
    'videoForm.6.useFlag': function(value) {
      // 如果没有启用，则表单校验去掉
      if(!value){
        this.$refs.videoForm.clearValidate();
      }
    },
  },
  methods: {

    // 校验表单的方法
    validateVideoForm (){
      let flag = true;
      this.$refs.videoForm.validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },

    // 切换 tab前 的操作
    handleBeforeChangeTab (activeName, oldActiveName){
      // 校验表单
      const flag = this.validateVideoForm();
      return flag;
    },

    // 初始化websocked，获取视频设备列表和分辨率
    initWebSocked() {
      let socked = new WebSocket();
    }
  }
}
</script>
<style scoped>
  .config-container{
    padding: 20px;
  }
  .video-from{
    display: inline-block;
    width: 100%;
  }
  .video-info{
    display: inline-block;
  }
  .view-video{
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin-left: 10%;
  }
  .view-video .video{
    width: 200px;
    height: 200px;
    border: 1px solid #dcdfe6;
    margin-bottom: 10px;
  }
  .el-tabs__item.is-active{
    background-color: #409EFF;
    color: #fff;
  }
</style>
<style>
.video-config .el-tabs__item.is-active{
    background-color: #409EFF;
    color: #fff;
  }
.video-config .el-tabs--card>.el-tabs__header{
  border-bottom: none;
}
.video-config .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border-bottom: 1px solid #e4e7ed;
}
.video-config .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
  border-bottom-color: #409EFF;
}
</style>



