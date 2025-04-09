import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth.store'
import guards from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 认证模块
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      meta: { public: true },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/auth/LoginMod.vue')
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/views/auth/RegisterMod.vue')
        }
      ]
    },
    
    // 教师端路由
    {
      path: '/teacher',
      component: () => import('@/layouts/TeacherLayout.vue'),
      meta: { requiresAuth: true, roles: ['teacher'] },
      children: [
        {
          path: 'assignments',
          children: [
            {
              path: 'create',
              name: 'CreateAssignment',
              component: () => import('@/views/assignments/Teacher/CreateAssignment.vue')
            },
            {
              path: 'list',
              name: 'AssignmentList',
              component: () => import('@/views/assignments/Teacher/ListAssignments.vue')
            }
          ]
        },
        {
          path: 'grading/:id',
          name: 'TeacherGrading',
          props: true,
          component: () => import('@/views/grading/TeacherGrading.vue')
        }
      ]
    },
    
    // 学生端路由
    {
      path: '/student',
      component: () => import('@/layouts/StudentLayout.vue'),
      meta: { requiresAuth: true, roles: ['student'] },
      children: [
        {
          path: 'submit/:assignmentId',
          name: 'SubmitAssignment',
          props: true,
          component: () => import('@/views/assignments/Student/SubmitAssignment.vue')
        },
        {
          path: 'review/:submissionId',
          name: 'StudentReview',
          props: true,
          component: () => import('@/views/grading/StudentReview.vue')
        }
      ]
    },
    
    // 公共仪表盘
    {
      path: '/dashboard',
      component: () => import('@/layouts/BasicLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'analytics',
          name: 'Analytics',
          component: () => import('@/views/dashboard/AnalyticsMod.vue')
        }
      ]
    },
    
    // 异常页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/errors/NotFound.vue'),
      meta: { public: true }
    }
  ]
})