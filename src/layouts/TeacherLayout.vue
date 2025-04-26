<template>
  <div class="teacher-layout">
    <TeacherHeader />
    <div class="main-container">
      <TeacherSidebar />
      <TeacherMain />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import TeacherHeader from '../components/TeacherComs/TeacherHeader.vue'
import TeacherSidebar from '../components/TeacherComs/TeacherSidebar.vue'
import TeacherMain from '../components/TeacherComs/TeacherMain.vue'
</script>

<style scoped>
.teacher-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>