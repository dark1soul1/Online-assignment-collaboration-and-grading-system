<template>
    <div class="pro-container">
        <div class="col-1">
            <h5 class="col-name">
                <span style="color: #6c757d;">
                    <strong>团队信息</strong>
                </span>
            </h5>
            <div class="col-list">
                <a href="#" :class="{'col-list-item':true,' active':userStore.proIsActive==1}" @click="userStore.changeActive(1)">详情</a>
                <a href="#" :class="{'col-list-item':true,' active':userStore.proIsActive==2}" @click="userStore.changeActive(2)">团队资源</a>
            </div>
        </div>
        <div class="col-2">
             <div v-if="userStore.proIsActive==1">
                <div class="card">
                    <h5 class="card-header">团队介绍</h5>
                    <div class="card-body">
                        <p v-if="teamInfo.teamDescription">{{ teamInfo.teamDescription }}</p>
                        <p v-else>暂无团队介绍</p>
                    </div>
                </div>
                <div class="card">
                    <h5 class="card-header">团队成员</h5>
                    <div class="card-body">
                        <ul v-if="teamInfo.members && teamInfo.members.length > 0">
                            <li v-for="member in teamInfo.members" :key="member.id">
                                {{ member.name }} - {{ member.role }}
                            </li>
                        </ul>
                        <p v-else>暂无团队成员</p>
                    </div>
                </div>
                <div class="card">
                    <h5 class="card-header">团队项目</h5>
                    <div class="card-body">
                        <ul v-if="teamInfo.projects && teamInfo.projects.length > 0">
                            <li v-for="project in teamInfo.projects" :key="project.id">
                                {{ project.name }} - {{ project.description }}
                            </li>
                        </ul>
                        <p v-else>暂无团队项目</p>
                    </div>
                </div>
             </div>
             <div v-if="userStore.proIsActive==2">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="date" label="日期" width="180" />
                    <el-table-column prop="name" label="资源" width="180" />
                    <el-table-column prop="fileLayout" label="文件格式" />
                  </el-table>
             </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../../store';
import { onMounted, ref } from 'vue';
import { getTeamInfo } from '../../api/index'; // 引入团队信息查询接口

const userStore = useUserStore();
const tableData = [
    {
      date: '2016-05-03',
      name: '1',
      fileLayout: '.pdf',
    },
    {
      date: '2016-05-02',
      name: '2',
      fileLayout: '.zip',
    },
    {
      date: '2016-05-04',
      name: '3',
      fileLayout: '.rar',
    },
    {
      date: '2016-05-01',
      name: '4',
      fileLayout: 'txt',
    },
  ]

const teamInfo = ref({
    teamName: '团队A',
    teamDescription: '这是一个示例团队，专注于前端开发。',
    members: [
        { id: 1, name: '张三', role: '前端开发' },
        { id: 2, name: '李四', role: '后端开发' },
        { id: 3, name: '王五', role: '项目经理' }
    ],
    projects: [
        { id: 1, name: '项目X', description: '项目X的描述' },
        { id: 2, name: '项目Y', description: '项目Y的描述' }
    ]
}); 

onMounted(async () => {
    try {
        const response = await getTeamInfo({tid:1/* userStore.currentTeamId */}); // 调用接口查询团队信息
        if (response.code === 200) {
            teamInfo.value = response.data.data; // 将团队信息存储到响应式变量中
        } else {
            console.error('获取团队信息失败:', response.msg);
        }
    } catch (error) {
        console.error('获取团队信息失败:', error);
    }
});
</script>

<style scoped>
.col-1 {
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
}
.col-2 {
    flex: 0 0 83.333333%;
    max-width: 83.333333%;
}
.col-1,.col-2{
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

.pro-container{
  display: flex;
  flex-wrap: wrap;
}
.col-list-item:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}
.list-group-item:last-child {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
}
.col-list-item.active {
    z-index: 2;
    color: #fff;
    background-color: #409eff;
    border-color: #6db5fc;
}

/* 新增样式 */
.card {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
.card-header {
    background-color: #f8f9fa;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
.card-body {
    padding: 15px;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    margin-bottom: 5px;
}
</style>