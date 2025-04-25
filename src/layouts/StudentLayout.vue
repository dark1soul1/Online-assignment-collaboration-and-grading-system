<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li v-for="(item, index) in items" :key="index" class="nav-item">
        <a href="#" class="nav-link" :class="{'nav-action': whichIsActive==index}" @click="item.action">{{ item.label }}</a>
      </li>
    </ul>
    <div class="nav-avatar">
      <div class="nav-search"> 
            <input  
            class="search-input" 
            v-model="searchQuery" 
            @keyup.enter="performSearch" 
            placeholder="加入谁的团队?">
            <button class="search-button" @click="performSearch">
                <img src="../assets//icons//searchIcon.jpg" class="icon-picture" alt="">
            </button>
      </div>
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
        v-model="selectedTeamId"
        :options="teamOptions"
        placeholder="请选择你的团队"
        size="large"
        style="width: 240px"
        @change="handleTeamChange"
      />
    </div>
  </nav>
  <div class="student-main">
    <component :is="currentComponent" />
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { UserFilled } from '@element-plus/icons-vue';
import { useUserStore } from '../store/index';
import { ElMessage } from 'element-plus';
import HomePage from '../components/StudentComs/HomePage.vue';
import ProjectInfo from '../components/StudentComs/ProjectInfo.vue';
import CollaborationCom from '../components/StudentComs/CollaborationCom.vue';
import CommunicationCom from '../components/StudentComs/GradeCom.vue';
import userProfile from '../components/userProfile.vue';
import searchDeatails from '../components/StudentComs/searchDeatails.vue';
import { getTeam } from '../api/index';

const userStore = useUserStore();
const whichIsActive = computed(() => userStore.cur_module);
const searchQuery = ref('');
const userName = ref(userStore.name);

const teamOptions = ref([
  { value: '1', label: '团队A' },
  { value: '2', label: '团队B' },
  { value: '3', label: '团队C' }
]);
const selectedTeamId = ref(null);

/* const fetchTeams = async () => {
  try {
    const response = await getTeam(userStore.id);
    if (response.data.code === 0) {
      const teams = response.data.data || [];
      teamOptions.value = teams.map(team => ({
        value: team.id,
        label: team.teamName
      }));
      if (teams.length > 0) {
        selectedTeamId.value = teams[0].id; 
        userStore.currentTeamId = teams[0].id; 
      }
    } else {
      ElMessage.warning(response.data.msg || '获取团队信息失败');
    }
  } catch (error) {
    ElMessage.error('获取团队信息失败，请稍后再试');
  }
}; */

const handleTeamChange = (teamId) => {
  userStore.currentTeamId = teamId; 
};

/* onMounted(() => {
  fetchTeams(); 
}); */

const items = ref([
  { label: '首页',action: () =>userStore.cur_module=0 },
  { label: '获取资源',action: () =>userStore.cur_module=1 },
  { label: '在线协作',action: () =>userStore.cur_module=2 },
  { label: '在线沟通',action: () =>userStore.cur_module=3 },
  { label: '个人中心',action: () =>userStore.cur_module=4 }
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
        case 5:
            return searchDeatails;
        default:
            return HomePage;
    }
})

const performSearch=()=>{
  let trimmedQuery = searchQuery.value.trim();
  if (!trimmedQuery) {
    ElMessage.warning('搜索内容不能为空');
    return;
  }
  const minLength = 1;
  if (trimmedQuery.length < minLength) {
    ElMessage.warning(`搜索内容至少需要 ${minLength} 个字符`);
    return;
  }
  const allowedPattern = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
  if (!allowedPattern.test(trimmedQuery)) {
    ElMessage.warning('仅允许字母、数字和中文字符');
    return;
  }
  searchQuery.value=trimmedQuery;
  console.log("searchQuery:"+searchQuery.value);
  userStore.switchToSearchDetails(searchQuery);
  ElMessage('正在搜索:'+trimmedQuery);
};


const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const value = ref()
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
</script>

<style scoped>
@import '../assets//styles//stuAndTeaNav.css';
.nav-search {
  position: relative;
  border: 1px solid #c9c9c9;
  padding: 0 33px 0 11px;
  line-height: 36px;
  height: 40px;
  margin-right: 40px;
  border-radius: 3px;
  background-color: #fff;
}
.search-input {
  width: 174px;
  height: 36px;
  font-size: 14px;
  border: 0;
  background: transparent;
  outline: none;
  padding: 0 10px;
}
.search-button {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  width: 38px;
  height: 35px;
  overflow: visible;
  background: transparent;
}
.icon-picture {
  position: absolute;
  top: 50%;
  right: 11px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  background-position: 0 -40px;
}
</style>