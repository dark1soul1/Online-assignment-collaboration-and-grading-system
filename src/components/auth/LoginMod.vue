<template>
  <div class="auth-box" v-if="!isRegister">
    <h2 class="auth-title">登录</h2>
    <el-form @submit.prevent="handleLogin" :model="loginForm" :rules="rules" label-width="80px" ref="loginFormRef">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="loginForm.account" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input 
        type="password" 
        v-model="loginForm.password" 
        placeholder="请输入密码" 
        show-password />
      </el-form-item>
      <el-form-item>
        <el-button 
        type="primary" 
        native-type="submit" 
        class="auth-button"
        @click="handleSubmit()"
        >登录</el-button>
      </el-form-item>
    </el-form>
    <p class="auth-switch">
      没有账号？<a href="#" @click.prevent="userStore.switchToReg()">立即注册</a>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../store';
import { ElForm, ElFormItem, ElInput, ElButton,ElMessage } from 'element-plus';
import { login } from '../../api/index';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginFormRef = ref(null);
const userStore = useUserStore();
let isRegister = userStore.isRegister;

const loginForm = ref({
  account: '',
  password: '',
});

const rules = {
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/, message: '密码必须包含字母和数字', trigger: 'blur' }
  ]
};
/* const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      console.log('登录表单数据:', loginForm.value);
    } else {
      console.log('登录表单验证失败');
    }
  });
}; */


const handleSubmit = () => {
  if (loginFormRef.value && loginFormRef.value.validate) {
    loginFormRef.value.validate(async valid => {
      if (valid) {
        try {
          await handleLogin();
        } catch (error) {
          ElMessage.error(error.value);
        }
      } else {
        console.log('登陆失败!');
      }
    });
  }
};

const handleLogin = async () => {
  const responseBody = {
    account: loginForm.value.account,
    password: loginForm.value.password,
  };
  console.log('Response Body:', responseBody);
  let response = await login(responseBody);
  /* console.log('Response:', response); */
  userStore.updateUserInfo(response.data.data);
  if (response.data.code===200) {
    if(response.data.data.role==='教师')router.push(`/teacher/assign-homework`);
    userStore.handleLogin(response.data.data);
    /* ElMessage.success('登录成功'); */
  }
  else if(response.data.code===500){
    ElMessage.success('账号或密码错误');
  }
  else {
    throw new Error(response.msg);
  }
};

</script>

<style scoped>
@import './logAndReg.css';
</style>