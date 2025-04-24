<template>
  <div class="grade-homework">
    <h2>批改作业</h2>
    
    <el-table :data="homeworkList" style="width: 100%">
      <el-table-column prop="studentName" label="学生姓名" width="120" />
      <el-table-column prop="studentId" label="学号" width="120" />
      <el-table-column prop="homeworkTitle" label="作业标题" />
      <el-table-column prop="submitTime" label="提交时间" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleGrade(scope.row)">批改</el-button>
          <el-button size="small" type="primary" @click="handlePreview(scope.row)">预览</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 批改对话框 -->
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
              <el-input-number v-model="gradingForm.score" :min="0" :max="100" />
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const homeworkList = ref([
  {
    studentName: '张三',
    studentId: '2021001',
    homeworkTitle: 'Vue3组件开发',
    submitTime: '2023-05-10 14:30',
    content: '这里是学生提交的作业内容...'
  },
  {
    studentName: '李四',
    studentId: '2021002',
    homeworkTitle: 'Vue3组件开发',
    submitTime: '2023-05-11 09:15',
    content: '这里是另一个学生提交的作业内容...'
  }
])

const dialogVisible = ref(false)
const currentHomework = ref({})
const gradingForm = ref({
  score: 0,
  comment: ''
})

const handleGrade = (row) => {
  currentHomework.value = row
  dialogVisible.value = true
}

const handlePreview = (row) => {
  // 预览逻辑
  ElMessage.info(`预览学生 ${row.studentName} 的作业`)
}

const submitGrading = () => {
  ElMessage.success('批改结果已提交')
  dialogVisible.value = false
}
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
</style>