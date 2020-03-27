// 系统管理 -- 角色管理 -- 新增角色
<template>
<div class="form-container">
  <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="roleForm.roleName"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="textarea" rows="4" class="input-textarea" v-model="roleForm.remark"></el-input>
    </el-form-item>
    <el-form-item label="权限划分" prop="parentAuthorityCheckLis">
      <span class="tips">(至少选一个模块权限)</span>
      <div class="select-border">
        <div>
          <el-checkbox-group v-model="roleForm.parentAuthorityCheckLis">
            <div v-for="(menu, index) in authorityList" :key="menu.adminMenuId" class="separate">
              <span class="module-type">
                <el-checkbox class="fw600" 
                  :label="menu.adminMenuId"
                  @change="menuChange(menu)"
                >{{menu.menuName}}</el-checkbox>
              </span>
                <el-checkbox-group v-model="childrenAuthorityCheckList[menu.adminMenuId]">
                  <span v-for="childMenu in menu.children" :key="childMenu.adminMenuId" class="module-detail">
                    <el-checkbox class="fw600" 
                      :label="childMenu.adminMenuId"
                      @change="pageChange(childMenu.adminMenuId, menu.adminMenuId)"
                    >{{childMenu.menuName}}</el-checkbox>
                    <el-checkbox-group v-model="pageAuthorityCheckList[childMenu.adminMenuId]" style="display:inline-block">
                      <el-checkbox v-for="menuButon in childMenu.menuButonList" 
                        :key="menuButon.adminMenuButtonId" 
                        :label="menuButon.adminMenuButtonId"
                        @change="buttonChange(menuButon.adminMenuButtonId, childMenu.adminMenuId, menu.adminMenuId)"
                      >{{menuButon.buttonName}}</el-checkbox>
                    </el-checkbox-group>
                  </span>
                </el-checkbox-group>
            </div>
          </el-checkbox-group>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-radio v-for="v in lockStatus" :key="v.id" :label="v.id" v-model="roleForm.state">{{v.name}}</el-radio>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {lockStatus} from '@/config/statusType'
import {addRoleInfo, editRoleInfo, getRoleDetail} from '@/api/system'

