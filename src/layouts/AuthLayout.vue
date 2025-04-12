<template>
    <div class="auth-layout">
      <header class="auth-header">
        <h1>在线作业协作及评分系统</h1>
      </header>
      <div class="slogan-wrap">
        <span class="slogan-text animate-float">
          <span class="gradient-text">Grade Together,</span>
          <span class="highlight-text">Grow Together</span>
        </span>
      </div>
      <div class="auth-main">
        <div class="con-col-1">
          数据看板
        </div>
        <div class="con-col-2">
          公告轮播
        </div>
        <div class="con-col-1"><Login /><Register /></div>
      </div>
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
  padding: 24px 20px;
  background-color: #409eff;
  color: white;
  text-align: center;
  box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

.auth-main {
  display: flex;
  flex-wrap: wrap;
}

.auth-footer {
  padding: 10px;
  background-color: #409eff;
  color: white;
  text-align: center;
}

.con-col-1 {
  flex:0 0 25%;
  max-width: 25%;
}

.con-col-2 {
  flex:0 0 50%;
  max-width: 50%;
}

.slogan-wrap {
  margin-top: 16px;
  position: relative;
}

.slogan-text {
  display: inline-block;
  font-family: 'Segoe UI', sans-serif;
  padding: 8px 16px;
  border-radius: 4px;
  position: relative;
  margin-left: 513px;
}

.gradient-text {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  font-size: 2.4em;
  letter-spacing: -0.5px;
}

.highlight-text {
  color: #e74c3c;
  font-size:  1.8em;
  font-weight: 700;
  margin-left: 8px;
  text-shadow: 0 2px 4px rgba(231, 76, 60, 0.15);
}

.animate-float {
  animation: textFloat 2s ease-in-out infinite;
}

@keyframes textFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.slogan-text::before {
  content: '✧ ';
  position: absolute;
  left:0;
  top: 35%;
  color: #bdc3c7;
  font-size: 1.2em;
  font-weight: 300;
}

@media (max-width: 768px) {
  .slogan-text {
    padding: 8px 16px;
  }
  
  .gradient-text {
    font-size: 1.2em;
  }
  
  .highlight-text {
    font-size: 1.1em;
  }
  
  .slogan-text::before {
    left: -24px;
  }
}




</style>