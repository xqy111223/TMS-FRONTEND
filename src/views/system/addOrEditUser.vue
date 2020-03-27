<!--用户管理-编辑/新增用户-->
<template>
  <div class="form-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名称" prop="userName" required>
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="姓名" prop="realName" required>
        <el-input v-model="form.realName" />
      </el-form-item>
      <el-form-item label="手机号" prop="contact" required>
        <el-input v-model="form.contact" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email" required>
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="所属角色" prop="roleIds" required>
        <span class="tips">(至少选一个角色)</span>
        <div class="select-border">
          <div>
            <span class="module-detail">
              <el-checkbox-group v-model="form.roleIds">
                <el-checkbox v-for="(item,index) in list" :key="index" :label="item.adminRoleId">{{ item.roleName }}</el-checkbox>
              </el-checkbox-group>
            </span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="负责区域" prop="areaIds" required>
        <div class="select-border">
          <div>
            <span class="module-detail">
              <AreaSelect
                :on-change="changeAreaList"
                :has-school-select="hasSchoolSelect"
                :select-area-path="selectAreaPath"
              />
              <el-button size="small" @click="addArea()">添加</el-button>
            </span>
            <div v-for="(item, index) in regionList" :key="index" class="ml20">
              <span class=" span-width">{{ item.selectAreaName }}</span> <el-button class="ml10" type="danger" size="small" @click="removeRegionItem(index)">删除</el-button>
            </div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="状态" prop="locked" required>
        <el-radio v-model="form.locked" label="1">开启</el-radio>
        <el-radio v-model="form.locked" label="0">关闭</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { addUser } from '@/api/system';
import { editUser } from '@/api/system';
import { lockStatus } from '@/config/statusType';
import { saveEditUser } from '@/api/system';
import { getAllRoles } from '@/api/system';
import AreaSelect from '@/components/AreaSelect'

