<template>
    <div class="auth-layout">
      <header class="auth-header">
        <h1>在线作业协作及评分系统</h1>
      </header>
      <main class="auth-main">
        <Login />
      </main>
    <footer class="auth-footer">
      <p>© xxxxxxxx</p>
    </footer>
  </div>
</template>

<script setup>
import Login from '../views/auth/LoginMod.vue';
import Register from '../views/auth/RegisterMod.vue';
</script>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.auth-header {
  padding: 20px;
  background-color: #409eff;
  color: white;
  text-align: center;
}

.auth-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.auth-footer {
  padding: 10px;
  background-color: #409eff;
  color: white;
  text-align: center;
}
</style>