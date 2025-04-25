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
import { ref, onMounted } from 'vue';
import { getSubmission, gradeWork, updateGrade } from '../../api/index';
import { ElMessage } from 'element-plus';

const submissionList = ref([
  {
    id: 1,
    studentName: '张三',
    studentId: '2023001',
    submissionTime: '2023-10-01 10:00:00',
    filePath: '/submissions/2023001_assignment1.txt',
    content: '这是张三的作业内容'
  },
  {
    id: 2,
    studentName: '李四',
    studentId: '2023002',
    submissionTime: '2023-10-01 11:30:00',
    filePath: '/submissions/2023002_assignment1.txt',
    content: '这是李四的作业内容'
  },
  {
    id: 3,
    studentName: '王五',
    studentId: '2023003',
    submissionTime: '2023-10-01 14:45:00',
    filePath: '/submissions/2023003_assignment1.txt',
    content: '这是王五的作业内容'
  }
]);

/* const fetchSubmissionList = async () => {
  try {
    const response = await getSubmission({ tid: 1, aid: 1 }); // 假设教师ID为1，作业ID为1
    if (response.code === 0 && response.data) {
      submissionList.value = response.data.map(item => ({
        studentName: `学生${item.userId}`,
        studentId: item.userId,
        submissionTime: item.submissionTime,
        filePath: item.filePath || '无文件',
        content: item.content || '无内容'
      }));
    } else {
      ElMessage.error(response.msg || '获取提交记录失败');
    }
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试');
    console.error('获取提交记录失败:', error);
  }
}; */


const dialogVisible = ref(false);
const currentHomework = ref({});
const gradingForm = ref({
  score: 0,
  comment: '',
  submissionId: null,
  gradeId: null,
  gradedBy: 1 // 假设教师ID为1
});

const handleGrade = (row) => {
  currentHomework.value = row;
  gradingForm.value.submissionId = row.id;
  gradingForm.value.gradeId = row.gradeId || null; // 如果有现有评分ID，则更新评分
  gradingForm.value.score = row.score || 0;
  gradingForm.value.comment = row.feedback || '';
  dialogVisible.value = true;
};

const handlePreview = (row) => {
  previewContent.value = row.content;
  previewDialogVisible.value = true;
};

const submitGrading = async () => {
  try {
    const data = {
      submissionId: gradingForm.value.submissionId,
      score: gradingForm.value.score,
      feedback: gradingForm.value.comment,
      gradedBy: gradingForm.value.gradedBy
    };

    if (gradingForm.value.gradeId) {
      // 更新评分
      data.gradeId = gradingForm.value.gradeId;
      await updateGrade(data);
      ElMessage.success('评分已更新');
    } else {
      // 新增评分
      await gradeWork(data);
      ElMessage.success('评分已提交');
    }

    dialogVisible.value = false;
    // 刷新提交记录列表
    const response = await getSubmission({ tid: 1, aid: 1 });
    if (response.code === 0) {
      submissionList.value = response.data;
    }
  } catch (error) {
    ElMessage.error('评分失败，请稍后重试');
    console.error('评分失败:', error);
  }
};

const previewDialogVisible = ref(false);
const previewContent = ref('');

/* 
onMounted(async () => {
  try {
    fetchSubmissionList();
    const response = await getSubmission({ tid: 1, aid: 1 }); // 调用接口，传入教师ID和作业ID
    if (response.code === 0) {
      submissionList.value = response.data.map(item => ({
        studentName: `学生${item.userId}`,
        studentId: item.userId,
        submissionTime: item.submissionTime,
        filePath: item.filePath,
        content: item.content || '无内容' // 如果接口返回的内容为空，则显示默认值
      }));
    } else {
      ElMessage.error(response.msg || '获取提交记录失败');
    }
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试');
    console.error('接口调用失败:', error);
  }
}); */
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