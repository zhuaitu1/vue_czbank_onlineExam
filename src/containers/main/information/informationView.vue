<template lang="html">
  <div class="changePass">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="工号" prop="oldPass">
        <el-col :span="10">
        <el-input type="password" v-model="ruleForm.jobNo" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="姓名" prop="pass">
        <el-col :span="10">
        <el-input type="password" v-model="ruleForm.name" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电话">
        <el-col :span="10">
        <el-input type="password" v-model="ruleForm.phone" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-col :span="10">
        <el-input type="password" v-model="ruleForm.email" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="微信号">
        <el-col :span="10">
        <el-input type="password" v-model="ruleForm.wxNo" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="部门">
        <el-col :span="10">
        <el-input type="password" v-model="ruleForm.department" auto-complete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import httpServer from '@/components/httpServer/httpServer.js'

export default {
    data() {
      var checkOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入工号'));
        }
        else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          oldPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPass: [
            { validator: checkOldPass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            httpServer({
                url: '/user/changePassword'
              }, {
                jobNo: localStorage.username,
                password: this.ruleForm.oldPass,
                newPassword: this.ruleForm.pass
              })
              .then((res) => {
                // if() {
                  localStorage.removeItem('username');
                  this.$router.push('/login');
               // }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="css">
.changePass {
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
