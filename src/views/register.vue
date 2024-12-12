<template>
  <div class="login-container">
    <div style="height: 50px;text-align: center;">注册</div>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginFormRef"
      label-width="80px"
    >
      <el-form-item label="账号" prop="UserCode">
        <el-input v-model="loginForm.UserCode" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="Password">
        <el-input v-model="loginForm.Password" placeholder="请输入密码" type="password" ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="Mobile">
        <el-input v-model="loginForm.Mobile" placeholder="请输入手机号码" type="mobile" max="11"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="UserName">
        <el-input v-model="loginForm.UserName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">提交注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'md5'

export default {
  data() {
    return {
      loginForm: {
        UserCode: "",
        Password: "",
        Mobile: "",
        UserName: "",
      },
      rules: {
        UserCode: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        Password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度至少为6位", trigger: "blur" }
        ],
        Mobile: [
          { max: 11, message: "11位手机号码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          // 对密码进行MD5加密
          const encryptedPassword = md5(this.loginForm.UserCode);
          try {
            // 将加密后的密码放入请求数据中
            const requestData = {
             ...this.loginForm,
             Password: encryptedPassword
            };

            const dataParams = {
              Data: {
                EntityData: {
                  UserCode:this.loginForm.UserCode,
                  Password:encryptedPassword, 
                  Mobile:this.loginForm.Mobile,
                  UserName:this.loginForm.UserName,
                  isValid:1,
                },
              },
            };
            const response = await axios.post('/api/UserInfo/CreateEntity', dataParams);
            console.log('注册成功',response);
            if (response.data && response.data.Sign) {
              this.$router.push('loginForm'); 
            } else {
              //console.log('注册失败：', response.data.message);
            }
          } catch (error) {
            console.log('请求出错：', error);
          }
        } else {
          console.log('表单验证不通过');
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push('register')
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 100px auto;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
}
</style>