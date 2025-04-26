<template>
  <div class="team-manage">
    <h2>团队信息管理</h2>

    <el-form :model="form" label-width="120px">
      <el-form-item label="团队名称">
        <el-input v-model="form.teamName" placeholder="请输入团队名称" />
      </el-form-item>

      <el-form-item label="团队介绍">
        <el-input
          v-model="form.teamDescription"
          type="textarea"
          :rows="4"
          placeholder="请输入团队介绍"
        />
      </el-form-item>

      <el-form-item label="主管简介">
        <el-input
          v-model="form.supervisorDescription"
          type="textarea"
          :rows="4"
          placeholder="请输入主管简介"
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
        <el-button type="primary" @click="submitForm">更新团队信息</el-button>
      </el-form-item>
    </el-form>

    <h2>团队成员</h2>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="studentName" label="姓名" />
      <el-table-column prop="studentId" label="学号" />
    </el-table>
  </div>
</template>

<script setup>
import { ref,reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../store'
import { getTeamTid, updateTeam } from '../../api'

const userStore = useUserStore()
const form = ref({
  teamName: '',
  teamDescription: '',
  supervisorDescription: '',
  teamAnnouncement: ''
})

const tableData = ref([])

const fetchTeamInfo = async () => {
  try {
    const response = await getTeamTid({tid:1})
    /* console.log(response.data); */
    if (response.data.code === 200) {
      form.value = {
        teamName: response.data.data.teamName,
        teamDescription: response.data.data.teamDescription,
        supervisorDescription: response.data.data.supervisorDescription,
        teamAnnouncement: response.data.data.teamAnnouncement
      }
      tableData.value = response.data.data.students
    } else {
      ElMessage.error(response.msg || '获取团队信息失败')
    }
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试')
    console.error('获取团队信息失败:', error)
  }
}

const submitForm = async () => {
  try {
    const formData = {
      teacherId: 1,
      teacherName: userStore.name,
      ...form.value
    };
    console.log(formData);
    const response = await updateTeam(formData);
    if (response.data.code === 200) {
      ElMessage.success('团队信息更新成功')
      fetchTeamInfo()
    } else {
      ElMessage.error(response.msg || '更新团队信息失败')
    }
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试')
    console.error('更新团队信息失败:', error)
  }
}

onMounted(() => {
  fetchTeamInfo()
})
</script>

<style scoped>
.team-manage {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>