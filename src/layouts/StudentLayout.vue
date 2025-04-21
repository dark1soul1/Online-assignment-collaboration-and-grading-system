<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li v-for="(item, index) in items" :key="index" class="nav-item">
        <a href="#" class="nav-link" :class="{'nav-action': whichIsActive==index}" @click="item.action">{{ item.label }}</a>
      </li>
    </ul>
    <div class="nav-avatar">
      <el-avatar :icon="UserFilled" />
      <el-dropdown class="el-dropdown-container">
        <span class="el-dropdown-link">
          {{ userName }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userStore.handleLogout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-select-v2
      v-model="value"
      :options="options"
      placeholder="请选择你的团队"
      size="large"
      style="width: 240px"
    />
    </div>
  </nav>
  <div class="student-main">
    <component :is="currentComponent" />
</div>
</template>

<script setup>
import { ref,computed } from 'vue';
import { UserFilled } from '@element-plus/icons-vue';
import { useUserStore } from '../store';
import HomePage from '../components/StudentComs/HomePage.vue';
import ProjectInfo from '../components/StudentComs/ProjectInfo.vue';
import CollaborationCom from '../components/StudentComs/CollaborationCom.vue';
import CommunicationCom from '../components/StudentComs/CommunicationCom.vue';
import userProfile from '../components/userProfile.vue';

const userStore = useUserStore();
const whichIsActive=ref(0); 
const userName=ref(userStore.name);

const items = ref([
  { label: '首页',  action: () =>whichIsActive.value=0 },
  { label: '项目信息',  action: () =>whichIsActive.value=1 },
  { label: '在线协作',  action: () =>whichIsActive.value=2 },
  { label: '在线沟通',  action: () =>whichIsActive.value=3 },
  { label: '个人中心',  action: () =>whichIsActive.value=4 }
]);

const currentComponent=computed(()=>{
    switch(whichIsActive.value){
        case 0:
            return HomePage;
        case 1:
            return ProjectInfo;
        case 2:
            return CollaborationCom;
        case 3:
            return CommunicationCom;
        case 4:
            return userProfile;
    }
})

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const value = ref()
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
</script>

<style scoped>
.navbar {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: .5rem 1rem;
  margin: -20px;
  color: #000;
  background: linear-gradient(to bottom, #a0cfff,#f5f5f5);
}
.navbar-nav {
  display: flex;
  flex-direction: row;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  margin-right: auto;
}
.nav-avatar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  height: 50px;
}

.nav-action {
  font-weight: 800 !important;
}
.nav-link{
  display: block;
  padding: .5rem 1rem;
}

.el-dropdow-link {
  cursor: pointer;
}
.el-dropdown-link:focus,
.el-dropdown-link:hover {
  outline: none;
  border: none;
}

.example-showcase .el-select-v2 {
  margin-right: 20px;
}

.student-main {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-top: 30px;
  padding-right:15px;
  padding-left: 15px;
}
</style>