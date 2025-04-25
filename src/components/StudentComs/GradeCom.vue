<template>
  <el-card class="grade-card">
    <template #header>
      <div class="card-header">
        <span>评分详情</span>
      </div>
    </template>
    <div v-if="loading" class="loading">
      <el-skeleton :rows="6" animated />
    </div>
    <div v-else-if="error" class="error">
      <el-result icon="error" title="获取评分失败" :sub-title="error">
        <template #extra>
          <el-button type="primary" @click="fetchScore">重试</el-button>
        </template>
      </el-result>
    </div>
    <div v-else-if="!scoreData || scoreData.length === 0" class="empty">
      <el-result icon="info" title="暂无评分数据" sub-title="当前学生尚未提交评分记录">
        <template #extra>
          <el-button type="primary" @click="fetchScore">刷新</el-button>
        </template>
      </el-result>
    </div>
    <el-descriptions v-else class="score-details" :column="1" border>
      <el-descriptions-item v-for="(score, index) in scoreData" :key="index">
        <div class="score-item">
          <div class="score-header">
            <span class="score-id">评分记录ID: {{ score.gradeId }}</span>
            <span class="score-time">评分时间: {{ score.gradedTime }}</span>
          </div>
          <div class="score-body">
            <p><strong>提交记录ID:</strong> {{ score.submissionId }}</p>
            <p><strong>分数:</strong> {{ score.score }}</p>
            <p><strong>评语:</strong> {{ score.feedback || '暂无评语' }}</p>
            <p><strong>评分教师ID:</strong> {{ score.gradedBy }}</p>
          </div>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getScore } from '../../api/index';
import {useUserStore} from '../../store/index';

const userStore = useUserStore();
const sid = userStore.id;

const loading = ref(false);
const error = ref('');
const scoreData = ref([
  {
    gradeId: 1001,
    submissionId: 2001,
    score: 85,
    feedback: '表现良好，但需进一步优化代码结构。',
    gradedBy: 'Teacher001',
    gradedTime: '2023-10-01 14:30:00'
  },
  {
    gradeId: 1002,
    submissionId: 2002,
    score: 90,
    feedback: '整体表现优秀，继续保持！',
    gradedBy: 'Teacher002',
    gradedTime: '2023-09-25 10:45:00'
  },
  {
    gradeId: 1003,
    submissionId: 2003,
    score: 78,
    feedback: '需要加强代码注释和模块化设计。',
    gradedBy: 'Teacher003',
    gradedTime: '2023-09-18 15:20:00'
  },
  {
    gradeId: 1004,
    submissionId: 2004,
    score: 88,
    feedback: '逻辑清晰，但性能优化仍有空间。',
    gradedBy: 'Teacher004',
    gradedTime: '2023-09-10 09:15:00'
  },
  {
    gradeId: 1005,
    submissionId: 2005,
    score: 92,
    feedback: '非常出色，继续保持！',
    gradedBy: 'Teacher005',
    gradedTime: '2023-08-28 14:00:00'
  }
]);

/* const fetchScore = async () => {
  loading.value = true;
  error.value = '';
  try {
    const response = await getScore(sid);
    if (response.code === 0 && response.data) {
      scoreData.value = response.data;
    } else {
      error.value = response.msg || '未找到评分记录';
    }
  } catch (err) {
    error.value = '网络错误，请稍后重试';
    console.error('获取评分失败:', err);
  } finally {
    loading.value = false;
  }
};

// 页面加载时获取评分数据
onMounted(() => {
  fetchScore();
}); */

</script>

<style scoped>
.grade-card {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.score-details {
  margin-top: 20px;
}

.score-item {
  border-bottom: 1px solid #ebeef5;
  padding: 15px 0;
}

.score-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.score-id {
  font-weight: bold;
}

.score-time {
  color: #909399;
  font-size: 12px;
}

.score-body p {
  margin: 5px 0;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 20px;
}
</style>