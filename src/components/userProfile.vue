<template>
    <div class="user-profile-page">  
      <el-main class="main-content">
        <el-tabs v-model="activeTab" tab-position="left" style="height: 100%;">
          <el-tab-pane label="基本信息" name="basicInfo">
            <el-card shadow="always" class="profile-card">
              <div class="avatar-container">
                <img :src="userInfo.avatar" alt="Avatar" class="avatar">
              </div>
              <div class="info-container">
                <h2>{{ userInfo.name }}</h2>
                <p><strong>账号:</strong> {{ userInfo.account }}</p>
                <p><strong>Email:</strong> {{ userInfo.email }}</p>
                <p><strong>手机:</strong> {{ userInfo.phone }}</p>
              </div>
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
                  <el-button type="primary" @click="updateContactInfo">保存</el-button>
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
                  <el-button type="primary" @click="updatePassword">保存</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { useUserStore } from '../store';
  import { ElHeader, ElMain, ElTabs, ElTabPane, ElCard, ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
  
  const userStore = useUserStore();
  const activeTab = ref('basicInfo');
  
  const userInfo = reactive({
    account: userStore.account,
    name: userStore.name,
    email: userStore.email,
    phone: userStore.phone,
    avatar: userStore.userAvatar
  });
  
  const contactForm = reactive({
    phone: userInfo.phone,
    email: userInfo.email
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
      { min: 8, message: '密码长度至少为8个字符', trigger: 'blur' },
      { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: '密码必须包括数字、大小写字母和特殊字符', trigger: 'blur' }
    ],
    confirmNewPassword: [
      { required: true, message: '请确认新密码', trigger: 'blur' },
      { validator: validateConfirmPassword, trigger: 'blur' }
    ]
  };
  
  const updateContactInfo = () => {
    // 更新用户联系信息
    userInfo.phone = contactForm.phone;
    userInfo.email = contactForm.email;
  
    // 提示信息
    ElMessage.success('联系信息已更新');
  };
  
  const updatePassword = () => {
    passwordFormRef.value.validate((valid) => {
      if (valid) {
        // 更新用户密码
        // 这里可以添加实际的密码更新逻辑
        ElMessage.success('密码已更新');
      } else {
        console.log('验证失败!');
        return false;
      }
    });
  };
  

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