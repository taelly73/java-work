import { createRouter, createWebHistory } from 'vue-router'

// 页面组件导入
import Home from '@/pages/Home.vue'
import SearchPage from '@/pages/SearchPage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Compare from '@/pages/Compare.vue'
import Report from '@/pages/Report.vue'
import PolicyDetailPage from '@/pages/PolicyDetailPage.vue' 
// 路由配置表
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页 - 政策分析系统' }
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage,
    meta: { title: '政策检索 - 政策分析系统' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: '数据大屏 - 政策分析系统' }
  },
  {
    path: '/compare',
    name: 'Compare',
    component: Compare,
    meta: { title: '对比分析 - 政策分析系统' }
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    meta: { title: '报告生成 - 政策分析系统' }
  },
  { path: '/policy/:id', name: 'PolicyDetail', component: PolicyDetailPage, props: true },

  // fallback
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // 每次切换页面回到顶部
    return { top: 0 }
  }
})

// 动态修改浏览器标题
router.afterEach((to) => {
  document.title = to.meta.title || '政策分析系统'
})

export default router
