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
            <div class="chart-container" ref="scoreChart"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <div class="chart-title">提交时间分布</div>
            <div class="chart-container" ref="timeChart"></div>
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
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const scoreChart = ref(null);
const timeChart = ref(null);

onMounted(() => {
  // 初始化成绩分布图表
  const scoreChartInstance = echarts.init(scoreChart.value);
  const scoreOption = {
    title: {
      text: '成绩分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '成绩',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 30, name: '90-100分' },
          { value: 20, name: '80-89分' },
          { value: 15, name: '70-79分' },
          { value: 10, name: '60-69分' },
          { value: 5, name: '60分以下' }
        ]
      }
    ]
  };
  scoreChartInstance.setOption(scoreOption);

  // 初始化提交时间分布图表
  const timeChartInstance = echarts.init(timeChart.value);
  const timeOption = {
    title: {
      text: '提交时间分布',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '06:00', '12:00', '18:00', '24:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [10, 20, 30, 40, 50],
        type: 'bar'
      }
    ]
  };
  timeChartInstance.setOption(timeOption);
});
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

.chart-container {
  height: 300px;
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