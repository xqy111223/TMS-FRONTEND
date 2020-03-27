<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <div class=" pad">
      <span class="exception-tip">* 在线设备数、异常设备数均为一小时之内的数据</span>
      <!--点击详情跳转-->
      <!--<router-link :to="'/terminal/exception-details/'">
        <el-button class="filter-item fr" type="primary" icon="el-icon-edit">
          详情
        </el-button>
      </router-link>-->
      <el-button class="filter-item fr" type="primary" icon="el-icon-edit" @click="dialogVisible=true">
        异常参数设置
      </el-button>
    </div>

    <!--<el-table
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
    <el-table-column align="center" label="行政名称" width="787">
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column width="300px" align="center" label="设备总数">
      <template slot-scope="scope">
        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="异常设备数" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.title }}</span>
      </template>
    </el-table-column>

    <el-table-column width="200px" align="center" label="异常率">
      <template slot-scope="scope">
        <span>{{ scope.row.author }}</span>
      </template>
    </el-table-column>

    <el-table-column width="300px" label="操作" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </template>
    </el-table-column>
    </el-table>-->
    <div class="custom-tree-container">
      <div class="block">
        <div class="tree-header">
          <span class="tree-header-1">行政区名称</span>
          <span class="tree-header-2">
            <span class="tree-header-2-1">设备总数</span>
            <span class="tree-header-2-1">在线设备数</span>
            <span class="tree-header-2-1" >异常设备数</span>
            <span class="tree-header-2-1">异常率</span>
          </span>
        </div>

        <el-tree
          :props="areaSelectProps"
          :load="loadNode"
          :expand-on-click-node="false"
          lazy
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span class="tree_area">{{ node.label }}</span>
            <span class="tree_detail">
              <router-link :to="{path:'/terminal/exception-details', query:{ id: data.baseAreaId,type: 'total'} }">
                <el-button size="mini" type="text" class="my-button">{{ data.deviceTotal }}</el-button>
              </router-link>
              <span class="tree_span">{{ data.oneHourOnline }}</span>
              <router-link :to="{path:'/terminal/exception-details', query:{ id: data.baseAreaId,type: 'runout'} }">
                <el-button size="mini" type="text" class="my-button">{{ data.warnCount }}</el-button>
              </router-link>
              <span class="tree_span">{{ data.warnRate }}</span>
            </span>
          </span>
        </el-tree>

      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="异常参数设置"
      width="35%">
      <div class="mb20" style="display: inline-block">
        <span class="tcolor">
          <i class="el-icon-bell"/>
          可以通过鼠标移动滑标来调整各部分参数喔~</span>
      </div>
      <div style="display: inline-block;float: right">
        <div class="run-out"></div>
        <div style="display: inline-block">告罄</div>
      </div>
      <div class="mr10" style="display: inline-block;float: right">
        <div class="warning"></div>
        <div style="display: inline-block">警告</div>
      </div>
      <div class="mr10" style="display: inline-block;float: right">
        <div class="normal" ></div>
        <div style="display: inline-block">正常</div>
      </div>
      <div class="mb60 mt20">
        <span class="w-name" style="display: block">CPU参数设置：</span>
        <div class="scroll">
          <div :style="{width: cpuml1+'%'}" class="normal-scroll" ></div>
          <div :style="{width: cpuml2+'%'}" class="warning-scroll" ></div>
          <div :style="{width: rw+'%'}" class="runout-scroll" ></div>
          <span :style="{marginLeft: cpuml1+'%'}" class="bar" @mousedown="cpuDown1" @mousemove="cpuMove1" @mouseup="up" @mouseleave="leave"></span>
          <span :style="{marginLeft: cpuml2+'%'}" class="bar" @mousedown="cpuDown2" @mousemove="cpuMove2" @mouseup="up" @mouseleave="leave"></span>
          <span :style="{marginLeft: cpuml1+'%'}" class="number">{{ cpuml1 + '%' }}</span>
          <span :style="{marginLeft: cpuml2+'%'}" class="number">{{ cpuml2 + '%' }}</span>
          <!--<div class="mask" ></div>-->
        </div>
      </div>

      <div class="mb60">
        <span class="w-name">磁盘参数设置：</span>
        <div class="scroll">
          <div :style="{width: diskml1+'%'}" class="normal-scroll" ></div>
          <div :style="{width: diskml2+'%'}" class="warning-scroll" ></div>
          <div :style="{width: rw+'%'}" class="runout-scroll" ></div>
          <span :style="{marginLeft: diskml1+'%'}" class="bar" @mousedown="diskDown1" @mousemove="diskMove1" @mouseup="up" @mouseleave="leave"></span>
          <span :style="{marginLeft: diskml2+'%'}" class="bar" @mousedown="diskDown2" @mousemove="diskMove2" @mouseup="up" @mouseleave="leave"></span>
          <span :style="{marginLeft: diskml1+'%'}" class="number">{{ diskml1 + '%' }}</span>
          <span :style="{marginLeft: diskml2+'%'}" class="number">{{ diskml2 + '%' }}</span>
          <!--<div class="mask" ></div>-->
        </div>
      </div>

      <div class="mb60">
        <span class="w-name">内存参数设置：</span>
        <div class="scroll">
          <div :style="{width: memoml1+'%'}" class="normal-scroll" ></div>
          <div :style="{width: memoml2+'%'}" class="warning-scroll" ></div>
          <div :style="{width: rw+'%'}" class="runout-scroll" ></div>
          <span :style="{marginLeft: memoml1+'%'}" class="bar" @mousedown="memoDown1" @mousemove="memoMove1" @mouseup="up" @mouseleave="leave"></span>
          <span :style="{marginLeft: memoml2+'%'}" class="bar" @mousedown="memoDown2" @mousemove="memoMove2" @mouseup="up" @mouseleave="leave"></span>
          <span :style="{marginLeft: memoml1+'%'}" class="number">{{ memoml1 + '%' }}</span>
          <span :style="{marginLeft: memoml2+'%'}" class="number">{{ memoml2 + '%' }}</span>
          <!--<div class="mask" ></div>-->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitErrorParamsSetting()">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getExceptionList } from '@/api/terminal'
