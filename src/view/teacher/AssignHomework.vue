<template>
  <div class="assign-homework">
    <h2>发布新作业</h2>
    <el-form :model="form" label-width="120px">
      <el-form-item label="作业标题">
        <el-input v-model="form.title" placeholder="请输入作业标题" />
      </el-form-item>
      
      <el-form-item label="作业类型">
        <el-radio-group v-model="form.type">
          <el-radio value="text">文本作业</el-radio>
          <el-radio value="code">代码作业</el-radio>
          <el-radio value="file">附件作业</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="截止日期">
        <el-date-picker
          v-model="form.deadline"
          type="datetime"
          placeholder="选择截止日期时间"
        />
      </el-form-item>
      
      <el-form-item label="作业描述">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="4"
          placeholder="请输入作业详细描述"
        />
      </el-form-item>
      
      <el-form-item label="评分规则">
        <el-input
          v-model="form.gradingRules"
          type="textarea"
          :rows="4"
          placeholder="请输入评分规则"
        />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm">发布作业</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const form = ref({
  title: '',
  type: 'text',
  deadline: '',
  description: '',
  gradingRules: ''
})

const submitForm = () => {
  ElMessage.success('作业发布成功！')
  // 这里可以添加提交到后端的逻辑
}
</script>

<style scoped>
.assign-homework {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>