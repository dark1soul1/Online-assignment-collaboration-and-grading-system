<template>
    <div class="collaboration-container">
        <div class="col-1">
            <h5 class="col-name">
                <span style="color: #6c757d">
                    <strong>当前任务</strong>
                </span>
            </h5>
            <div class="col-list">
                <a href="#" :class="{'col-list-item':true,' active':''}" @click="selectTask(task)" v-for="task in tasks" :key="task.id">
                    {{ task.title }}
                </a>
            </div>
            <h5 class="col-name">
                <span style="color: #6c757d">
                    <strong>历史任务</strong>
                </span>
            </h5>
            <div class="col-list">
                <a href="#" :class="{'col-list-item':true,' active':''}" @click="selectTask(task)" v-for="task in historyTasks" :key="task.id">
                    {{ task.title }}
                </a>
            </div>
        </div>
        <div class="col-2">
            <!-- 任务详情 -->
            <div v-if="selectedTask" class="task-details">
                <h3>{{ selectedTask.title }}</h3>
                <p><strong>开始时间:</strong> {{ selectedTask.startTime }}</p>
                <p><strong>结束时间:</strong> {{ selectedTask.endTime }}</p>
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
                <button class="submit-btn" @click="submitTask">提交任务</button>
            </div>
            <div v-else>
                <p>请选择一个任务以开始。</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, shallowRef, onMounted, onBeforeUnmount } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

// 静态数据
const tasks = [
    { id: 1, title: '代码任务1', startTime: '2023-10-01 08:00', endTime: '2023-10-01 18:00', type: 'code' },
    { id: 2, title: '文本任务1', startTime: '2023-10-02 08:00', endTime: '2023-10-02 18:00', type: 'text' },
    { id: 3, title: '文件上传任务1', startTime: '2023-10-03 08:00', endTime: '2023-10-03 18:00', type: 'attachment' } // 新增文件上传任务
];

const historyTasks = [
    { id: 4, title: '历史代码任务1', startTime: '2023-09-01 08:00', endTime: '2023-09-01 18:00', type: 'code' },
    { id: 5, title: '历史文本任务1', startTime: '2023-09-02 08:00', endTime: '2023-09-02 18:00', type: 'text' },
    { id: 6, title: '历史文件上传任务1', startTime: '2023-09-03 08:00', endTime: '2023-09-03 18:00', type: 'attachment' } // 新增历史文件上传任务
];

// 当前任务类型
const currentTaskType = ref('event'); // 默认为文本类型

// 选中的任务
const selectedTask = ref(null);

// 选择任务
const selectTask = (task) => {
    selectedTask.value = task;
    currentTaskType.value = task.type;
};

// 富文本编辑器相关
const editorRef = shallowRef();
const valueHtml = ref('<p></p>');
const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

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
const submitTask = () => {
    if (selectedTask.value) {
        console.log('提交任务:', selectedTask.value);
        // TODO: 处理任务提交逻辑
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
</script>

<style scoped>
/* 功能组件框架样式 */
.collaboration-container {
    display: flex; /* 确保父容器使用 Flexbox 布局 */
    width: 100%; /* 确保父容器宽度为 100% */
}

.col-1 {
    flex: 0 0 16.666667%; /* 设置固定宽度 */
    max-width: 16.666667%;
    box-sizing: border-box; /* 防止边距和内边距影响宽度 */
}

.col-2 {
    flex: 0 0 83.333333%; /* 设置固定宽度 */
    max-width: 83.333333%;
    box-sizing: border-box; /* 防止边距和内边距影响宽度 */
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

.code-editor {
    height: 500px;
    border: 1px solid #ccc;
}

.rich-text-editor {
    border: 1px solid #ccc;
}

.file-upload {
    margin-top: 20px;
}

.image-preview {
    margin-top: 10px;
}

.image-preview img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.task-details {
    margin-top: 20px;
}

.submit-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.submit-btn:hover {
    background-color: #0056b3;
}
</style>