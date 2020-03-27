<template>
  <div class="app-container">

    <el-form ref="form" :rules="rules" :model="form" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPwd" required>
        <el-input v-model="form.oldPwd" type="oldPwd" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd" required>
        <el-input v-model="form.newPwd" type="password" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPwd" required>
        <el-input v-model="form.confirmPwd" type="password" autocomplete="off"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { changePwd } from '@/api/system';

export default {
  name: 'Password',
  data() {
    // const validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'));
    //   } else {
    //     if (this.form.newPwd !== '') {
    //       this.$refs.form.validateField('newPwd');
    //     }
    //     callback();
    //   }
    // };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: '',
        token: ''
      },
      rules: {
        oldPwd: [
          // { validator: validatePass, trigger: 'blur' }
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9,.;~!@#%^*()_+-=/]{6,18}$/, message: '密码格式不正确，且长度应在6到18之间', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9,.;~!@#%^*()_+-=/]{6,18}$/, message: '密码格式不正确，且长度应在6到18之间', trigger: 'blur' }
        ],
        confirmPwd: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    this.form.token = localStorage.token
  },
  methods: {

    submitForm(formName) {
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePwd(this.form).then(response => {
            this.$message.success('修改成功')
          })
        } else {
          this.$message.error('修改失败')
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }

  },
}
</script>

<style scoped>
.pwd{
  display: inline-block;
  height: 36px;
  width: 190px;
  text-align: right
}
.pwd-container{
  margin-top: 15px;
}
</style>
