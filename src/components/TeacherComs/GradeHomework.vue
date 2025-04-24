<template>
  <div class="grade-homework">
    <h2>项目评分</h2>
    <div class="submission-list">
      <h3>提交记录</h3>
      <el-table :data="submissionList" style="width: 100%">
        <el-table-column prop="studentName" label="学生姓名" width="120" />
        <el-table-column prop="studentId" label="学号" width="120" />
        <el-table-column prop="filePath" label="文件路径" />
        <el-table-column prop="submissionTime" label="提交时间" width="180" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" @click="handlePreview(scope.row)">查看</el-button>
            <el-button size="small" type="primary" @click="handleGrade(scope.row)">批改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <el-dialog v-model="dialogVisible" title="作业批改" width="70%">
      <div class="grading-container">
        <div class="student-work">
          <h3>学生作业内容：</h3>
          <div class="work-content">
            {{ currentHomework.content }}
          </div>
        </div>
        
        <div class="grading-form">
          <el-form :model="gradingForm" label-width="80px">
            <el-form-item label="评分">
              <el-rate
                 v-model="gradingForm.score"
                :texts="['差', '较差', '一般', '良好', '优秀']"
                show-text
              />
            </el-form-item>
            <el-form-item label="评语">
              <el-input
                v-model="gradingForm.comment"
                type="textarea"
                :rows="4"
                placeholder="请输入评语"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitGrading">提交批改</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="previewDialogVisible" title="作业预览" width="70%">
      <div class="preview-content">
        {{ previewContent }}
      </div>
    </el-dialog>

    
  </div>
</template>

<script setup>
import { ref } from 'vue';

const submissionList = ref([
  {
    studentName: '张三',
    studentId: '2021001',
    filePath: './',
    submissionTime: '2023-05-10 14:30',
    content: '这里是学生提交的作业内容...'
  },
  {
    studentName: '李四',
    studentId: '2021002',
    filePath: './',
    submissionTime: '2023-05-11 09:15',
    content: '这里是另一个学生提交的作业内容...'
  }
])

const dialogVisible = ref(false)
const currentHomework = ref({})
const gradingForm = ref({
  score: 0,
  comment: ''
})

const previewDialogVisible = ref(false); // 新增：控制预览对话框的显示
const previewContent = ref(''); // 新增：存储预览内容

const handleGrade = (row) => {
  currentHomework.value = row
  dialogVisible.value = true
}

const handlePreview = (row) => {
  previewContent.value = row.content; // 设置预览内容为当前作业的 content
  previewDialogVisible.value = true; // 显示预览对话框
}

const submitGrading = () => {
  ElMessage.success('批改结果已提交')
  dialogVisible.value = false
}

/* 
onMounted(async () => {
  try {
    const response = await getSubmission({ tid: 1, aid: 1 }); // 修改为对象形式传递参数
    if (response.code === 0) {
      submissionList.value = response.data.map(item => ({
        studentName: `学生${item.userId}`,
        studentId: item.userId,
        submissionTime: item.submissionTime,
        filePath: item.filePath
      }));
    } else {
      ElMessage.error(response.msg || '获取提交记录失败');
    }
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试');
  }
});
 */
</script>

<style scoped>
.grade-homework {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.grading-container {
  display: flex;
  gap: 20px;
}

.student-work {
  flex: 1;
}

.work-content {
  padding: 10px;
  border: 1px solid #eee;
  min-height: 200px;
}

.grading-form {
  width: 300px;
}

.submission-list {
  margin-top: 20px;
}

.preview-content {
  white-space: pre-wrap; /* 保留换行和空格 */
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}
</style>