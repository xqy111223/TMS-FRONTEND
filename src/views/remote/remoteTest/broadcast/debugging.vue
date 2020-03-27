// 远程操作 ---- 远程调式 ---- 导播配置页 ---- 参数设置 tab 项
<template>
  <div class="broad-debugging">
    <div class="bro-main">
      <canvas width="740" height="420" ref="broadCanvas" class="bro-canvas" @click="handleCanvasClick" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp">
        浏览器不兼容canvas， 请更换谷歌。
      </canvas>
      <video autoplay controls loop>
        <source src="http://www.w3school.com.cn/i/movie.ogg" type="video/ogg">
      </video>
      <aside class="bro-aside fr">
        <div class="h72 pl20">
          <span>摄像机通道：</span>
          <el-select v-model="cameraChannelVal" placeholder="请选择摄像机" @change="handleCameraChange">
            <el-option v-for="item in cameraChannel" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="bro-operation pl20">
          <p>摄像机云台控制</p>
          <div class="bro-disk">
            <div class="a">
              <div class="bro-sector"></div>
              <div class="bro-retate">
                <div class="bro-sector-fn bro-sector-t" @click="handleClickTop"></div>
                <div class="bro-sector-fn bro-sector-r" @click="handleClickRight"></div>
                <div class="bro-sector-fn bro-sector-b" @click="handleClickBottom"></div>
                <div class="bro-sector-fn bro-sector-l" @click="handleClickLeft"></div>
              </div>
              <p class="bro-circle"></p>
            </div>
          </div>

          <div class="center mt13">
            <el-button class="mr10" @click="handleZoomAdd">+</el-button>
            变焦
            <el-button class="" @click="handleZoomReduce">-</el-button>
          </div>

          <div class="center mt13">
            <el-button class="mr10" :disabled="isButtonDisabled" @click="handleFocusingAdd">+</el-button>
            聚焦
            <el-button class="" :disabled="isButtonDisabled" @click="handleFocusingReduce">-</el-button>
          </div>
          <div class="center mt13">
            <el-checkbox label="自动聚焦" v-model="autoChecked" @change="handleFocusingAuto"></el-checkbox>
          </div>
        </div>

        <div class="h72 pl20">
          <span>区域预置位：</span>
          <el-select v-model="value" placeholder="请选择摄像机">
            <el-option v-for="item in regionalLocation" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </aside>
    </div>

    <div class="mt20">
      <span>黑板类型：</span>
      <el-select v-model="value" placeholder="请选择" class="mr10">
        <el-option v-for="item in blackboard" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <span>画线类型：</span>
      <el-select v-model="value" placeholder="请选择" class="mr10">
        <el-option v-for="item in drawLineType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <span>安装位置：</span>
      <el-select v-model="value" placeholder="请选择摄像机">
        <el-option v-for="item in installLocation" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

    </div>
    <div class="bro-btn mt20">
      <el-button class="" @click="handleLevelClick" :disabled="levelDisabled">水平线</el-button>
      <el-button class="" @click="handleVerticalClick" :disabled="verticalDisabled">垂直线</el-button>
      <el-button class="" @click="handleTeacherClick" :disabled="teacherDisabled">教师自动画线</el-button>
      <el-button class="" @click="handleROIClick" :disabled="ROIDisabled">ROI</el-button>
      <el-button class="" @click="handleROUClick" :disabled="ROUDisabled">屏蔽区</el-button>
      <el-button class="" @click="handleClearClick" :disabled="clearDisabled">清除</el-button>
      <el-button class="" @click="dialogVisible = true">跟踪参数</el-button>
      <el-button class="" @click="handleParameterClick">参数更新</el-button>
    </div>

    <!-- 参数更新 弹窗  -->
    <!-- <DebuggerDialog /> -->
    <el-dialog title="图像跟踪参数" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div class="bro-dialog">
        <h2 class="line-separate mt20"><span class="title">学生跟踪参数</span></h2>
        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">误检算法模式</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">特写时ZOOM比例</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">框消失的难易度</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">垂直运动最小阈</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">运动目标确认面积</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">跟踪延迟</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">站立保持帧数</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <h2 class="line-separate mt20"><span class="title">教师跟踪MOA参数（正面）</span></h2>
        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">detectDelay</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">durationFrames</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">areaThresh</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">matchScore</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">distanceRatio</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <h2 class="line-separate mt20"><span class="title">联合跟踪MOA参数（讲台）</span></h2>
        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">detectDelay</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">durationFrames</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">areaThresh</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">matchScore</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">distanceRatio</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <h2 class="line-separate mt20"><span class="title">教师跟踪MOA参数（板书）</span></h2>
        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">detectDelay</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">durationFrames</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">areaThresh</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">matchScore</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">distanceRatio</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <h2 class="line-separate mt20"><span class="title">联合跟踪MOA参数（公共）</span></h2>
        <div class="bro-dialog-par">
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">detectDelay</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">durationFrames</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">areaThresh</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">matchScore</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="bro-dialog-parameter">
            <label class="bro-dialog-label">distanceRatio</label>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="bro-dialog-parameter">
          <label class="bro-dialog-label">教师全景保持时间</label>
          <el-input v-model="input1" class="w100" placeholder="请输入内容"></el-input> 秒
        </div>

        <el-button type="primary" @click="dialogVisible = false" class="fr mr50">全部更新</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import DebuggerDialog from './debuggerDialog';