export default {
  components: { AreaSelect },
  data() {
    return {
      list: [],
      selectAreaPath: [],
      hasSchoolSelect: false,
      selectedOptions: [],
      areaNameList: [],
      regionList: [],
      selectAreaId: '',
      form: {
        userName: '',
        password: '',
        realName: '',
        contact: '',
        email: '',
        roleIds: [],
        areaIds: [],
        locked: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min: 5, max: 30, message: '用户名长度应在5到30之间', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9,.;~!@#%^*()_+-=/]{5,30}$/, message: '用户名格式不正确,且长度在5到30之间' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { min: 6, max: 18, message: '密码长度应在6到18之间', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9,.;~!@#%^*()_+-=/]{6,18}$/, message: '密码格式不正确，且长度应在6到18之间', trigger: 'blur' }

        ],
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 30, message: '姓名最大长度为30个字' }

        ],
        contact: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的联系电话', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        roleIds: [
          { type: 'array', required: true, message: '请选择角色', trigger: 'blur' }
        ],
        locked: [
          {  required: true, message: '请选择状态', trigger: 'change' }
        ],
        regionList: [
          {  required: true, message: '请选择负责区域', trigger: 'blur' }
        ],

      },
    };
  },
  created() {
    // 获取角色类型
    // const roleList = await getAllRoles();
    // roleList.map(v => (
    //   v.check = false
    // ))
    // this.list = roleList
    this.getRolesType()

    // 如果是编辑用户，回填数据
    if (this.$route.params.id) {
      const userId = this.$route.params.id
      this.backFill(userId)
      // const roleInfo = await editUser(userId)
      // console.log(roleInfo)
      //
      // // 负责区域回填
      // roleInfo.areaList.map(v => {
      //   this.form.areaIds.push(v.baseAreaId)// 保存时返回的区域ID列表
      //   const  selectedArea = {
      //     selectAreaName: v.areaNamePath,
      //     selectId: v.baseAreaId
      //   }
      //   this.regionList.push(selectedArea)// 页面中展示的区域列表
      // })
      //
      // this.form.userName = roleInfo.username
      // this.form.password = roleInfo.password
      // this.form.realName = roleInfo.realname
      // this.form.contact = roleInfo.contact
      // this.form.locked = roleInfo.locked
      // this.form.email = roleInfo.email
      //
      // roleInfo.roleList.map(v => {
      //   this.form.roleIds.push(v.adminRoleId)
      // })
    }
  },
  methods: {
    // 获取角色类型
    async getRolesType() {
      const roleList = await getAllRoles();
      roleList.map(v => (
        v.check = false
      ))
      this.list = roleList
    },
    // 回填数据
    async backFill(userId) {
      const roleInfo = await editUser(userId)
      console.log(roleInfo)

      roleInfo.areaList.map(v => {
        this.form.areaIds.push(v.baseAreaId)// 保存时返回的区域ID列表
        const  selectedArea = {
          selectAreaName: v.areaNamePath,
          selectId: v.baseAreaId
        }
        this.regionList.push(selectedArea)// 页面中展示的区域列表
      })

      this.form.userName = roleInfo.username
      this.form.password = roleInfo.password
      this.form.realName = roleInfo.realname
      this.form.contact = roleInfo.contact
      this.form.locked = roleInfo.locked
      console.log(this.form.locked)
      this.form.email = roleInfo.email

      roleInfo.roleList.map(v => {
        this.form.roleIds.push(v.adminRoleId)
      })
    },

    // 提交表单
    submitForm(formName) {
      this.regionList.map(v => {  // 将页面中展示的区域列表中的ID push到areaIds返回给后台
        this.form.areaIds.push(v.selectId)
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.params.id) {
            saveEditUser(this.form).then(response => {
              console.log(this.form)
              this.$message.success('编辑用户成功')
            })
          } else {
            addUser(this.form).then(response => {
              console.log(this.form)
              this.$message.success('新增用户成功')
            })
          }
        } else {
          this.$message.error('操作失败')
        }
      });
    },

    // 获取角色类型
    // getRole() {
    //   getAllRoles().then(response => {
    //     const list = response
    //     list.map(v => (
    //       v.check = false
    //     ))
    //     this.list = list
    //     console.log(this.list)
    //   })
    // },

    // 选择区域
    changeAreaList(data) {
      if (data.areaName) {
        this.areaNameList.push(data.areaName)
        console.log(this.areaNameList)
      } else {
        this.areaNameList = [];
      }
      this.selectAreaId = data.baseAreaId;
      console.log(this.selectAreaId)
    },

    // 添加负责区域
    addArea() {
      const selectAreaName = this.areaNameList.join('-')
      const  selectedArea = {
        selectAreaName: selectAreaName,
        selectId: this.selectAreaId
      }
      if (this.selectAreaId) {
        // 判断重复
        // this.selectAreaId  this.regionList
        if (this.regionList.length !== 0) {
          this.regionList.map(v => {
            debugger
            if (v.selectId.indexOf(this.selectAreaId) === -1) {
              this.regionList.push(selectedArea)
            }
          })
        } else {
          this.regionList.push(selectedArea)
          this.form.areaIds.push(selectedArea.selectId)
        }
        console.log(this.regionList)
      }
    },

    // 删除展示的负责区域列表
    removeRegionItem(index) {
      this.regionList.splice(index, 1)
      this.form.areaIds.splice(index, 1)
    }
  },

  // 获取锁定标志
  getLockStatus(state) {
    return lockStatus.getText(state)
  }

}
</script>

<style scoped>
  .tips{
    font-size: 12px;
    color: #666;
  }
  .el-checkbox__label{
    width: 70px;
  }
  .area-add{
    width: 186px;
    display: inline-block;
  }
  .ml0{
    margin-left: 0px;
  }
  .el-form-item__content{
    margin-right: 100px;
  }
  .ml20{
    margin-left: 20px;
  }
  .span-width{
    width: 195px;
    display: inline-block;
    padding-left: 15px;
  }
</style>
