<template>
  <aside class="teacher-sidebar">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical"
      @select="handleMenuSelect"
    >
      <el-menu-item index="assign-homework">
        <el-icon><document /></el-icon>
        <span>发布任务</span>
      </el-menu-item>
      <el-menu-item index="grade-homework">
        <el-icon><edit /></el-icon>
        <span>批改任务</span>
      </el-menu-item>
      <el-menu-item index="dashboard">
        <el-icon><data-line /></el-icon>
        <span>统计看板</span>
      </el-menu-item>
      <el-menu-item index="team-manage">
        <el-icon><UserFilled /></el-icon>
        <span>团队管理</span>
      </el-menu-item>
      <el-menu-item index="user-profile">
        <el-icon><avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Document,
  Edit,
  DataLine,
  Avatar,
  UserFilled
} from '@element-plus/icons-vue'

const router = useRouter()
const activeMenu = ref('assign-homework')

const handleMenuSelect = (index) => {
  router.push(`/teacher/${index}`)
}
</script>

<style scoped>
.teacher-sidebar {
  width: 220px;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #e6e6e6;
}

.el-menu-vertical {
  border-right: none;
}

.el-menu-item {
  height: 56px;
  line-height: 56px;
}
</style>