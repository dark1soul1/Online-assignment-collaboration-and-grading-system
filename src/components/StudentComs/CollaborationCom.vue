<template>
    <div class="collaboration-container">
        <div class="col-1">
            <h5 class="col-name">
                <span style="color: #6c757d">
                    <strong>当前任务</strong>
                </span>
            </h5>
            <div class="col-list">
                <a href="#" :class="{'col-list-item':true, 'active': selectedTask?.id === task.id}" @click="selectTask(task)" v-for="task in currentTasks" :key="task.assignmentId">
                    {{ task.title }}
                </a>
            </div>
            <!-- 新增：未开放任务 -->
            <h5 class="col-name">
                <span style="color: #6c757d">
                    <strong>未开放任务</strong>
                </span>
            </h5>
            <div class="col-list">
                <a href="#" :class="{'col-list-item':true, 'locked': true}" v-for="task in lockedTasks" :key="task.assignmentId" @click.prevent>
                    {{ task.title }} (未开放)
                </a>
            </div>
            <h5 class="col-name">
                <span style="color: #6c757d">
                    <strong>历史任务</strong>
                </span>
            </h5>
            <div class="col-list">
                <a href="#" :class="{'col-list-item':true, 'active': selectedTask?.id === task.id}" @click="selectTask(task)" v-for="task in historyTasks" :key="task.assignmentId">
                    {{ task.title }}
                </a>
            </div>
        </div>
        <div class="col-2">
            <div v-if="selectedTask" class="task-details">
                <h3>{{ selectedTask.title }}</h3>
                <p><strong>开始时间:</strong> {{ selectedTask.startTime }}</p>
                <p><strong>结束时间:</strong> {{ selectedTask.endTime }}</p>
                <!-- 新增：作业描述展示 -->
                <div class="task-description">
                    <strong>作业描述:</strong>
                    <p>{{ selectedTask.description }}</p>
                </div>
                <hr>
                <!-- 代码编辑器 -->
                <div v-if="currentTaskType === 'code'" class="code-editor">
                    <codemirror
                        v-model="codeContent"
                        :style="{ height: '500px' }"
                        :autofocus="true"
                        :indent-with-tab="true"
                        :tab-size="4"
                        :extensions="extensions"
                    />
                </div>
                <!-- 富文本编辑器 -->
                <div v-else-if="currentTaskType === 'text'" class="rich-text-editor">
                    <Toolbar
                        style="border-bottom: 1px solid #ccc"
                        :editor="editorRef"
                        :defaultConfig="toolbarConfig"
                        :mode="mode"
                    />
                    <Editor
                        style="height: 500px; overflow-y: hidden;"
                        v-model="valueHtml"
                        :defaultConfig="editorConfig"
                        :mode="mode"
                        @onCreated="handleCreated"
                    />
                </div>
                <!-- 文件上传按钮 -->
                <div v-else-if="currentTaskType === 'attachment'" class="file-upload">
                    <input type="file" @change="handleFileUpload" accept="image/*" />
                    <div v-if="uploadedImage" class="image-preview">
                        <img :src="uploadedImage" alt="Uploaded Image" />
                    </div>
                </div>
                <button 
                    class="submit-btn" 
                    @click="submitTask" 
                    :disabled="isHistoricalTask(selectedTask)"
                >
                    {{ isHistoricalTask(selectedTask) ? '任务已提交' : '提交任务' }}
                </button>
            </div>
            <div v-else>
                <p>请选择一个任务以开始。</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, shallowRef,computed, onMounted, onBeforeUnmount } from 'vue';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { getStudentWork, submiteWork } from '../../api/index';

// 获取当前时间
const now = new Date();

/* // 获取学生作业数据
const studentWorkData = ref([]);
onMounted(async () => {
    try {
        const response = await getStudentWork(1); // 假设学生ID为1
        if (response.code === 0) {
            studentWorkData.value = response.data;
        }
    } catch (error) {
        console.error('获取学生作业失败:', error);
    }
}); */
const studentWorkData = ref([
    // 历史任务示例
    {
        assignmentId: 1,
        title: '已完成的文本任务',
        openAt: '2025-04-20T13:19:06.000+00:00',
        deadline: '2025-04-22T13:19:06.000+00:00',
        type: 'text'
    },
    {
        assignmentId: 2,
        title: '已完成的代码任务',
        openAt: '2025-04-21T13:19:06.000+00:00',
        deadline: '2025-04-23T13:19:06.000+00:00',
        type: 'code'
    },
    // 当前任务示例
    {
        assignmentId: 3,
        title: '正在进行的附件任务',
        openAt: '2025-04-23T13:19:06.000+00:00',
        deadline: '2025-04-27T13:19:06.000+00:00',
        type: 'attachment'
    },
    {
        assignmentId: 4,
        title: '正在进行的文本任务',
        openAt: '2025-04-24T13:19:06.000+00:00',
        deadline: '2025-04-28T13:19:06.000+00:00',
        type: 'text'
    },
    // 未开放任务示例
    {
        assignmentId: 5,
        title: '未开放的代码任务',
        openAt: '2025-04-29T13:19:06.000+00:00',
        deadline: '2025-04-30T13:19:06.000+00:00',
        type: 'code'
    },
    {
        assignmentId: 6,
        title: '未开放的附件任务',
        openAt: '2025-04-30T13:19:06.000+00:00',
        deadline: '2025-05-01T13:19:06.000+00:00',
        type: 'attachment'
    }
]);

