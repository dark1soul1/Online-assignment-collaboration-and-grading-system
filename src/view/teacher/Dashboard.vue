<template>
  <div class="dashboard">
    <h2>作业统计看板</h2>
    
    <div class="stat-cards">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">85%</div>
              <div class="stat-label">平均完成率</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">78.5</div>
              <div class="stat-label">平均分</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">24</div>
              <div class="stat-label">已提交人数</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">5</div>
              <div class="stat-label">未提交人数</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div class="charts">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover">
            <div class="chart-title">成绩分布</div>
            <div class="chart-container">
              <!-- 这里可以接入ECharts或其他图表库 -->
              <div class="mock-chart" style="height: 300px; background: #f5f7fa; display: flex; justify-content: center; align-items: center;">
                成绩分布图表
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <div class="chart-title">提交时间分布</div>
            <div class="chart-container">
              <div class="mock-chart" style="height: 300px; background: #f5f7fa; display: flex; justify-content: center; align-items: center;">
                提交时间图表
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div class="homework-list">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span>最近作业</span>
          </div>
        </template>
        <el-table :data="recentHomework" style="width: 100%">
          <el-table-column prop="title" label="作业标题" />
          <el-table-column prop="deadline" label="截止日期" width="180" />
          <el-table-column prop="submitted" label="已提交/总人数" width="150" />
          <el-table-column prop="avgScore" label="平均分" width="100" />
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button size="small" @click="viewDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recentHomework = ref([
  {
    title: 'Vue3组件开发',
    deadline: '2023-05-15',
    submitted: '24/30',
    avgScore: '78.5'
  },
  {
    title: 'Vue Router实践',
    deadline: '2023-05-08',
    submitted: '28/30',
    avgScore: '82.3'
  },
  {
    title: 'Pinia状态管理',
    deadline: '2023-05-01',
    submitted: '30/30',
    avgScore: '85.7'
  }
])

const viewDetail = (row) => {
  // 查看详情逻辑
  console.log('查看作业详情:', row.title)
}
</script>

<style scoped>
.dashboard {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  color: #999;
}

.charts {
  margin-bottom: 20px;
}

.chart-title {
  margin-bottom: 15px;
  font-weight: bold;
}

.homework-list {
  margin-top: 20px;
}

.card-header {
  font-weight: bold;
}

.mock-chart {
  border-radius: 4px;
}
</style>