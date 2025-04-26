<template>
  <div class="dashboard">
    <h2>作业统计看板</h2>
    
    <div class="stat-cards">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">{{ completionRate }}%</div>
              <div class="stat-label">平均完成率</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">{{ averageScore }}</div>
              <div class="stat-label">平均分</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">{{ submittedCount }}</div>
              <div class="stat-label">已提交人数</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">{{ unsubmittedCount }}</div>
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
import { getWork } from '../../api/index';

const scoreChart = ref(null);
const timeChart = ref(null);

const homeworkList = ref([
  {
    id: 1,
    title: '数学作业1',
    deadline: '2023-10-10 23:59:59',
    openAt: '2023-10-05 00:00:00',
    createdAt: '2023-10-04 10:00:00',
    description: '完成数学练习册第1-10题',
    scoreRule: '总分100分，每题10分',
    uploadMethod: '文本'
  },
  {
    id: 2,
    title: '语文作业2',
    deadline: '2023-10-12 23:59:59',
    openAt: '2023-10-07 00:00:00',
    createdAt: '2023-10-06 10:00:00',
    description: '阅读《红楼梦》第1-5回，并写读后感',
    scoreRule: '总分100分，读后感占80分，字数不少于500字',
    uploadMethod: '文本'
  },
  {
    id: 3,
    title: '英语作业3',
    deadline: '2023-10-15 23:59:59',
    openAt: '2023-10-10 00:00:00',
    createdAt: '2023-10-09 10:00:00',
    description: '完成英语单词默写，听写第1-20课单词',
    scoreRule: '总分100分，每课5分',
    uploadMethod: '文本'
  }
]);

// 计算统计卡片的数据
const completionRate = ref(85); // 平均完成率
const averageScore = ref(78.5); // 平均分
const submittedCount = ref(24); // 已提交人数
const unsubmittedCount = ref(5); // 未提交人数

// 最近作业数据
const recentHomework = ref([]);

onMounted(async () => {
    try {
      calculateStats();
     // 调用接口获取教师的作业信息
    /* const response = await getWork(1); // 假设教师ID为1
    if (response.code === 0 && response.data) {
      homeworkList.value = response.data.ta.map(item => ({
        title: item.title,
        deadline: item.deadline,
        openAt: item.openAt,
        createdAt: item.createdAt,
        description: item.description,
        scoreRule: item.scoreRule,
        uploadMethod: item.uploadMethod
      })); 

      // 计算统计卡片的数据
      
     } else {
      ElMessage.error(response.msg || '获取作业信息失败'); 
    }*/
    } 
    catch (error) {
      ElMessage.error('网络错误，请稍后重试');
      console.error('获取作业信息失败:', error);
    }
  
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

//计算统计卡片的数据
const calculateStats = () => {
  // 这里可以根据实际需求计算统计数据
  // 例如：计算平均完成率、平均分、已提交人数、未提交人数等
  completionRate.value = 85;
  averageScore.value = 78.5;
  submittedCount.value = 24;
  unsubmittedCount.value = 5;

  // 更新最近作业数据
  recentHomework.value = homeworkList.value.slice(0, 5).map(item => ({
    title: item.title,
    deadline: item.deadline,
    submitted: `${Math.floor(Math.random() * 30)}/${30}`, // 随机生成已提交人数
    avgScore: (Math.random() * 100).toFixed(1) // 随机生成平均分
  }));
};

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