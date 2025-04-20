<template>
  <div class="auth-box" v-if="isRegister">
    <h2 class="auth-title">注册</h2>
    <el-form @submit.prevent="handleRegister" :model="registerForm" :rules="rules" label-width="80px" ref="registerFormRef">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="registerForm.confirmPassword" placeholder="请再次输入密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" class="auth-button">注册</el-button>
      </el-form-item>
    </el-form>
    <p class="auth-switch">
      已有账号？<a href="#" @click="userStore.switchToLog()">立即登录</a>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../store';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';

const userStore = useUserStore();
let isRegister = userStore.isRegister;

const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
});

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== registerForm.value.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/, message: '密码必须包含字母和数字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/, message: '密码必须包含字母和数字', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
};

const registerFormRef = ref(null);

const handleRegister = () => {
  registerFormRef.value.validate((valid) => {
    if (valid) {
      console.log('注册表单数据:', registerForm.value);
    } else {
      console.log('注册表单验证失败');
    }
  });
};
</script>

<style scoped>
@import './logAndReg.css';
</style>