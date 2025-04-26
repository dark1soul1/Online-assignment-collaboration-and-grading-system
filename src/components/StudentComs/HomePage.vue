<template>
    <div class="task-list">
      <el-card 
        v-for="task in tasks" 
        :key="task.id"
        class="task-card"
        :class="{ 'high-priority': task.priority === 'high' }"
      >
        <div class="task-header">
          <div class="tags">
            <el-tag type="info">{{ task.task }}</el-tag>
            <el-tag 
              v-if="task.priority" 
              :type="priorityTypes[task.priority]"
            >
              {{ priorityLabels[task.priority] }}
            </el-tag>
          </div>
          <h3 class="task-title" @click="navigateToDetail(task.id)">
            {{ task.name }}
            <el-badge is-dot v-if="task.unread"></el-badge>
          </h3>
        </div>
  
        <div class="time-status" :style="timeStatusStyle(task)">
          <div class="time-left">
            <span class="icon">⏳</span>
            {{ formatTimeLeft(task.deadline) }}
          </div>
          <div class="steps">
            <el-steps :active="currentStepIndex(task)" finish-status="success" simple>
              <el-step 
                v-for="(step, index) in task.steps" 
                :key="index"
                :status="step.status"
              >
                <template #default>{{ step.name }}</template>
              </el-step>
            </el-steps>
          </div>
        </div>
  
        <div class="progress-container">
          <el-progress 
            :percentage="task.progress" 
            :color="progressColor(task.progress)"
            :format="() => `${task.progress}%`"
          />
          <el-progress 
            :percentage="task.classAverage" 
            color="#ccc"
            :format="() => `${task.classAverage}%`"
          />
          <div class="progress-labels">
            <span>我的进度 {{ task.progress }}%</span>
            <span>团队平均 {{ task.classAverage }}%</span>
          </div>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import dayjs from 'dayjs'
  
  const tasks = ref([
    {
      id: 1,
      name: '用户调研报告',
      task: '交互设计基础',
      priority: 'high',
      deadline: '2024-03-15 23:59',
      progress: 80,
      classAverage: 45,
      steps: [
        { name: '草案', status: 'finish' },
        { name: '互评', status: 'process' },
        { name: '终稿', status: 'wait' }
      ],
      unread: true
    }
  ])
  
  // 常量
  const priorityLabels = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  }
  
  const priorityTypes = {
    high: 'danger',
    medium: 'warning',
    low: 'info'
  }
  
  // 时间处理
  const now = ref(dayjs())
  let timer = null
  
  const formatTimeLeft = (deadline) => {
    const end = dayjs(deadline)
    const diff = end.diff(now.value, 'minute')
    
    if (diff <= 0) return '已超期'
    if (diff < 60) return `${diff}分钟`
    if (diff < 1440) return `${Math.floor(diff/60)}小时`
    return `${Math.floor(diff/1440)}天`
  }
  
  // 当前步骤索引
  const currentStepIndex = (task) => {
    for (let i = 0; i < task.steps.length; i++) {
      if (task.steps[i].status === 'process') return i;
      if (task.steps[i].status === 'finish') continue;
      return i;
    }
    return task.steps.length - 1;
  }
  
  // 进度条颜色
  const progressColor = (progress) => {
    if (progress === 100) return '#1890ff'
    if (progress > 75) return '#52c41a'
    if (progress > 40) return '#faad14'
    return '#ff4d4f'
  }
  
  // 时间状态样式
  const timeStatusStyle = (task) => {
    const end = dayjs(task.deadline)
    const diff = end.diff(now.value, 'hour')
    
    if (diff < 24) return { 
      color: '#ff4d4f',
      fontWeight: '600'
    }
    if (diff < 72) return {
      color: '#faad14'
    }
    return null
  }
  
  // 定时更新时间
  onMounted(() => {
    timer = setInterval(() => {
      now.value = dayjs()
    }, 60000) // 每分钟更新
  })
  
  onUnmounted(() => {
    clearInterval(timer)
  })
  </script>
  
  <style scoped>
  .task-list {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .task-card {
    margin-bottom: 16px;
  }
  
  .task-header {
    margin-bottom: 12px;
  }
  
  .task-title {
    margin: 4px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .tags {
    margin-bottom: 8px;
  }
  
  .time-status {
    margin-top: 12px;
  }
  
  .time-left {
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .icon {
    margin-right: 4px;
  }
  
  .progress-container {
    margin-top: 12px;
  }
  
  .progress-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  </style>  