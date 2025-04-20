<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="nav-item" :class="{ 'nav-action': activeNavItem === 'home' }" @click="setActiveNavItem('home')">
        <a href="#" class="nav-link">首页</a>
      </li>
      <li class="nav-item" :class="{ 'nav-action': activeNavItem === 'projectInfo' }" @click="setActiveNavItem('projectInfo')">
        <a href="#" class="nav-link">项目信息</a>
      </li>
      <li class="nav-item" :class="{ 'nav-action': activeNavItem === 'onlineCollaboration' }" @click="setActiveNavItem('onlineCollaboration')">
        <a href="#" class="nav-link">在线协作</a>
      </li>
      <li class="nav-item" :class="{ 'nav-action': activeNavItem === 'onlineCommunication' }" @click="setActiveNavItem('onlineCommunication')">
        <a href="#" class="nav-link">在线沟通</a>
      </li>
    </ul>
    <form action=""></form>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const activeNavItem = ref('home');

const setActiveNavItem = (item) => {
  activeNavItem.value = item;
};
</script>

<style scoped>
.navbar {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: .5rem 1rem;
  margin: -20px;
  color: #000;
  background: linear-gradient(to bottom, #a0cfff,#f5f5f5);
}
.navbar-nav {
  display: flex;
  flex-direction: row;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  margin-right: auto;
}
.nav-action {
  font-weight: 800 !important;
}
.nav-link{
  display: block;
  padding: .5rem 1rem;
}
</style>