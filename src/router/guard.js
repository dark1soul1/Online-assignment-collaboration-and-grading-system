import { useUserStore } from '../store/index';

export default (router) => {
    router.beforeEach(async (to, from, next) => {
      const authStore = useUserStore()
      
      // 1. 初始化用户状态
      if (!authStore.isInitialized) {
        await authStore.initialize()
      }
  
      // 2. 检查认证要求
      if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next({ name: 'Login', query: { redirect: to.fullPath } })
      }
  
      // 3. 检查角色权限
      if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
        return next({ name: 'NotFound' }) // 或自定义403页面
      }
  
      // 4. 已认证用户访问公开页面时重定向
      if (to.meta.public && authStore.isAuthenticated) {
        const defaultRoute = authStore.user?.role === 'teacher' 
          ? '/teacher/assignments/list' 
          : '/student/submit'
        return next(defaultRoute)
      }
  
      next()
    })
  }