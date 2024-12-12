<template>
  <div class="login-container">
    <div style="height: 50px;text-align: center;">登录</div>
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
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script> 
import md5 from 'md5'//加密

export default {
  mounted() {
    localStorage.clear();
  },
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
            let params1 = '';
            let paramsArr= [];            
            paramsArr.push(`UserCode=\"${this.loginForm.username}\"`);
            paramsArr.push(`Password=\"${encryptedPassword}\"`);
            params1 = paramsArr.join(' AND ');
            const params ={
              entityQuery:{
              PageSize:1,
              StartIndex:0,
              Criteria:params1,           
            }};

            //调用登录接口
            this.$axios.get("/api/UserInfo/QueryEntityList", {params}).then(response => { 
              if(response&&response.data&&response.data.Data.Page) { 
                //console.log('cg', localStorage.getItem('usercode')); 
                localStorage.setItem('usercode', response.data.Data.Page[0].UserCode);//保存用户信息                
                this.$router.push('phone');//跳转到首页 
              }
            });            
          } catch (error) {
            console.log('请求出错：', error);
          }
        } else {
          console.log('表单验证不通过');
          return false;
        }
      });
    },
    register() {
      this.$router.push('register');//跳转注册页面
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