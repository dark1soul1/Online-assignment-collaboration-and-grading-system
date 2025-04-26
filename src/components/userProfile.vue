<template>
    <div class="user-profile-page">  
      <el-main class="main-content">
        <el-tabs v-model="activeTab" tab-position="left" style="height: 100%;">
          <el-tab-pane label="基本信息" name="basicInfo">
            <el-card shadow="always" class="profile-card">
              <div class="avatar-container">
                <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="avatar" />
              </div>
              <div class="info-container">
                <h2>{{ userStore.name }}</h2>
                <p><strong>账号:</strong> {{ userInfo.account }}</p>
              </div>
            </el-card>
          </el-tab-pane>


          <el-tab-pane label="修改个性信息" name="userForm">
            <el-card shadow="always" class="profile-card">
              <el-form :model="userForm" label-width="100px">
                <el-form-item label="用户名">
                  <el-input v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="userForm.sex" placeholder="请选择你的性别">
                    <el-option label="男" value="1" />
                    <el-option label="女" value="2" />
                  </el-select>
                </el-form-item>
                <el-form-item label="个性签名">
                  <el-input v-model="userForm.signature"></el-input>
                </el-form-item>
                <el-form-item label="习惯">
                  <el-input v-model="userForm.hobbies"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateProfile">保存</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
  
          <el-tab-pane label="修改联系方式" name="contactInfo">
            <el-card shadow="always" class="profile-card">
              <el-form :model="contactForm" label-width="100px">
                <el-form-item label="手机号">
                  <el-input v-model="contactForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                  <el-input v-model="contactForm.email"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateProfile">保存</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
  
          <el-tab-pane label="修改密码" name="changePassword">
            <el-card shadow="always" class="profile-card">
              <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="100px">
                <el-form-item label="新密码" prop="newPassword">
                  <el-input type="password" v-model="passwordForm.newPassword" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmNewPassword">
                  <el-input type="password" v-model="passwordForm.confirmNewPassword" show-password></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateProfile">保存</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </div>
</template>
  
<script setup>
import { ref, reactive, computed,onMounted } from 'vue';
import { useUserStore } from '../store';
import { ElHeader, ElMain, ElTabs, ElTabPane, ElCard, ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { updatePersonalInfo,getPersonalAvatar,getPersonalInfo } from '../api';

const userStore = useUserStore();
const activeTab = ref('basicInfo');

const userInfo = reactive({
  id: userStore.id,
  account: userStore.account,
  name: userStore.name,
  sex: userStore.sex,
  signature: userStore.signature,
  hobbies: userStore.hobbies,
  email: userStore.email,
  phone: userStore.phone,
  avatar: userStore.userAvatar 
});

const userForm = reactive({
  sex: userStore.sex,
  signature: userStore.signature,
  hobbies: userStore.hobbies
});

const contactForm = reactive({
  phone: userStore.phone,
  email: userStore.email
});

const passwordForm = reactive({
  newPassword: '',
  confirmNewPassword: ''
});

const passwordFormRef = ref(null);

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== passwordForm.newPassword) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const passwordRules = {
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6个字符', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, message: '密码必须包括数字、字母和特殊字符', trigger: 'blur' }
  ],
  confirmNewPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
};

const updateProfile = async () => {
  let payload = {};
  switch (activeTab.value) {
    case 'userForm':
      payload = { userName:userForm.name,signature: userForm.signature, hobbies: userForm.hobbies };
      break;
    case 'contactInfo':
      payload = { phone: contactForm.phone, email: contactForm.email };
      break;
    case 'changePassword':
      if (!passwordFormRef.value.validate()) return;
      payload = { password: passwordForm.newPassword };
      break;
    default:
      return;
  }

  try {
    await updatePersonalInfo({ id: userStore.id, ...payload });
    userStore.updateUserInfo({ ...userInfo, ...payload });
    ElMessage.success('信息已更新');
  } catch (error) {
    console.error('更新失败:', error);
  }
};
onMounted(async() => {
  const response =await getPersonalInfo(userStore.id);
  userStore.updateUserInfo(response.data.data);
});
</script>
  
<style scoped>
.user-profile-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #409EFF;
  color: white;
  text-align: center;
  line-height: 60px;
  font-size: 24px;
}

.main-content {
  padding: 20px;
  flex: 1;
}

.profile-card {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.avatar-container {
  margin-bottom: 20px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.info-container h2 {
  margin-bottom: 10px;
}

.info-container p {
  color: #606266;
}

.el-tabs {
  height: 100%;
}

.el-tab-pane {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>