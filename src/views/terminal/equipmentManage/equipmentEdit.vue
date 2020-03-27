// 终端管理 -- 设备管理  --- 设备操作 -- 编辑
<template>

<div class="form-container">
  <el-form ref="form" :model="listQuery"  label-width="200px">
    
    <el-form-item label="所在区域：" prop="name">
      <AreaSelect :onChange="changeAreaSelect" :selectAreaPath="selectAreaPath" :hasSchoolSelect="false" />
    </el-form-item>

    <el-form-item
      label="所在学校："
      :rules="[
            { required: true, message: '请选择操作系统'},
          ]">
      <el-select v-model="listQuery.osType" placeholder="请选择操作系统">
        <el-option label="请选择" value="请选择"></el-option>
        <el-option v-for="item in osTypeStatusData" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
 
    <el-form-item label="所在教室：" :rules="[{ required: true, message: '所在教室不能为空'}]">
      <el-select v-model="listQuery.clzroomName">
        <el-option label="请选择" value="请选择"></el-option>
        <el-option v-for="item in classRoom" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="教室识别码：" :rules="[{ required: true, message: '教室识别码不能为空'}]">
      <el-input v-model="listQuery.mac"></el-input>
    </el-form-item>

    <el-form-item label="终端高级上传密码：" :rules="[{ required: true, message: '密码不能为空'}]">
      <el-input v-model="listQuery.devicePassword"></el-input>
    </el-form-item>

    <el-form-item label="激活时间：">
      <el-input :readonly=true></el-input>
    </el-form-item>

    <el-form-item label="操作系统版本：">
      <el-input :readonly=true></el-input>
    </el-form-item>

    <el-form-item label="操作系统位数：">
      <el-input :readonly=true></el-input>
    </el-form-item>

    <el-form-item label="音频驱动版本号：">
      <el-input :readonly=true></el-input>
    </el-form-item>

    <el-form-item label="视频驱动版本号：">
      <el-input :readonly=true></el-input>
    </el-form-item>

    <el-form-item label="显卡驱动版本号：">
      <el-input :readonly=true></el-input>
    </el-form-item>

    <el-form-item label="厂商：">
      <el-input v-model="listQuery.firmName"></el-input>
    </el-form-item>

    <el-form-item label="硬件SN号：">
      <el-input v-model="listQuery.hardwareSN"></el-input>
    </el-form-item>

    <el-form-item label="施工人所在公司：">
      <el-input v-model="listQuery.constructorFirm"></el-input>
    </el-form-item>

    <el-form-item label="施工人姓名：">
      <el-input v-model="listQuery.constructorName"></el-input>
    </el-form-item>

    <el-form-item label="施工人手机号：">
      <el-input v-model="listQuery.constructorPhone"></el-input>
    </el-form-item>

    <el-form-item label="TeamViewer号码：">
      <el-input v-model="listQuery.teamViewerNum"></el-input>
    </el-form-item>

    <el-form-item label="TeamViewer密码：">
      <el-input v-model="listQuery.teamViewerPassword"></el-input>
    </el-form-item>

    <el-form-item label="状态：" prop="name">
      <el-radio v-for = 'item of lockStatusData' :key="item.id" v-model="radio" :label="item.id">{{item.name}}</el-radio>
    </el-form-item>

    <el-form-item class="center">
      <el-button type="primary">保存</el-button>
    </el-form-item>

  </el-form>
</div>
</template>

<script>
import AreaSelect from '@/components/AreaSelect';
import { lockStatus, osTypeStatus } from '@/config/statusType';

export default {
  name: 'EquipmentEdit',
  components: {
    AreaSelect
  },
  data () {
    return {
      lockStatusData: lockStatus.data,
      osTypeStatusData: osTypeStatus.data,
      listQuery: {
        deviceId: '',       // 设备id
        areaNamePath: '',   // 所在区域
        schoolName: '',     // 所在学校
        clzroomName: '',    // 所在教室
        devicePassword:'',  // 终端高级设置密码
        firmName:'',        // 厂商
        hardwareSN:'',      // 硬件SN号
        mac:'',             // 教室识别码
        constructorFirm: '',    // 施工人所在公司
        constructorName: '',    // 施工人姓名
        constructorPhone: '',   // 施工人手机号
        teamViewerNum: '',      // TeamViewer号码
        teamViewerPassword: '', // TeamViewer密码
        status: ''             // 状态
      },
      radio: '1',
      classRoom: [{
        id: '01',
        name: '教室1'
      }, {
        id: '02',
        name: '教室2'
      }, {
        id: '03',
        name: '教室3'
      }],
      selectAreaPath: ['6sdfsf23rfsdf', '6sdfsf23rfsdf', '6sdfsf23rfsdf']
    }
  },
  methods: {
    changeAreaSelect (selectObj) {
      this.listQuery.baseAreaId = selectObj.baseAreaId;
    },
    //改变区域或学校的值时
    changeAreaSelect(selectObj){
      console.log(selectObj);
    }
  }
}
</script>