import { errorParamsSetting } from '@/api/terminal';

export default {
  name: 'ExceptionManage',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // value1: 60,
      // value2: 80,
      rw: 100,  // 最底层红色宽度
      cpuml1: 60, // CPU 第1个滑块距离左侧的距离 = 对应div宽度 默认60%
      cpuml2: 80, // CPU 第2个滑块距离左侧的距离 = 对应div宽度 默认80%
      cpudownpage1: '', // 第一个滑块按下时在屏幕中的位置
      cpumovepage1: '', // 第一个滑块移动时在屏幕中的位置
      cpudownpage2: '', // 第二个滑块按下时在屏幕中的位置
      cpumovepage2: '', // 第二个滑块移动时在屏幕中的位置
      diskml1: 60,
      diskml2: 80,
      diskdownpage1: '',
      diskmovepage1: '',
      diskdownpage2: '',
      diskmovepage2: '',
      memoml1: 60,
      memoml2: 80,
      memodownpage1: '',
      memomovepage1: '',
      memodownpage2: '',
      memomovepage2: '',
      flag1: false, // flag1控制第一个滑块是否能移动
      flag2: false, // flag2控制第一个滑块是否能移动
      // data4: data,
      // value1: [3, 6],
      // value2: [0, 3],
      // value3: [6, 10],
      // value9: [60, 80],
      form: {
        cpuRunOut: '',
        cpuWarn: '',
        diskRunOut: '',
        diskWarn: '',
        memoRunOut: '',
        memoWarn: '',
      },
      // 区域树形图
      areaSelectProps: {
        value: 'baseAreaId',
        label: 'baseAreaName',
        children: 'children',
        isLeaf: 'leaf',
      },
      areaList: [],
      dialogVisible: false,
      list: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     *  设置异常参数
     *  @param formName
     */
    submitErrorParamsSetting() {
      this.form.cpuWarn = this.cpuml1
      this.form.cpuRunOut = this.cpuml2
      this.form.diskWarn = this.diskml1
      this.form.diskRunOut = this.diskml2
      this.form.memoWarn = this.memoml1
      this.form.memoRunOut = this.memoml2
      console.log(this.form)
      errorParamsSetting(this.form).then(response => {
        this.$message.success('设置成功！')
        this.dialogVisible = false
      }).catch(() => {})
    },
    /**
     * cpu设置中 第一个滑块按下时获取x轴位置
     */
    cpuDown1(e) {
      console.log(1)
      this.cpudownpage1 = e.pageX
      this.flag1 = true
    },
    cpuDown2(e) {
      console.log(1)
      this.cpudownpage2 = e.pageX
      this.flag2 = true
    },
    diskDown1(e) {
      console.log(1)
      this.diskdownpage1 = e.pageX
      this.flag1 = true
    },
    diskDown2(e) {
      console.log(1)
      this.diskdownpage2 = e.pageX
      this.flag2 = true
    },
    memoDown1(e) {
      console.log(1)
      this.memodownpage1 = e.pageX
      this.flag1 = true
    },
    memoDown2(e) {
      console.log(1)
      this.memodownpage2 = e.pageX
      this.flag2 = true
    },
    // cpu设置中 第一个滑块移动时
    cpuMove1(e) {
      console.log(2)
      if (this.flag1) {
        this.cpumovepage1 = e.pageX
        const moved = (this.cpudownpage1 - this.cpumovepage1)  // 计算移动后的x轴位置与按下时初始位置的差值,如果大于0为向右，小于0为向左
        if (moved > 0) {
          const ml = moved / 500 * 100
          this.cpuml1 = parseInt(this.cpuml1 - ml)
          if (this.cpuml1 < 0) {
            this.cpuml1 = 0
          } else if (this.cpuml1 >= this.cpuml2) {
            this.cpuml1 = parseInt(this.cpuml2 - 1)
          }
        } else if (moved < 0) {
          const move = 0 - moved  // 移动的距离，绝对值
          const ml = move / 500 * 100 // 计算移动的百分比
          this.cpuml1 = Math.ceil(this.cpuml1 + ml)
        }
      }
      this.form.cpuWarn = this.cpuml1 + '%'   // 设置的值 = 滑块margin-left百分比 = 对应div宽度
      this.cpudownpage1 = this.cpumovepage1
      console.log(this.cpuml1)
    },
    cpuMove2(e) {
      console.log(2)
      if (this.flag2) {
        this.cpumovepage2 = e.pageX
        const moved = (this.cpudownpage2 - this.cpumovepage2)
        if (moved > 0) {
          const ml = moved / 500 * 100
          this.cpuml2 = parseInt(this.cpuml2 - ml)
          if (this.cpuml2 < 0) {
            this.cpuml2 = 0
          } else if (this.cpuml2 <= this.cpuml1) {
            this.cpuml2 = parseInt(this.cpuml1 + 1)
          }
        } else if (moved < 0) {
          const move = 0 - moved
          const ml = move / 500 * 100
          this.cpuml2 = Math.ceil(this.cpuml2 + ml)
        }
      }
      this.form.cpuRunOut = this.cpuml2 + '%'
      this.cpudownpage2 = this.cpumovepage2
      console.log(this.cpuml2)
    },
    diskMove1(e) {
      console.log(2)
      if (this.flag1) {
        this.diskmovepage1 = e.pageX
        const moved = (this.diskdownpage1 - this.diskmovepage1)
        if (moved > 0) {
          const ml = moved / 500 * 100
          this.diskml1 = parseInt(this.diskml1 - ml)
          if (this.diskml1 < 0) {
            this.diskml1 = 0
          } else if (this.diskml1 >= this.diskml2) {
            this.diskml1 = parseInt(this.diskml2 - 1)
          }
        } else if (moved < 0) {
          const move = 0 - moved
          const ml = move / 500 * 100
          this.diskml1 = Math.ceil(this.diskml1 + ml)
        }
      }
      this.form.diskWarn = this.diskml1 + '%'
      this.diskdownpage1 = this.diskmovepage1
      console.log(this.diskml1)
    },
    diskMove2(e) {
      console.log(2)
      if (this.flag2) {
        this.diskmovepage2 = e.pageX
        const moved = (this.diskdownpage2 - this.diskmovepage2)
        if (moved > 0) {
          const ml = moved / 500 * 100
          this.diskml2 = parseInt(this.diskml2 - ml)
          if (this.diskml2 < 0) {
            this.diskml2 = 0
          } else if (this.diskml2 <= this.diskml1) {
            this.diskml2 = parseInt(this.diskml1 + 1)
          }
        } else if (moved < 0) {
          const move = 0 - moved
          const ml = move / 500 * 100
          this.diskml2 = Math.ceil(this.diskml2 + ml)
        }
      }
      this.form.diskRunOut = this.diskml2 + '%'
      this.diskdownpage2 = this.diskmovepage2
      console.log(this.diskml2)
    },
    memoMove1(e) {
      console.log(2)
      if (this.flag1) {
        this.memomovepage1 = e.pageX
        const moved = (this.memodownpage1 - this.memomovepage1)
        if (moved > 0) {
          const ml = moved / 500 * 100
          this.memoml1 = parseInt(this.memoml1 - ml)
          if (this.memoml1 < 0) {
            this.memoml1 = 0
          } else if (this.memoml1 >= this.memoml2) {
            this.memoml1 = parseInt(this.memoml2 - 1)
          }
        } else if (moved < 0) {
          const move = 0 - moved
          const ml = move / 500 * 100
          this.memoml1 = Math.ceil(this.memoml1 + ml)
        }
      }
      this.form.memoWarn = this.memoml1 + '%'
      this.memodownpage1 = this.memomovepage1
      console.log(this.memoml1)
    },
    memoMove2(e) {
      console.log(2)
      if (this.flag2) {
        this.memomovepage2 = e.pageX
        const moved = (this.memodownpage2 - this.memomovepage2)
        if (moved > 0) {
          const ml = moved / 500 * 100
          this.memoml2 = parseInt(this.memoml2 - ml)
          if (this.memoml2 < 0) {
            this.memoml2 = 0
          } else if (this.memoml2 <= this.memoml1) {
            this.memoml2 = parseInt(this.memoml1 + 1)
          }
        } else if (moved < 0) {
          const move = 0 - moved
          const ml = move / 500 * 100
          this.memoml2 = Math.ceil(this.memoml2 + ml)
        }
      }
      this.form.memoRunOut = this.memoml2 + '%'
      this.memodownpage2 = this.memomovepage2
      console.log(this.memoml2)
    },
    // 鼠标松开时
    up() {
      console.log(3)
      this.flag1 = false
      this.flag2 = false
    },
    // 鼠标移出滑块时
    leave() {
      console.log(4)
      this.flag1 = false
      this.flag2 = false
    },
    // 获取数据
    getList() {
      getExceptionList(this.listQuery).then(response => {
        response = response.map(v => {
          if (v.childCnt > 0) {
            v.leaf = false;
          } else {
            v.leaf = true;
          }
          v.children = [];
          return v;
        });
        this.list = response;
        console.log(this.list)
      })
    },

    // 加载下级区域
    async loadNode(node, resolve) {
      let baseAreaId = '';
      if (node.data) {
        baseAreaId = node.data.baseAreaId
      }
      // debugger
      const areaList = await getExceptionList(baseAreaId);
      areaList.map(v => {
        if (v.childCnt > 0) {
          v.leaf = false
        } else {
          v.leaf = true
        }
        v.children = []
        return v
      })
      // debugger

      resolve(areaList)
    },

    formatTooltip(val) {
      return val / 100;
    },
    setCpuParam() {

    }

  }
}
</script>