import { Message } from 'element-ui';
import { drawHorizontalLine, drawROLine } from '@/utils/broadcast-drawline.js';
import { blackboardList, lineTypeList, installLocationList, cameraChannelList, regionalLocationList } from '@/config/broadcast.js';

export default {
  name: 'Debugging',
  components: {
    // DebuggerDialog
  },
  data() {
    return {
      blackboard: blackboardList, // 黑板类型
      drawLineType: lineTypeList, // 画线类型
      installLocation: installLocationList, // 安装位置
      cameraChannel: cameraChannelList, // 摄像机通道
      cameraChannelVal: '', // 摄像机通道选择值
      regionalLocation: regionalLocationList, // 区域预置位

      levelDisabled: true, // 水平线
      verticalDisabled: true, // 垂直线
      teacherDisabled: true, // 教师自动画线
      ROIDisabled: true, // ROI
      ROUDisabled: true, // 屏蔽区
      clearDisabled: true, // 清除

      drawLine: false, // 水平线是否可画
      levelArrY: [], // 水平线 Y坐标

      drawROI: false, // roi是否可画
      ROIArrXY: [],

      drawROU: false, // rou是否可画
      ROUArrXY: [],

      temx: [], // 临时存储 ROI 区域的 x轴坐标 取出最大和最小 以判断 ROU 是否在此区域内
      temy: [],
      maxX: 0, // ROI x轴最大值
      maxY: 0,
      minX: 0,
      minY: 0,


      context: null, // canvas 对象
      canvasH: 0, // canvas高度，清除canvas使用
      ROI: false,
      ROU: false,
      ROUArr: [],
      clickFlag: true,
      layerX: 0,
      layerY: 0,

      value: '',
      input1: '1111111',
      dialogVisible: false, // 参数更新弹窗
      autoChecked: true, // 自动聚焦勾选状态
      isButtonDisabled: 'disabled', // 聚焦状态控制
    }
  },
  mounted() {
    this.context = this.$refs.broadCanvas.getContext('2d');
    this.canvasH = this.$refs.broadCanvas.height;
  },
  methods: {
    handleCameraChange(e) { // 摄像机通道change事件
      this.cameraChannelVal = e;
      if(e == 8) {
        this.levelDisabled = false;
        this.ROIDisabled = false; // ROI
        this.ROUDisabled = false; // 屏蔽区
        this.clearDisabled = false; // 清除
      } else {
        this.levelDisabled = true;
      }
      console.log(e, 'cameraChannelVal*', this.cameraChannelVal);
    },
    // canvas 点击
    handleCanvasClick(ev) {
      // 水平线
      if(this.drawLine && this.levelArrY.length < 3) {
        this.levelArrY.push(ev.layerY);
        drawHorizontalLine(this.context, ev.layerY);
        console.log("水平线", ev.layerX, '**', ev.layerY, '**', this.levelArrY);
      }
      // ROI
      if(this.drawROI) {
        drawROLine(this.context, this.ROIArrXY, ev.layerX, ev.layerY, false);
        this.ROIArrXY.push(ev.layerX, ev.layerY);
      }
      // ROU
      if(this.drawROU && this.ROIArrXY.length > 2) {
        if(this.ROUArrXY.length === 0) {
          for(let i = 0; i < this.ROIArrXY.length; i++) {
            if(i%2 === 0){
              this.temx.push(this.ROIArrXY[i])
            } else {
              this.temy.push(this.ROIArrXY[i]);
            }
          }
          this.maxX = Math.max(...this.temx);
          this.minX = Math.min(...this.temx);
          this.maxY = Math.max(...this.temy);
          this.minY = Math.min(...this.temy);
        }
        console.log(this.maxX, '*', this.maxY, '*', this.minX, '*', this.minY);

        if((ev.layerX > this.minX) && (ev.layerX < this.maxX) && (ev.layerY > this.minY) && (ev.layerY < this.maxY) ) {
          drawROLine(this.context, this.ROUArrXY, ev.layerX, ev.layerY, false);
          this.ROUArrXY.push(ev.layerX, ev.layerY);
        } else {
          Message({
            type: 'error',
            message: '请在ROI区域内画屏蔽区！',
            center: true,
            duration: 5000
          });
        }
        
      }
    },
    // canvas 鼠标按下
    handleMouseDown(ev) {
      console.log('handleMouseDown******', ev.layerX, '**', ev.layerY, '****', ev.button);
      this.levelDisabled = true;
      this.layerY = ev.layerY;
    },
    // canvas 鼠标移动
    handleMouseMove(ev) {
      var ROIx = this.ROIArrXY[0];
      var ROIy = this.ROIArrXY[1];
      var ROIxFlag = ROIx < (ev.layerX + 5) && ROIx > (ev.layerX - 5);
      var ROIyFlag = ROIy < (ev.layerY + 5) && ROIy > (ev.layerY - 5);

      var ROUx = this.ROUArrXY[0];
      var ROUy = this.ROUArrXY[1];
      var ROUxFlag = ROUx < (ev.layerX + 5) && ROUx > (ev.layerX - 5);
      var ROUyFlag = ROUy < (ev.layerY + 5) && ROUy > (ev.layerY - 5);

      // ROI 区域
      if( ROIxFlag && ROIyFlag && this.ROIArrXY.length > 2 && this.drawROI) {
        drawROLine(this.context, this.ROIArrXY, ROIx, ROIy, true);
        this.ROIArrXY.push(ROIx, ROIy);
        this.drawROI = false;
        this.ROIDisabled = true;
      }
      // ROU 区域
      if( ROUxFlag && ROUyFlag && this.ROUArrXY.length > 2 && this.drawROU) {
        drawROLine(this.context, this.ROUArrXY, ROUx, ROUy, true);
        this.ROUArrXY.push(ROUx, ROUy);
        this.drawROU = false;
        this.ROUDisabled = true;
      }
    },
    // canvas 鼠标弹起
    handleMouseUp(ev) {
      console.log('handleMouseUp*****', ev.layerY);
    },

    handleVerticalLine(x) { // 竖线
      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, 420);
      this.context.strokeStyle = "blue"; // 描边
      this.context.lineWidth = 4; // 描边线的宽度
      this.context.stroke();
      this.context.closePath();
    },
    handleROULine(x, y, flag) {
      if(this.clickFlag) {
        if(this.ROUArr.length === 0) {
          this.context.beginPath();
          this.context.moveTo(x, y);
        }
        this.context.lineTo(x, y);
        this.context.strokeStyle = "blue"; // 描边
        this.context.lineWidth = 4; // 描边线的宽度
        this.context.stroke();
        if(flag) {
          this.context.closePath();
          console.log('event.returnValue******flag******', flag);
          this.clickFlag = true;
        }
      }
    },
    // 水平线 按钮
    handleLevelClick() {
      console.log('水平线');
      this.drawLine = true;
    }, 
    // 垂直线
    handleVerticalClick() {
      console.log('垂直');
      this.falseFn();
      this.context.beginPath();
      this.context.moveTo(50, 0);
      this.context.lineTo(50, 420);
      this.context.strokeStyle = "red";
      this.context.stroke();
      this.context.closePath();

      this.context.beginPath();
      this.context.moveTo(200, 0);
      this.context.lineTo(200, 420);
      this.context.strokeStyle = "red";
      this.context.stroke();
      this.context.closePath();

      this.context.beginPath();
      this.context.moveTo(300, 0);
      this.context.lineTo(300, 420);
      this.context.strokeStyle = "red";
      this.context.stroke();
      this.context.closePath();

      this.context.beginPath();
      this.context.moveTo(400, 0);
      this.context.lineTo(400, 420);
      this.context.strokeStyle = "red";
      this.context.stroke();
      this.context.closePath();
    }, 
    // 教师自动画线
    handleTeacherClick() {
      console.log('教师');
      this.falseFn();
    }, 
    // ROI
    handleROIClick() {
      console.log('ROI');
      this.drawROI = true;
    }, 
    // 屏蔽区ROU
    handleROUClick() {
      console.log('屏蔽.ROU....');
      this.temx = []; // 临时存储 ROI 区域的 x轴坐标 取出最大和最小 以判断 ROU 是否在此区域内
      this.temy = [];
      this.maxX = 0; // ROI x轴最大值
      this.maxY = 0;
      this.minX = 0;
      this.minY = 0;
      this.ROUArrXY = [];
      this.drawROU = true;
    }, 
    // 清除
    handleClearClick() {
      console.log('清除', this.canvasH);
      this.drawLine = false;
      this.levelArrY = [];

      this.ROIDisabled = false;
      this.ROIArrXY = [];


      this.falseFn();
      this.$refs.broadCanvas.height =  this.canvasH;
    }, 
    // 参数更新
    handleParameterClick() {
      console.log('参数更新');
    }, 
    // false 函数
    falseFn() {
      this.ROI = false;
      this.ROU = false;
    },
    // 云台相机 方向控制 
    handleClickTop() {
      console.log('T');
    },
    handleClickRight() {
      console.log('R');
    },
    handleClickBottom() {
      console.log('B');
    },
    handleClickLeft() {
      console.log('L');
    },
    // 变焦
    handleZoomAdd() {
      console.log('变焦add');
    },
    handleZoomReduce() {
      console.log('变焦reduce');
    },
    // 聚焦
    handleFocusingAdd() {
      console.log('聚焦add');
    },
    handleFocusingReduce() {
      console.log('聚焦reduce');
    },
    handleFocusingAuto(e) {
      if(e) {
        this.isButtonDisabled = 'disabled';
      } else {
        this.isButtonDisabled = false;
      }
    },
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    handleWinFocus(e) {
      console.log('ready 88888 handleWinFocus***', e);
    }
  },
  beforeDestroy() {
    console.log('befor destroy');
    this.$refs.broadCanvas.removeEventListener('click', this.handleWinFocus);
  }
}
// this.$refs.broadCanvas.addEventListener('click', this.handleWinFocus);
// context.fillStyle = "red";
// context.strokeStyle = "blue";
// context.fillRect(10, 10, 150, 150);
// context.lineWidth = 4;
// context.strokeStyoe = "yellow";
// context.strokeRect(50, 50, 120, 120);

// context.strokeStyoe = "red";
// context.lineWidth = 60;
// context.strokeRect(50, 50, 120, 120);
// context.fillStyle = "blue";
// context.fillRect(50, 50, 120, 120);

// context.strokeStyoe = "yellow";
// context.lineWidth = 4;
// context.strokeRect(50, 50, 120, 120);
// context.fillStyle = "red";
// context.fillRect(150, 150, 120, 120);
// context.clearRect(110, 110, 30, 30);

// context.beginPath(); 
// context.arc(50, 50, 40, 0, 2*Math.PI, false);
// context.closePath(); 
// context.fillStyle = "red";
// context.fill();

// context.beginPath();
// context.beginPath();
// context.moveTo(100, 100);
// context.arcTo(50, 50, 10, 200, 200);
// context.closePath();
// context.strokeStyle = "red";
// context.stroke();
</script>

<style lang = 'scss' modules>
@import "src/styles/broad.scss";
</style>