// 分类任务
const currentTasks = computed(() => {
    return studentWorkData.value.filter(task => {
        const openAt = new Date(task.openAt);
        const deadline = new Date(task.deadline);
        return now >= openAt && now <= deadline;
    });
});

const lockedTasks = computed(() => {
    return studentWorkData.value.filter(task => {
        const openAt = new Date(task.openAt);
        return now < openAt;
    });
});

const historyTasks = computed(() => {
    return studentWorkData.value.filter(task => {
        const deadline = new Date(task.deadline);
        return now > deadline;
    });
});

// 当前任务类型
const currentTaskType = ref('event'); // 默认为文本类型

// 选中的任务
const selectedTask = ref(null);

// 选择任务
const selectTask = (task) => {
    if (new Date(task.openAt) > now) {
        alert('该任务尚未开放，请稍后再试！');
        return;
    }
    selectedTask.value = task;
    currentTaskType.value = task.type;
};

// 富文本编辑器相关
const editorRef = shallowRef();
const valueHtml = ref('<p></p>');
const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };
const mode = ref('default'); // 新增：定义 mode 属性

// 代码编辑器相关
const codeContent = ref('// 请输入代码...');
const extensions = [javascript(), oneDark];

// 文件上传处理
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log('上传的文件:', file);
        // 处理图片预览
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImage.value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        // TODO: 处理文件上传逻辑
    }
};

// 新增：上传的图片预览
const uploadedImage = ref(null);

// 提交任务
// 提交任务
const submitTask = () => {
    if (selectedTask.value) {
        console.log('提交任务:', selectedTask.value);

        // 根据任务类型获取编辑器内容
        let content = '';
        if (currentTaskType.value === 'code') {
            content = codeContent.value; // 代码编辑器内容
        } else if (currentTaskType.value === 'text') {
            content = valueHtml.value; // 富文本编辑器内容
        } else if (currentTaskType.value === 'attachment') {
            console.warn('文件上传任务无需提交内容');
            return;
        }

        // 创建 Blob 对象并生成下载链接
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // 创建隐藏的 <a> 标签并触发下载
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedTask.value.title}.txt`; // 文件名
        document.body.appendChild(a);
        a.click();

        // 清理资源
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // 调用后端接口提交任务
        const submissionData = {
            userId: 14, // 示例用户ID
            assignmentId: selectedTask.value.id,
            filePath: `/submissions/${selectedTask.value.title}.txt`, // 文件路径
            version: 1 // 示例版本号
        };
        /* submiteWork(submissionData)
            .then(response => {
                console.log('任务提交成功:', response);
            })
            .catch(error => {
                console.error('任务提交失败:', error);
            }); */
            console.log('任务提交成功:', submissionData);
    }
};

// 编辑器销毁
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor) editor.destroy();
});

// 富文本编辑器初始化
const handleCreated = (editor) => {
    editorRef.value = editor;
};

// 新增：判断任务是否为历史任务
const isHistoricalTask = (task) => {
    if (!task) return false;
    const deadline = new Date(task.deadline);
    return now > deadline;
};

</script>

<style scoped>
.collaboration-container {
    display: flex;
    width: 100%; 
}

.col-1 {
    flex: 0 0 16.666667%; 
    max-width: 16.666667%;
    box-sizing: border-box; 
}

.col-2 {
    flex: 0 0 83.333333%; 
    max-width: 83.333333%;
    box-sizing: border-box; 
    padding: 20px;
    background-color: #ffffff;
    border-left: 1px solid #e9ecef;
}

.col-1, .col-2 {
    padding-left: 15px;
    padding-right: 15px;
}

.col-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: large;
}

strong {
    font-weight: bolder;
}

.col-list {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-top: 12px;
    margin-bottom: 0;
    border-radius: .25rem;
}

.col-list-item {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    background-color: #f5f5f5;
    width: 100%;
    color: #495057;
    text-align: inherit;
}

.col-list-item.locked {
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
    pointer-events: none;
}

.task-details {
    margin-top: 0;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.task-description {
    margin-top: 15px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 5px;
}

.task-description p {
    margin: 0;
    white-space: pre-wrap;
}

.code-editor {
    height: 500px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.rich-text-editor {
    border: 1px solid #ced4da;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.file-upload {
    margin-top: 20px;
}

.image-preview {
    margin-top: 10px;
    max-height: 300px;
    overflow: hidden;
}

.image-preview img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ced4da;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.submit-btn {
    margin-top: 20px;
    padding: 12px 24px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 24px;
    cursor: pointer;
    font-size: 16px;
}

.submit-btn:hover {
    background-color: #0056b3;
}

.submit-btn[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>