<style scoped>
  .runout-scroll{
    width: 100%;
    height: 10px;
    background-color: red;
    z-index: 1;
    position: absolute;
  }
  .warning-scroll{
    width: 80%;
    height: 10px;
    background-color: orange;
    z-index: 2;
    position: absolute;

  }
  .normal-scroll{
    width: 60%;
    height: 10px;
    background-color: green;
    z-index: 3;
    position: absolute;

  }
  .mr10{
    margin-right: 10px;
  }
  .normal{
    background: green;
    width: 12px;
    height: 12px;
    border-radius: 50% 50%;
  }
  .warning{
    background: orange;
    width: 12px;
    height: 12px;
    border-radius: 50% 50%;
  }
  .run-out{
    background: red;
    width: 12px;
    height: 12px;
    border-radius: 50% 50%;
  }
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
.custom-tree-container{
  position: relative;
  top: 20px;
}
.tree-header{
  width: 100%;
  height: 40px;
  border: 1px solid #ebeef5;
  line-height: 40px;
  margin: 0;
  border-bottom: none;
  box-sizing: border-box;
  font-size: 16px;
  /*font-weight: 600;*/
}
.tree-header-1{
  display: inline-block;
  width: 30%;
  padding-left: 20px;
  box-sizing: border-box;
  color: #909399;
  font-weight: bold;
}
.tree-header-2{
  /*width: 70%;*/
  display: inline;
  box-sizing: border-box;
}
.tree-header-2-1{
  width: 17%;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  color: #909399;
  font-weight: bold;

}
.tree-header-2-1:last-child{
  float: right;
  /*margin-top: -40px;*/
  /*margin-right: 14px;*/
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  position: absolute;
  width: 100%;
  right: 0;
}

