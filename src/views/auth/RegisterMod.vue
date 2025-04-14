<template>
    <div class="auth-box" v-if="isRegister">
        <h2 class="auth-title">注册</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="reg-username">用户名</label>
            <input
              type="text"
              id="reg-username"
              v-model="registerForm.username"
              placeholder="请输入用户名"
              required
            />
          </div>
          <div class="form-group">
            <label for="reg-password">密码</label>
            <input
              type="password"
              id="reg-password"
              v-model="registerForm.password"
              placeholder="请输入密码"
              required
            />
          </div>
          <div class="form-group">
            <label for="confirm-password">确认密码</label>
            <input
              type="password"
              id="confirm-password"
              v-model="registerForm.confirmPassword"
              placeholder="请再次输入密码"
              required
            />
          </div>
          <button type="submit" class="auth-button">注册</button>
        </form>
        <p class="auth-switch">
          已有账号？<a href="#" @click="userStore.switchToLog()">立即登录</a>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../store';

const userStore = useUserStore();
let isRegister = userStore.isRegister;

  const registerForm = ref({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const handleRegister = () => {
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    console.log('注册表单数据:', registerForm.value);
  };
</script>

<style scoped>
@import './logAndReg.css';
</style>