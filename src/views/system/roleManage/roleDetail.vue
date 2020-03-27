<template>
  <div class="form-container">
    <ul class="detail-contiant">
      <li>
        <span class="left">角色名称:</span>
        <span class="right">{{roleInfo.roleName}}</span>
      </li>
      <li>
        <span class="left">备注:</span>
        <span class="right">{{roleInfo.roleDesc}}</span>
      </li>
      <li>
        <span class="left">权限划分:</span>
        <span class="right">
          <div class="select-border mt13">

            <div v-for="menu in authorityList">
              <span class="module-type">
                <span class="fw600">{{menu.menuName}}</span>
                <span v-for="childMenu in menu.children" class="module-detail">
                  <span class="role fw600" >{{childMenu.menuName}}</span>
                  <span v-for="menuButon in childMenu.menuButonList" class="role">{{menuButon.buttonName}}</span>
                </span>
              </span>
            </div>


            <!-- <div class="separate">
              <span class="module-type">
                <span class="fw600">系统管理</span>
              </span>
              <span class="module-detail">
                <span class="role fw600" >角色管理</span>
                <span class="role">新增角色</span>
                <span class="role">编辑</span>
                <span class="role">删除</span>
                <span class="role">查看</span>
              </span>
            </div> -->
          </div>
        </span>
      </li>
      <li>
        <span class="left">状态:</span>
        <span class="right">{{getLockStatus(roleInfo.locked)}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import {getRoleDetail} from '@/api/system'
import {lockStatus} from '@/config/statusType'
export default {
  data() {
    return {
      roleInfo: {},
      authorityList: [],
    }
  },

  mounted (){
    this.getRoleInfo();
  },

  methods: {

    //请求获取角色详情
    async getRoleInfo() {
      const roleId = this.$route.params.id;
      const request = await getRoleDetail(roleId);

      // 调整数据结构，整合为树形结构
      debugger
      const menuList = request.menuList;
      var authorityList = [];

      // 获取第一级的权限
      menuList.forEach(v => {
        if (v.menuLevel == 1 && v.checked) {
          v.children = [];
          authorityList.push(v);
        }
      });

      // 获取二级权限
      menuList.forEach(menu => {
        if (menu.menuLevel == 2 && menu.checked) {
          authorityList = authorityList.map(v => {
            if (menu.parentId === v.adminMenuId) {
              v.children.push(menu);
            }
            return v;
          })
        }
      })
      debugger
      this.authorityList = authorityList;
      this.roleInfo = request;
    },

     //获取状态值
    getLockStatus(status){
      return lockStatus.getText(status);
    },
  }
}
</script>
<style scoped>
.detail-contiant li .right{
  width: 75%;
}
.module-detail .role {
    width: 120px;
}
</style>