/* 设置一级树样式 */
.el-tree>div>.el-tree-node__content .tree_area{
  padding-left: 28px;
}

/* 设置二级树样式 */

.el-tree>div>div:nth-child(2)>div>.el-tree-node__content .tree_area{
  padding-left: 46px;
}

/* 设置三级树样式 */

.el-tree>div>div:nth-child(2)>div>div:nth-child(2)>div>.el-tree-node__content .tree_area{
  padding-left: 64px;
}
/* 设置四级树样式 */

.el-tree>div>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>.el-tree-node__content .tree_area{
  padding-left: 82px;
}
/* 设置五级树样式 */

.el-tree>div>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>.el-tree-node__content .tree_area{
  padding-left: 100px;
}
/* 设置六级树样式 */

.el-tree>div>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>.el-tree-node__content .tree_area{
  padding-left: 118px;
}
/* 设置七级树样式 */

.el-tree>div>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>.el-tree-node__content .tree_area{
  padding-left: 136px;
}

/*.el-tree>div>.group .tree_area{
  padding-left: 28px;
}*/

.el-tree{
  border: 1px solid #ebeef5;
}
.el-tree-node__content{
  height: 40px;
  border-bottom: 1px solid #ebeef5;
}
.tree_area{
  width: 30%;
}
.tree_detail{
  width: 70%;
}
.tree_span{
  width: 25%;
  display: inline-block;
  text-align: center;
}
.my-button{
  width: 25%;
  display: inline-block;
  text-align: center;
}
  /*进度条*/
.mb60{
  margin-bottom: 60px;
}
.scroll-top{
  width: 500px;
}
.scroll{
  /*top: -15px;*/
  margin-top: 20px;
  display: inline-block;
  width: 500px;
  height: 10px;
  position: relative;
}
.bar{
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #FFFFFF;
  position: absolute;
  top: -18px;
  left: -9px;
  cursor: pointer;
  box-shadow: 0px 0px 3px #42b983;
  /*z-index: 4;*/
}
.number{
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  top: 18px;
  left: -9px;
  /*z-index: 4;*/
}
.mask{
  position: absolute;
  left: 0;
  top: 0;
  background: #369;
  width: 0;
  height: 5px;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}
.el-icon-bell{
  color: #568cfa;
  font-size: 25px;
}
.tcolor{
  color: #a1a1a1;
}
.el-slider__bar{
  height: 6px;
  background-color: orange;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  position: absolute;
}
  .exception-tip{
    color: red;
    display: inline-block;
    height: 35px;
    line-height: 55px;
  }
  .pad{
    padding: 0;
  }
</style>
