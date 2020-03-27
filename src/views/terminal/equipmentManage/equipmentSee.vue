// 终端管理 -- 设备管理  --- 设备操作 -- 查看
<template>
  <div class="form-container">
    <ul class="detail-contiant">
      <li>
        <span class="left">所在区域:</span>
        <span class="right">{{details.areaNamePath}}</span>
      </li>
      <li>
        <span class="left">所在学校:</span>
        <span class="right">{{details.schoolName}}</span>
      </li>

      <li>
        <span class="left">所在教室:</span>
        <span class="right">{{details.clzroomName}}</span>
      </li>

      <li>
        <span class="left">教室识别码:</span>
        <span class="right">{{details.deviceId}}</span>
      </li>

      <li>
        <span class="left">终端高级设置密码:</span>
        <span class="right">{{details.devicePwd}}</span>
      </li>

      <li>
        <span class="left">激活时间:</span>
        <span class="right">{{details.activeTime}}</span>
      </li>

      <li>
        <span class="left">操作系统版本:</span>
        <span class="right">{{details.osTypeId}}</span>
      </li>

      <li>
        <span class="left">操作系统位数:</span>
        <span class="right">{{details.osBit}}</span>
      </li>

      <li>
        <span class="left">音频驱动版本号:</span>
        <span class="right">{{details.audioDrvVer}}</span>
      </li>

      <li>
        <span class="left">视频驱动版本号:</span>
        <span class="right">{{details.videoDrvVer}}</span>
      </li>

      <li>
        <span class="left">显卡驱动版本号:</span>
        <span class="right">{{details.softVer}}</span>
      </li>

      <li>
        <span class="left">厂商:</span>
        <span class="right">{{details.hardwareFirm}}</span>
      </li>

      <li>
        <span class="left">硬件SN号:</span>
        <span class="right">{{details.hardwareSn}}</span>
      </li>

      <li>
        <span class="left">施工人所在公司:</span>
        <span class="right">{{details.constructorFirm}}</span>
      </li>

      <li>
        <span class="left">施工人姓名:</span>
        <span class="right">{{details.constructorName}}</span>
      </li>

      <li>
        <span class="left">施工人手机号:</span>
        <span class="right">{{details.constructorPhone}}</span>
      </li>

      <li>
        <span class="left">TeamViewer号码:</span>
        <span class="right">{{details.teamviewerId}}</span>
      </li>

      <li>
        <span class="left">TeamViewer密码:</span>
        <span class="right">{{details.teamviewerPwd}}</span>
      </li>
      
      <li>
        <span class="left">状态:</span>
        <span class="right">{{getStateStatus(details.deviceStat)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { terminalDetail } from '@/api/terminal.js';
import { stateStatus } from '@/config/statusType.js';   // 状态标志

export default {
  name: 'EquipmentSee',
  data () {
    return {
      details: {},
      listLoading: true
    }
  },
  created () {
    this.detailsFn();
  },
  methods: {
    detailsFn () {
      this.listLoading = true;

      // 获取当前设备的id
      const deviceId = this.$route.params.id;

      // 获取设备详情信息
      terminalDetail(deviceId).then(response => {
        this.details = response;
        this.listLoading = false;
      })
    },

    // 获取状态标识
    getStateStatus(value) {
      return stateStatus.getText(value);
    }
  },
}
</script>

<style>

</style>


