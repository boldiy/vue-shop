<template>
  <div class="login-container">
    <div style="height: 50px;text-align: center;">注册</div>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginFormRef"
      label-width="80px"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
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
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度至少为6位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          // 对密码进行MD5加密
          const encryptedPassword = md5(this.loginForm.password);
          try {
            // 将加密后的密码放入请求数据中
            const requestData = {
             ...this.loginForm,
              password: encryptedPassword
            };

            const response = await axios.post('/api/register', requestData);
            if (response.data.success) {
              console.log('注册成功');
              // 这里可以进行登录成功后的页面跳转等操作，比如使用router.push('/home')，前提是配置了路由

              localStorage.setItem('userinfo', this.loginForm);

             console.log(localStorage.getItem('userinfo'))
            } else {
              console.log('登录失败：', response.data.message);
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