<template>
      <div class="slogan-wrap">
          <span class="slogan-text animate-float">
            <span class="gradient-text">Grade Together,</span>
            <span class="highlight-text">Grow Together</span>
          </span>
        </div>
      <div class="auth-main">
          <div class="con-col-1">
            <div v-for="item in carouselItems"
          :key="item.id"
          >
            <!-- 数据看板 -->
            <div class="dashboard-card">
              <div class="stats-item">
                <span class="stat-number">{{item.value}}</span>
                <span class="stat-label">{{item.title}}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="con-col-2">
          <!-- 公告轮播 -->
          <div id="statsCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button v-for="(_, index) in carouselItems" 
                     :key="index"
                     type="button" 
                     :data-bs-target="'#statsCarousel'" 
                     :data-bs-slide-to="index" 
                     :class="{ active: index === 0 }"></button>
            </div>
  
            <div class="carousel-inner">
              <div v-for="(item, index) in carouselItems" 
                  :key="item.id"
                  class="carousel-item" 
                  :class="{ active: index === 0 }">
                <img :src="item.image" class="d-block w-100" :alt="item.title">
                <div class="carousel-caption">
                  <h2>{{ item.value }}</h2>
                  <p>{{ item.title }}</p>
                </div>
              </div>
            </div>
  
            <button class="carousel-control-prev" type="button" data-bs-target="#statsCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#statsCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="con-col-1">
          <div class="auth-container">
          <Login v-if="!userStore.isRegister" />
          <Register v-if="userStore.isRegister" />
        </div>
        </div>
      </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store';
import Login from '../views/auth/LoginMod.vue';
import Register from '../views/auth/RegisterMod.vue';
import img1 from '../assets/img/1.png';
import img2 from '../assets/img/2.png';
import img3 from '../assets/img/3.png';
import img4 from '../assets/img/4.png';

const userStore = useUserStore();
const carouselItems = ref([
  {
    id: 1,
    image: img1,
    title: '在线用户',
    value: '3,456'
  },
  {
    id: 2,
    image: img2,
    title: '评测次数',
    value: '9,498,478'
  },
  {
    id: 3,
    image: img3,
    title: '代码行数',
    value: '22,782,867'
  },
  {
    id: 4,
    image: img4,
    title: '在线课程',
    value: '23'
  }
])
</script>

<style scoped>
.auth-main {
  display: flex;
  flex-wrap: wrap;
  gap:5%;
  padding: 20px;
}

.con-col-1 {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex:0 0 22.5%;
  max-width: 22.5%;
}

.con-col-2 {
  flex:0 0 45%;
  max-width: 45%;
}


.dashboard-card {
  border: 1px solid #fff;
  border-radius: 1vh;
  padding:  16px ;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


.slogan-wrap {
  margin-top: 16px;
  position: relative;
}

.slogan-text {
  display: inline-block;
  font-family: 'Segoe UI', sans-serif;
  padding: 8px 16px;
  border-radius: 4px;
  position: relative;
  margin-left: 513px;
}

.gradient-text {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  font-size: 2.4em;
  letter-spacing: -0.5px;
}

.highlight-text {
  color: #e74c3c;
  font-size:  1.8em;
  font-weight: 700;
  margin-left: 8px;
  text-shadow: 0 2px 4px rgba(231, 76, 60, 0.15);
}

.animate-float {
  animation: textFloat 2s ease-in-out infinite;
}

@keyframes textFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.slogan-text::before {
  content: '✧ ';
  position: absolute;
  left:0;
  top: 35%;
  color: #bdc3c7;
  font-size: 1.2em;
  font-weight: 300;
}

@media (max-width: 768px) {
  .slogan-text {
    padding: 8px 16px;
  }
  
  .gradient-text {
    font-size: 1.2em;
  }
  
  .highlight-text {
    font-size: 1.1em;
  }
  
  .slogan-text::before {
    left: -24px;
  }
}



.carousel {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 4px 6px rgba(0, 0, 0, 0.1);
}

.carousel-item {
  height: 400px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), rgba(64, 158, 255, 0.05));
}

.carousel-item img {
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

.carousel-caption {
  background: transparent;
  padding: 1.5rem;
  border-radius: 8px;
  right: 15%;
  left: 15%;
  bottom: 2rem;
  color: #2c3e50;
}

.carousel-caption h2 {
  font-size: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

@media (max-width: 992px) {
  .con-col-2 {
    order: -1;
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 2rem;
  }
  
  .carousel-item {
    height: 300px;
  }
  
  .carousel-caption h2 {
    font-size: 2rem;
  }
}


.auth-container {
  display: flex;
  justify-content: center;
  align-items:baseline;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>