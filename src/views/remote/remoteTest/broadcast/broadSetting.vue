// 远程操作 ---- 远程调式 ---- 导播配置页 ---- 参数设置 tab 项
<template>
  <div class="broad-setting">
    <h2 class="line-separate mt20"><span class="title">跟踪配置</span></h2>
    <div class="pl20 mt20">
      <div class="bro-seat">
        <span class="bro-title">跟踪机位</span>
        <!-- 跟踪机位机位数 -->
        <el-select v-model="seatValue" placeholder="请选择" @change="handleSeatChange">
          <el-option v-for="item in trackPosition" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!-- 跟踪机位选项 -->
        <el-checkbox-group v-model="trackCheckValue" class="bro-check-group"  @change="handleCheckboxChange">
          <el-checkbox v-for="item in trackCheck" :key="item.value" :label="item.name" :disabled="trackDisabled">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="bro-analysis mt20">
        <span class="bro-title">跟踪分析头</span>
        <el-checkbox-group v-model="trackHeadValue" class="bro-check-group" @change="handleHeadChange">
          <el-checkbox v-for = "item in trackHead" :key="item.value" :label="item.name" :disabled="trackDisabled">{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <el-button type="primary" class="fr" @click="handleConfirmClick">确定配置</el-button>
      </div>
    </div>

    <h2 class="line-separate mt20"><span class="title">相机配置</span></h2>
    <div class="pl20 mt20">
      <div class="bro-right">
        <el-button type="primary">搜索</el-button>

        <el-table ref="singleTable" :data="tableData" border class="bro-table mt10" highlight-current-row
        @current-change="handleCurrentChange">
          <el-table-column align="center" prop="channelId" label="摄像机" width="100"></el-table-column>
          <el-table-column align="center" prop="cameraType" label="类型" width="150"></el-table-column>
          <el-table-column align="center" prop="videoType" label="相机型号" width="180"></el-table-column>
          <el-table-column align="center" prop="cameraUrl" label="视频采集卡/URL"></el-table-column>
          <el-table-column align="center" prop="resolutionIndex" label="分辨率" width="180"></el-table-column>
          <el-table-column align="center" prop="comNo" label="云台串口" width="180"></el-table-column>
          <el-table-column align="center" prop="enable" label="是否启用" width="80"></el-table-column>
        </el-table>
      </div>

    </div>
    <h2 class="line-separate mt20"><span class="title">摄像机采集通道</span></h2>
    <div class="pl20 mt20">
      <el-select v-model="cameraSelectDate" placeholder="请选择摄像机" :disabled="acquisitionFlag" @change="handleCameraChange">
        <el-option v-for="item in acquisition" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="modelSelectDate" placeholder="请选择相机型号" :disabled="acquisitionFlag" @change="handleModelChange">
        <el-option v-for="item in modelSelectOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="cardSelectDate" placeholder="请选择视频采集卡" :disabled="acquisitionFlag" @change="handleCardChange">
        <el-option v-for="item in cardSelectOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="rateSelectDate" placeholder="请选择分辨率" :disabled="acquisitionFlag" @change="handleRateChange">
        <el-option v-for="item in rateSelectOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="portSelectDate" placeholder="请选择云台串口" :disabled="acquisitionFlag" @change="handlePortChange">
        <el-option v-for="item in portSelectOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-button type="primary" class="fr" @click="handleSettingClick">设置参数</el-button>

    </div>
    <h2 class="line-separate mt20"><span class="title">其他</span></h2>
    <div class="pl20 mt20">
      <el-button type="primary" class="" @click="dialogVisible = true">高级</el-button>
    </div>

    <!-- 高级参数  弹窗  -->
    <el-dialog title="高级参数" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div class="bro-dialog">
        <h2 class="line-separate mt20"><span class="title">电子云台（插件抠图）</span></h2>
        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <el-checkbox v-model="checked">电子云台模式</el-checkbox>
          </div>
        </div>

        <h2 class="line-separate mt20"><span class="title">电子云台（相机抠图）</span></h2>
        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <el-checkbox v-model="checked">老师开关</el-checkbox>
          </div>
          <div class="bro-dialog-parameter">
            <el-checkbox v-model="checked">学生开关</el-checkbox>
          </div>
        </div>

        <h2 class="line-separate mt20"><span class="title">教师全景过滤</span></h2>
        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <el-checkbox v-model="checked">查询云台到位</el-checkbox>
          </div>
          <div class="bro-dialog-parameter">
            <el-checkbox v-model="checked">计时</el-checkbox>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">全景过滤保持时间</label>
            <el-input v-model="input1" placeholder="2000"></el-input>
            毫秒
          </div>
        </div>

        <h2 class="line-separate mt20"><span class="title">学生全景过滤</span></h2>
        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <el-checkbox v-model="checked">查询云台到位</el-checkbox>
          </div>
          <div class="bro-dialog-parameter">
            <el-checkbox v-model="checked">计时</el-checkbox>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">全景过滤保持时间</label>
            <el-input v-model="input1" placeholder="2000"></el-input>
            毫秒
          </div>
        </div>

        <h2 class="line-separate mt20"><span class="title">跟踪算法（需重启导播才能生效）</span></h2>
        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <el-checkbox v-model="checked">是否启用Codyy学生跟踪算法</el-checkbox>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">教师云台速度</label>
            <el-input v-model="input1" placeholder="31"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">学生云台速度</label>
            <el-input v-model="input1" placeholder="31"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">教师跟踪算法控制</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">学生跟踪算法控制</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">学生检测算法</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="bro-dialog-parameter">
            <el-checkbox v-model="checked">启用学生异常帧检测</el-checkbox>
            <el-checkbox v-model="checked">启用日志</el-checkbox>
          </div>
        </div>

        <el-button type="primary" @click="dialogVisible = false" class="fr mr50">更新配置</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { trackPositionList, trackCheckList, trackHeadList, tableDateList, acquisitionList } from '@/config/broadcast.js';

export default {
  name: 'BroadSetting',
  data() {
    return {
      trackPosition: trackPositionList, // 跟踪机位select选项
      seatValue: '1', // 跟踪机位select值
      trackCheckValue: ['isEnableVGA'], // 默认选中 VGA 机位选中值
      trackCheck: trackCheckList, // 跟踪选项
      trackHead: trackHeadList, // 分析头选项
      trackHeadValue: [], // 分析头选中值

      trackDisabled: false, // 机位与分析头的选项状态

      tableData: tableDateList,
      tableRowIndex: 0, // 选中的tr 行

      acquisition: acquisitionList, // 摄像机采集通道select 值
      modelSelectOptions: [{
        label: '1-1',
        value: '1-2'
      }, {
        label: '1-3',
        value: '1-4'
      }], // 相机型号
      cardSelectOptions: [{
        label: '2-1',
        value: '2-2'
      }, {
        label: '2-3',
        value: '2-4'
      }], // 视频采集卡
      rateSelectOptions: [{
        label: '3-1',
        value: '3-2'
      }, {
        label: '3-3',
        value: '3-4'
      }], // 分辨率
      portSelectOptions: [{
        label: '4-1',
        value: '4-2'
      }, {
        label: '4-3',
        value: '4-4'
      }], // 云台串口
      acquisitionFlag: false, // 摄像机采集通道状态

      cameraSelectDate: '', // 摄像机
      modelSelectDate: '', // 相机型号
      cardSelectDate: '', // 视频采集卡
      rateSelectDate: '', // 分辨率
      portSelectDate: '', // 云台串口

      dialogVisible: false,
      options: [{
        label: '1',
        value: '2'
      }],
      value: '2',
      input1: '111',
      checked: true
    }
  },
  methods: {
    handleSeatChange(e) { // 机位select选项
      console.log('跟踪机位 select。。。', e, '***', this.seatValue);
      this.trackDisabled = false;
      this.acquisitionFlag = true; // 摄像机采集通道状态
    },
    handleCheckboxChange(e) {
      console.log('跟踪分机位 checkbox。。。', e, '***');
      if(e.indexOf(trackCheckList[3].label) != -1 && this.trackHeadValue.indexOf(trackHeadList[2].label) === -1) {
        this.trackHeadValue.push('板书跟踪分析头');
      }
    },
    handleHeadChange(e) { // 跟踪分析头
      console.log(e, '***', this.trackHeadValue);
    },
    handleConfirmClick() { // 确认配置事件
      let len = this.trackCheckValue.length;
      if(this.trackCheckValue.indexOf('isEnableVGA') != -1){
        len = len - 1;
      }
      if(this.seatValue == len){
        this.trackDisabled = true;
        this.acquisitionFlag = false;

      for(let i = 0; i < this.tableData.length; i++) {
        if(this.trackCheckValue.indexOf(this.tableData[i].name) != -1 || this.trackHeadValue.indexOf(this.tableData[i].name) != -1) {
          this.tableData[i].enable = '启用';
        }
      }

        console.log(this.trackCheckValue, this.trackHeadValue);
      } else {
        Message({
          type: 'error',
          message: '选择的摄像机与机位不匹配！',
          center: true,
          duration: 5000,
          showClose: true
        });
        return false;
      }
    },
    handleCurrentChange(val) { // table tr 事件
      this.currentRow = val;
      for(let i = 0; i < this.tableData.length; i++) {
        if(val.channelId === this.tableData[i].channelId) {
          console.log(i, this.tableData[i]);
          this.tableRowIndex = i+1;
        }
      }
    },
    // 摄像机采集通道 select 监听事件
    handleCameraChange(e) { // 摄像机
      console.log(e);
      this.cameraSelectDate = e; // 摄像机
    },
    handleModelChange(e) { // 相机型号
      console.log(e);
      this.modelSelectDate = e; // 相机型号
    },
    handleCardChange(e) { // 采集卡
      console.log(e);
      this.cardSelectDate = e; // 视频采集卡
    },
    handleRateChange(e) { // 分别率
      console.log(e);
      this.rateSelectDate = e; // 分辨率
    },
    handlePortChange(e) { // 串口
      console.log(e);
      this.portSelectDate = e; // 云台串口
    },
    handleSettingClick() { // 设置参数 事件
      console.log('this.tableRowIndex****', this.tableRowIndex);
      console.log('this.cameraSelectDate****', this.cameraSelectDate);

      if(this.tableRowIndex && this.tableRowIndex == this.cameraSelectDate) {
        this.tableData[this.tableRowIndex-1].cameraType = '没有相机类型';  // cameraType相机类型'
        this.tableData[this.tableRowIndex-1].videoType = this.modelSelectDate; // videoType相机型号'
        this.tableData[this.tableRowIndex-1].cameraUrl = this.cardSelectDate; // cameraUrl相机地址'
        this.tableData[this.tableRowIndex-1].resolutionIndex = this.rateSelectDate; // resolutionIndex分别率'
        this.tableData[this.tableRowIndex-1].comNo = this.portSelectDate; // comNo云台串口'
      }
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);

    },
    handleClose(done) {
      done();
    }
  }
}
</script>

<style lang = 'scss'>
@import "src/styles/broad.scss";
</style>
