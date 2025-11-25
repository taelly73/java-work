<template>
  <div class="home-page">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="logo">政策分析系统</div>
      <div class="nav-right">
        <!-- 搜索框 -->
        <el-input
          v-model="searchKeyword"
          placeholder="搜索政策关键词（如：新能源汽车补贴）"
          prefix-icon="el-icon-search"
          @keyup.enter="handleSearch"
          class="search-box"
        />
      </div>
    </el-header>

    <!-- 卡片功能区 -->
    <el-main class="main-content">
      <h1>欢迎使用政策分析系统</h1>
      <p class="subtitle">整合政策数据 · 智能分析决策 · 赋能科研创新</p>

      <el-row :gutter="20" style="margin-top:40px;">
        <el-col :span="6" v-for="card in cards" :key="card.title">
          <el-card shadow="hover" class="home-card" @click="goPage(card.path)">
            <div class="card-icon">
              <component :is="card.icon" size="36" color="#0f4c81" />
            </div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <!-- 地图 + 汇总区（预留位置） -->
    <div class="map-section">
      <div class="map-placeholder">
        <p>这里将放置中国地图（ECharts/Leaflet）</p>
      </div>
      <div class="summary-placeholder">
        <p>这里将放置数据汇总：政策类型比例、本月新增等</p>
      </div>
    </div>

    <!-- 热门政策列表（预留） -->
    <div class="hot-list">
      <h2>热门政策</h2>
      <el-table :data="hotPolicies" border stripe style="width: 80%; margin: 0 auto;">
        <el-table-column prop="title" label="政策标题"></el-table-column>
        <el-table-column prop="publishUnit" label="发布单位" width="200"></el-table-column>
        <el-table-column prop="publishTime" label="发布日期" width="180"></el-table-column>
      </el-table>
    </div>

    <!-- 底部 -->
    <el-footer class="footer">
      © 2025 政策分析系统 | 科研政策导航项目
    </el-footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BarChart2, MessageSquare, Compass, FileText } from 'lucide-vue-next'

const router = useRouter()
const searchKeyword = ref('')

// 卡片配置
const cards = [
  { title: '数据大屏', desc: '政策数据可视化与趋势分析', icon: BarChart2, path: '/dashboard' },
  { title: 'AI问答', desc: '智能问答系统 · 快速获取政策要点', icon: MessageSquare, path: '/ai' },
  { title: '对比分析', desc: '地区与主题政策对比分析', icon: Compass, path: '/compare' },
  { title: '报告生成', desc: '一键生成专业政策分析报告', icon: FileText, path: '/report' }
]

// 模拟热门政策（后续替换为 API）
const hotPolicies = ref([
  { title: '关于加快发展新能源汽车产业的指导意见', publishUnit: '发改委', publishTime: '2025-09-28' },
  { title: '人工智能创新应用先导区建设方案', publishUnit: '科技部', publishTime: '2025-10-05' },
  { title: '数字乡村建设行动计划', publishUnit: '农业农村部', publishTime: '2025-09-20' },
])

// 路由跳转
function goPage(path) {
  router.push(path)
}

// 搜索跳转
function handleSearch() {
  if (searchKeyword.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchKeyword.value)}`)
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f7fa;
}

/* 顶部导航栏 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f4c81;
  padding: 0 40px;
  height: 64px;
  color: white;
}

.logo {
  font-weight: bold;
  font-size: 20px;
}

.search-box {
  width: 380px;
}

/* 主体区域 */
.main-content {
  flex: 1;
  text-align: center;
  padding: 40px 50px;
  background: linear-gradient(to bottom right, #eaf1fa, #ffffff);
}

.subtitle {
  color: #606266;
  font-size: 16px;
}

/* 卡片 */
.home-card {
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 60, 120, 0.15);
}

.home-card h3 {
  margin: 10px 0 6px;
  color: #0f4c81;
}

.home-card p {
  color: #606266;
  font-size: 14px;
}

.card-icon {
  margin-bottom: 10px;
}

/* 地图+汇总区 */
.map-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  margin: 40px auto;
  padding: 30px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.map-placeholder,
.summary-placeholder {
  width: 45%;
  height: 320px;
  border: 2px dashed #0f4c81;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f4c81;
  font-size: 16px;
  border-radius: 10px;
}

/* 热门政策列表 */
.hot-list {
  background: white;
  border-radius: 12px;
  width: 90%;
  margin: 40px auto;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.hot-list h2 {
  color: #0f4c81;
  margin-bottom: 20px;
  text-align: center;
}

/* 底部 */
.footer {
  text-align: center;
  background: #0f4c81;
  color: white;
  padding: 15px;
  font-size: 14px;
}
</style>
