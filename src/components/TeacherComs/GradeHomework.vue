<template>
  <div class="grade-homework">
    <h2>作业列表</h2>
    <el-table :data="workList" style="width: 100%">
      <el-table-column prop="title" label="作业标题" />
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleOpenSubmission(scope.row)">查看提交</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增:提交记录弹窗 -->
    <el-dialog v-model="submissionDialogVisible" title="提交记录" width="80%">
      <div class="submission-list">
        <h3>提交记录 - {{ selectedWork?.title }}</h3>
        <el-table :data="submissionList" style="width: 100%">
          <el-table-column prop="userName" label="用户名" width="240" />
          <el-table-column prop="submissionTime" label="提交时间" width="240" />
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button size="small" @click="handlePreview(scope.row)">查看</el-button>
              <el-button size="small" type="primary" @click="handleGrade(scope.row)">批改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

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
        <div >{{ previewContent }}</div>
      </div>
    </el-dialog>

    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getWork, getSubmission } from '../../api/index';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../../store';
import { getFile } from '../../api/index';

const userStore = useUserStore();
const workList = ref([]); // 作业列表
const selectedWork = ref(null); // 当前选中的作业
const submissionList = ref([]); // 提交记录列表

// 新增:控制提交记录弹窗的显示状态
const submissionDialogVisible = ref(false);

// 查询作业列表
const fetchWorkList = async () => {
  try {
    const response = await getWork(userStore.id);
    console.log(response);
    if (response.data.code == 200) {
      const taList = response.data.data[0].ta;
      workList.value = taList.map(item => ({
        title: item.title,
        createdAt: item.createdAt,
        id: item.assignmentId
      }));
    } else {
      ElMessage.error(response.msg );
    }
  } catch (error) {
    console.error('获取作业列表失败:', error);
    ElMessage.error('网络错误，请稍后重试');
  }
};

const handleOpenSubmission = async (work) => {
  selectedWork.value = work;
  try {
    submissionList.value = [
      {
        userName: '张三',
        submissionTime: '2023-10-01 10:00',
        id: 1,
        content: `// 这是张三的提交内容\nfunction add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(1, 2));`
      },
      {
        userName: '李四',
        submissionTime: '2023-10-01 11:00',
        id: 2,
        content: `# 这是李四的提交内容\n这是一个Markdown格式的文档。\n\n## 子标题\n- 列表项1\n- 列表项2`
      },
      {
        userName: '王五',
        submissionTime: '2023-10-01 12:00',
        id: 3,
        content: `<html>\n<head>\n  <title>这是王五的提交内容</title>\n</head>\n<body>\n  <h1>欢迎来到我的网页</h1>\n  <p>这是一个简单的HTML页面。</p>\n</body>\n</html>`
      }
    ];
    submissionDialogVisible.value = true; // 打开弹窗
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试');
    console.error('获取提交记录失败:', error);
  }
};

const dialogVisible = ref(false);
const currentHomework = ref({});
const gradingForm = ref({
  score: 0,
  comment: '',
  submissionId: null,
  gradeId: null,
  gradedBy: userStore.id
});

const handleGrade = (row) => {
  currentHomework.value = row;
  gradingForm.value.submissionId = row.id;
  gradingForm.value.gradeId = row.gradeId || null; // 如果有现有评分ID，则更新评分
  gradingForm.value.score = row.score || 0;
  gradingForm.value.comment = row.feedback || '';
  dialogVisible.value = true;
};

const previewDialogVisible = ref(false);
const previewContent = ref(`// 默认预览内容\nfunction defaultCode() {\n  console.log("这是默认的代码示例");\n}`);

const handlePreview = async (row) => {
  try {
    previewContent.value = row.content || '暂无内容';
    previewDialogVisible.value = true;
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试');
    console.error('获取文件失败:', error);
  }
};

const submitGrading = async () => {
  try {
    const data = {
      submissionId: gradingForm.value.submissionId,
      score: gradingForm.value.score,
      feedback: gradingForm.value.comment,
      gradedBy: gradingForm.value.gradedBy
    };

   /*  if (gradingForm.value.gradeId) {
      // 更新评分
      data.gradeId = gradingForm.value.gradeId;
      await updateGrade(data);
      ElMessage.success('评分已更新');
    } else {
      // 新增评分
      await gradeWork(data);
      ElMessage.success('评分已提交');
    } */

    dialogVisible.value = false;
    // 刷新提交记录列表
    const response = await getSubmission({ tid: 1, aid: 1 });
    if (response.code === 0) {
      submissionList.value = response.data;
    }
  } catch (error) {
    console.error('评分失败:', error);
  }
};

const isImage = ref(false); // 新增：判断是否为图片文件

onMounted(async () => {
  try {
    await fetchWorkList();
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试');
    console.error('接口调用失败:', error);
  }
});
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

/* 新增:弹窗样式优化 */
.submission-list {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* 虚化背景 */
  backdrop-filter: blur(10px); /* 背景虚化效果 */
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 内容居中 */
}

.el-table {
  width: 100%;
  max-width: 800px; /* 限制表格宽度 */
}

.preview-content {
  white-space: pre-wrap; /* 保留换行和空格 */
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}
</style>