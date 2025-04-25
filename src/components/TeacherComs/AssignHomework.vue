<template>
  <div class="assign-homework">
    <h2>发布新任务</h2>
    <el-form :model="form" label-width="120px">
      <el-form-item label="任务标题">
        <el-input v-model="form.title" placeholder="请输入任务标题" />
      </el-form-item>
      
      <el-form-item label="任务类型">
        <el-radio-group v-model="form.type">
          <el-radio value="text">文本任务</el-radio>
          <el-radio value="code">代码任务</el-radio>
          <el-radio value="file">附件任务</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="开放日期">
        <el-date-picker
          v-model="form.openDate"
          type="datetime"
          placeholder="选择开放日期时间"
        />
      </el-form-item>

      <el-form-item label="截至日期">
        <el-date-picker
          v-model="form.deadline"
          type="datetime"
          placeholder="选择截至日期时间"
        />
      </el-form-item>

      <el-form-item label="附件" v-if="form.type === 'file'">
        <el-upload
          action="#"
          :auto-upload="false"
          :on-change="handleFileChange"
        >
          <el-button>选择文件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="任务描述">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="4"
          placeholder="请输入任务详细描述"
        />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm">发布任务</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { createWork } from '../../api/index';
import { useUserStore } from '../../store';

const userStore = useUserStore();
const form = ref({
  title: '',
  type: 'text',
  openDate: '',
  deadline: '', 
  description: '',
  attachmentPath: null,
  createdBy: userStore.id
});

const handleFileChange = (file) => {
  form.value.attachmentPath = file.raw.name;
};

const submitForm = async () => {
  try {
    // const openDate = new Date(form.value.openDate);
    // const deadline = new Date(openDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    //以上为自动生成截至日期逻辑
    const response = await createWork({
      title: form.value.title,
      uploadMethod: form.value.type,
      openAt: form.value.openDate,
      deadline: form.value.deadline,
      description: form.value.description,
      attachmentPath: form.value.attachmentPath,
      createdBy: form.value.createdBy
    });

    if (response.code === 0) {
      ElMessage.success('任务发布成功！');
      form.value = {
        title: '',
        type: 'text',
        openDate: '',
        deadline: '', 
        description: '',
        attachmentPath: null,
        createdBy: 1
      };
    } else {
      ElMessage.error(response.msg || '任务发布失败');
    }
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试');
  }
};
</script>

<style scoped>
.assign-homework {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
