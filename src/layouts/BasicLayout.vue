<template>
<div class="layout ">
    <header class="layout-header">
      <h1>在线作业协作及评分系统</h1>
      <!-- <tButton /> -->
    </header>
    <div class="layout-main">
        <component :is="currentComponent" />
    </div>
    <footer class="layout-footer">
        <p>© 华中农业大学 软件工程团队</p>
    </footer>
</div>
</template>

<script setup>
import {ref,computed} from 'vue';
import { useUserStore } from '../store';
import tButton from '../components/ThemeToggler/ThemeToggler.vue';
import auth from './AuthLayout.vue';
import student from './StudentLayout.vue';
import teacher from './TeacherLayout.vue';

const userstore=useUserStore();

const currentComponent=computed(()=>{
    switch(userstore.cur_component){
        case 'auth':
            return auth;
        case 'student':
            return student;
        case 'teacher':
            return teacher;
    }
})
</script>

<style scoped>


.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}
  
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  background: linear-gradient(to bottom, #409eff, #a0cfff);
  color: white;
  box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

.layout-main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px;
}
  
.layout-footer {
    padding: 10px;
    background: linear-gradient(to bottom, #f5f5f5,#409eff );
    color: white;
    text-align: center;
}
</style>