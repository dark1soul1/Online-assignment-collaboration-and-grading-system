<template>
    <div class="search_container">
        <div class="nav-bar">
            <el-menu class="el-menu-demo" mode="horizontal">
              <el-menu-item index="1">负责人</el-menu-item>
            </el-menu>
        </div>
        <el-table 
        :data="messageList" 
        rom-key="id" 
        class="searchTable">
            <el-table-column prop="username" label="名称" />
            <el-table-column prop="sex" label="性别" :formatter="formatSex" />
            <el-table-column prop="signature" label="个性签名" />
            <el-table-column prop="hobbies" label="爱好" />
            <el-table-column prop="phone" label="电话" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column label="操作" width="250">
                <template>
                  <el-button>加入</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { onMounted, ref,watch,computed } from 'vue';
import { useUserStore } from '../../store';
import { joinTeam} from '../../api';
import { ElMessage } from 'element-plus';

const userStore=useUserStore();
const messageList=ref([]);
const userId=computed(()=>userStore.id);

let searchString=computed(()=>userStore.searchString);

async function fetchMessage(){
    try{
        console.log("searchString:"+searchString.value);
        console.log(userId.value);
        const teacherMessage=await joinTeam({
            tname:searchString.value
        });
        messageList.value=teacherMessage.data.data;
    }
    catch(error){
        ElMessage.warning("搜索失败，请稍后再试："+error);
    }
}

watch(searchString,async()=>{
  const allowedPattern = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
  console.log("watchSeachString:"+searchString.value);
  if(searchString.value&&searchString.value.length>=2&&allowedPattern.test(searchString.value)){
    await fetchMessage();
  }
})

const formatSex=(value)=>{
    return value==="1"?"男":"女";
}

onMounted(async()=>{
    await fetchMessage();
})
</script>

<style scoped>
.search_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 300vh;
    overflow:auto;
}

.nav-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 5vh;
  width: 100%;
  opacity: 0.8;
  z-index: 4;
}

.el-menu-demo {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.content-container {
  margin-top: 60px;
  padding: 20px;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 60px);
}

.el-menu-demo {
  background-color: transparent;
}

.el-menu-item {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #222;
}

.el-menu-item.is-active,
.el-menu-item:hover {
  color: #409EFF;
}

.el-table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.searchTable{
    margin-top: 60px;
}
</style>