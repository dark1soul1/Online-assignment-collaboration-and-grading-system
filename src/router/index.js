import { createRouter, createWebHistory } from 'vue-router'
import TeacherLayout from '../layouts/TeacherLayout.vue'
import AssignHomework from '../view/teacher/AssignHomework.vue'
import GradeHomework from '../view/teacher/GradeHomework.vue'
import Dashboard from '../view/teacher/Dashboard.vue'
import UserProfile from '../components/userProfile.vue'
import TeamManage from '../components/TeacherComs/teamManage.vue'

const routes = [
  { path: '/home', 
    name: 'Home', 
    component:()=>import('../layouts/BasicLayout.vue'),
    children:[
      
    ]
  },
  {
        path: '/teacher',
        component: TeacherLayout,
        children: [
            {
                path: 'assign-homework',
                component: AssignHomework,
                meta: { title: '发布作业' }
            },
            {
                path: 'grade-homework',
                component: GradeHomework,
                meta: { title: '批改作业' }
            },
            {
                path: 'dashboard',
                component: Dashboard,
                meta: { title: '统计看板' }
            },
            {
                path: 'user-profile',
                component: UserProfile,
                meta: { title: '个人中心' }
            },
            {
                path: 'team-manage',
                component: TeamManage,
                meta: { title: '团队管理' }
            },
            {
                path: '',
                redirect: '/teacher/assign-homework'
            }
        ]
      },
  { path: '/test', name: 'Test', component:()=>import('../layouts/testCom.vue'),},
  { path: '/', redirect: '/home' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;