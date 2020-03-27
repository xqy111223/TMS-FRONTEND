<!--用户管理-查看用户-->
<template>
  <div class="form-container">
    <ul class="detail-contiant">
      <li>
        <span class="left">用户名称:</span>
        <span class="right">{{ list.username }}</span>
      </li>
      <li>
        <span class="left">密码:</span>
        <span class="right">{{ list.password }}</span>
      </li>
      <li>
        <span class="left">姓名:</span>
        <span class="right">{{ list.realname }}</span>
      </li>
      <li>
        <span class="left">邮箱:</span>
        <span class="right">{{ list.email }}</span>
      </li>
      <li>
        <span class="left">手机号:</span>
        <span class="right">{{ list.contact }}</span>
      </li>
      <li>
        <span class="left">负责区域:</span>
        <span class="right">
          <div class="select-border mt13">
            <div class="separate">
              <span class="module-detail">
                <span v-for="(item, index) in regionList" :key="index">{{ item }}</span>
              </span>
            </div>
          </div>
        </span>
      </li>
      <li>
        <span class="left">所属角色:</span>
        <span class="right">
          <div class="select-border mt13">
            <div class="separate">
              <span class="module-detail">
                <span v-for="(item, index) in roleNameList" :key="index">{{ item }}</span>
              </span>
            </div>
          </div>
        </span>
      </li>
      <li>
        <span class="left">状态:</span>
        <span class="right">{{ getLockStatus(list.locked) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { editUser } from '@/api/system';
import { lockStatus } from '@/config/statusType'

export default {
  data() {
    return {
      list: [],
      roleNameList: [],
      regionList: [],
      selectAreaPath: [],
      hasSchoolSelect: false,
      selectedOptions: [],
      areaNameList: [],
      selectAreaId: '',
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.getUserInfo(userId)
  },
  methods: {
    async getUserInfo(userId) {
      const roleInfo = await editUser(userId)
      this.list = roleInfo
      console.log(this.list)
      // 角色列表
      const roleNameList = [];
      this.list.roleList.map(s => {
        roleNameList.push(s.roleName)
      })
      this.roleNameList = roleNameList
      // 区域列表
      const regionList = [];
      this.list.areaList.map(s => {
        regionList.push(s.areaNamePath)
      })
      this.regionList = regionList
    },

    // 获取锁定标志
    getLockStatus(state) {
      return lockStatus.getText(state)
    }
  }

}
</script>