export default {
    data() {
      return {
        lockStatus: lockStatus.data,
        authorityList: [],
        childrenAuthorityCheckList: {},
        pageAuthorityCheckList: {},
        pageType: 'add',
        roleId: '',
        roleForm: {
          roleName: '',
          remark: '',
          state: '1',
          parentAuthorityCheckLis: [],
        },
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { max: 30, message: '角色名称最长为30个字', trigger: 'blur' }
          ],
          remark: [
            { max: 100, message: '备注最大长度为100个字', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          parentAuthorityCheckLis: [
            { required: true, message: '请填写活动形式', trigger: 'change' }
          ],
        }
      };
    },
    computed: {
      ...mapGetters([
        'adminUserId',
        'menuList',
      ]),
    },
    created() {
      const roleId = this.$route.params.id;
      this.roleId = roleId;

      // 判断是编辑还是新增
      if(roleId){
        // 编辑首先进行数据回填
        this.setPageDate(roleId);
        this.pageType = 'edit';
      }else{
        // 新增获取store中的权限列表
        this.formatterAuthorityList(this.menuList);
        this.pageType = 'add';
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            // 组装选中的按钮列表
            let buttonIdList = [];
            for(let pageButton in this.pageAuthorityCheckList){
              buttonIdList = buttonIdList.concat(this.pageAuthorityCheckList[pageButton])
            }
            
            // 组装选中的菜单列表
            let menuIdList = [];
            for(let childPage in this.childrenAuthorityCheckList){
              menuIdList = menuIdList.concat(this.childrenAuthorityCheckList[childPage]);
            }
            menuIdList = menuIdList.concat(this.roleForm.parentAuthorityCheckLis);

            const saveParams = {
              buttonIdList: buttonIdList,
              menuIdList: menuIdList,
              remark: this.roleForm.remark,
              roleName: this.roleForm.roleName,
              state: this.roleForm.state,
              roleId: this.roleId,
            }

            debugger

            // 根据页面是编辑还是新增保存数据
            if(this.pageType === 'add'){
              addRoleInfo(saveParams).then(v => {
                this.$message.success('添加数据成功!')
                let _self = this;
                setTimeout(function(){
                  _self.$router.push({path: '/system/role-manage'});
                },2000)
              });
            }else{
              editRoleInfo(saveParams).then(v => {
                this.$message.success('编辑数据成功!')
                let _self = this;
                setTimeout(function(){
                  _self.$router.push({path: '/system/role-manage'});
                },2000)
              });
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 编辑页面时数据回填
      async setPageDate(roleId) {
        const roleInfo = await getRoleDetail(roleId);
        this.roleForm.roleName = roleInfo.roleName;
        this.roleForm.remark = roleInfo.roleDesc;
        this.roleForm.state = roleInfo.locked;

        // 展示权限划分并默认选中
        this.formatterAuthorityList(roleInfo.menuList);
      },

      // 点击角色按钮
      buttonChange(buttonId, menuId, parentMenuId) {

        // 如果选中的buttonId, 则其上级也要选中
        if(this.pageAuthorityCheckList[menuId].indexOf(buttonId) > -1){

            // 选中上级
           if(this.childrenAuthorityCheckList[parentMenuId].length === 0){
            this.childrenAuthorityCheckList[parentMenuId].push(menuId);
           } 

           // 选中上上级
           if(this.roleForm.parentAuthorityCheckLis.indexOf(parentMenuId) === -1){
             this.roleForm.parentAuthorityCheckLis.push(parentMenuId);
           }
        }
      },

      // 页面按钮点击
      pageChange(menuId, parentMenuId) {
        
        // 如果选中了页面，则其上级也要选择
        if(this.childrenAuthorityCheckList[parentMenuId].indexOf(menuId) > -1){

          // 选中上级
          if(this.roleForm.parentAuthorityCheckLis.indexOf(parentMenuId) === -1){
            this.roleForm.parentAuthorityCheckLis.push(parentMenuId);
          }
        }else{

          // 如果本级取消选中，则其下级都要取消选中
          this.pageAuthorityCheckList[menuId] = [];
        }
      },

      //点击选择模块
      menuChange(menu) {

        // 如果取消模块选中，则相应的页面和按钮都要取消选中
        if(this.roleForm.parentAuthorityCheckLis.indexOf(menu.adminMenuId) === -1){
          this.childrenAuthorityCheckList[menu.adminMenuId] = [];
          menu.children.map( child => {
            this.pageAuthorityCheckList[child.adminMenuId] = [];
          })
        }
      },

      //格式化
      formatterAuthorityList(menuList){
        debugger
        let authorityList = [];

        // 获取第一级的权限
        menuList.forEach(v => {
          if (!v.parentId) {
            v.children = [];

            // 创建保存二级选择的数组
            this.$set(this.childrenAuthorityCheckList, v.adminMenuId, []);

            // 如果是编辑页面，则保存当前选中的权限
            if(this.pageType === 'edit' && v.checked){
              this.roleForm.parentAuthorityCheckLis.push(v.adminMenuId);
            }

            authorityList.push(v);
          }
        });

        // 获取二级权限
        menuList.forEach(menu => {
          if (menu.parentId) {

            // 创建保存按钮选择的数组
            this.$set(this.pageAuthorityCheckList, menu.adminMenuId, []);

            // 如果是编辑页面，则保存当前页面选中的权限
            if(this.pageType === 'edit' && menu.checked){
              this.childrenAuthorityCheckList[menu.parentId].push(menu.adminMenuId);
            }

            // 如果是编辑页面，则保存当前按钮选中的权限
            if(this.pageType === 'edit'){
              menu.menuButonList.map(v => {
                if(v.checked){
                  this.pageAuthorityCheckList[menu.adminMenuId].push(v.adminMenuButtonId);
                }
              });
            }

            // 组合数据格式
            authorityList = authorityList.map(v => {
              if (menu.parentId === v.adminMenuId) {
                v.children.push(menu);
              }
              return v;
            })
          }
        })
        this.authorityList = authorityList;
      }


    }
  }
</script>

<style scoped>
  .tips{
    font-size: 12px;
    color: #666;
  }
  .el-checkbox{
    width: 85px;
  }
</style>
