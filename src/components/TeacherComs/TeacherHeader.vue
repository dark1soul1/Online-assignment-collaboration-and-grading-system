

<template>
  <header class="teacher-header">
    <div class="header-content">
      <h1 class="main-title">Grade Together, Grow Together</h1>
      <div class="header-controls">
        <div class="course-selector">
          <el-select v-model="currentCourse" placeholder="请选择课程">
            <el-option
              v-for="course in courses"
              :key="course"
              :label="course"
              :value="course"
            />
          </el-select>
        </div>
        <div class="user-profile">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ teacherName }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item @click="handleLogout()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store';

const router = useRouter();
const userStore = useUserStore();

const teacherName = ref('张老师')
const currentCourse = ref('软件工程')
const courses = ref([
  '1',
  '2',
  '3',
  '4',
  '5',
  '6'
])

const handleLogout = () => {
  router.push('/home');
  userStore.handleLogout;
}
</script>

<style scoped>
.teacher-header {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 0 20px;
  height: 70px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.header-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(to right, #ffffff, #f3f9ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.course-selector {
  width: 200px;
}

.course-selector :deep(.el-input__inner) {
  border-radius: 20px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-profile .el-dropdown-link {
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: all 0.3s ease;
}

.user-profile .el-dropdown-link:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.el-dropdown-menu {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.el-dropdown-menu__item {
  padding: 10px 16px;
}
</style>