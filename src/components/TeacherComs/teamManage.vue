<template>
<div class="assign-homework">
  <h2>更新团队信息</h2>

  <el-form :model="form" label-width="120px">
    <el-form-item label="团队命名">
      <el-input v-model="form.title" placeholder="请为团队命名" />
    </el-form-item>

    <el-form-item label="团队介绍">
      <el-input
        v-model="form.teamIntroduction"
        type="textarea"
        :rows="4"
        placeholder="请输入团队介绍"
      />
    </el-form-item>
    
    <el-form-item label="主管简介">
      <el-input
        v-model="form.surpervisorIntroduction"
        type="textarea"
        :rows="4"
        placeholder="请输入个人简介"
      />
    </el-form-item>

    <el-form-item label="团队公告">
        <el-input
          v-model="form.teamAnnouncement"
          type="textarea"
          :rows="4"
          placeholder="请输入团队公告"
        />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="submitForm">更新</el-button>
    </el-form-item>
  </el-form>
  
  <h2>团队成员</h2>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" />
  </el-table>
</div>


</template>

<script lang="ts" setup>
import { ref } from 'vue'
      import { ElMessage } from 'element-plus'
      
      const form = ref({
        title: '',
        type: 'text',
        teamIntroduction:'',
        surpervisorIntroduction: '',
        teamAnnocement: ''
      })
      
      const submitForm = () => {
        ElMessage.success('作业发布成功！')
        // 这里可以添加提交到后端的逻辑
      }
const tableData = [
  {
    name: '李',
  },
  {
    name: '王',
  },
  {
    name: '肖',
  },
  {
    name: '南',
  },
]
</script>

<style scoped>
.assign-homework {
      background-color: white;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>