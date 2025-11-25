<template>
  <div class="search-page">
    <el-container style="height:100vh;">

      <!-- ================= 顶部导航 ================= -->
      <el-header class="header">
        <div class="logo">政策分析系统</div>

        <el-input
          v-model="query"
          placeholder="搜索政策，例如：新能源汽车补贴…"
          clearable
          style="width:420px;"
          @keyup.enter="fetchData"
        >
          <template #append>
            <el-button icon="Search" @click="fetchData"></el-button>
          </template>
        </el-input>
      </el-header>

      <el-container>

        <!-- ================= 左侧筛选栏 ================= -->
        <el-aside width="280px" class="aside">

          <el-form label-position="top" class="filter-form">

            <el-form-item label="发布单位">
              <el-select v-model="filters.unit" placeholder="选择单位" clearable filterable>
                <el-option v-for="u in units" :key="u" :label="u" :value="u" />
              </el-select>
            </el-form-item>

            <el-form-item label="地区">
              <el-select v-model="filters.region" placeholder="选择地区" clearable filterable>
                <el-option v-for="r in regions" :key="r" :label="r" :value="r" />
              </el-select>
            </el-form-item>

            <el-form-item label="政策类型">
              <el-select v-model="filters.type" placeholder="选择类型" clearable multiple>
                <el-option
                  v-for="t in types"
                  :key="t.value"
                  :label="t.label"
                  :value="t.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="发布日期">
              <el-date-picker
                v-model="filters.dateRange"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width:100%"
              />
            </el-form-item>
            <el-form-item>
              <div class="button-row">
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button @click="resetFilters">重置</el-button>
              </div>

            
          </el-form-item>
        </el-form>
        </el-aside>

        <!-- ================= 主内容区 ================= -->
        <el-main class="main-content">

          <el-card style="height:100%;">

            <!-- 加载动画 -->
            <el-skeleton :loading="loading" animated>
              <el-table :data="policies" style="width:100%" v-if="policies.length > 0">

                <el-table-column prop="title" label="政策标题">
                  <template #default="scope">
                    <span class="title-link" @click="openDetail(scope.row)">
                      {{ scope.row.title }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column prop="publishUnit" label="发布单位" width="160px" />
                <el-table-column prop="region" label="地区" width="120px" />
                <el-table-column prop="publishTime" label="发布时间" width="150px" />

              </el-table>

              <!-- 空数据 -->
              <div v-else style="text-align:center;padding:80px;color:#999;">
                暂无数据，请调整筛选条件
              </div>
            </el-skeleton>

            <!-- 分页 -->
            <div style="margin-top:20px;text-align:center;">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="changePage"
              />
            </div>

          </el-card>

        </el-main>
      </el-container>

    </el-container>
  </div>
</template>


<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/api'

// ---------------- 内部状态 ----------------
const query = ref('')

const filters = reactive({
  unit: '',
  region: '',
  type: [],
  dateRange: []
})

// 下拉选项（可后端动态获取）
const units = ['国务院', '发改委', '工信部']
const regions = ['全国', '北京', '上海', '广东']
const types = [
  { label: '法律法规', value: 'law' },
  { label: '通知公告', value: 'notice' },
  { label: '规划性文件', value: 'plan' },
  { label: '指导意见', value: 'guide' }
]

// ---------------- 数据与分页 ----------------
const policies = ref([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = 10

// ---------------- 获取数据 ----------------
async function fetchData() {
  loading.value = true

  const params = {
    q: query.value,
    unit: filters.unit,
    region: filters.region,
    type: filters.type,
    dateStart: filters.dateRange?.[0] || '',
    dateEnd: filters.dateRange?.[1] || '',
    page: page.value,
    pageSize
  }

  const res = await api.getPolicies(params)

  policies.value = res.items || []
  total.value = res.total || 0

  loading.value = false
}

// 分页
function changePage(newPage) {
  page.value = newPage
  fetchData()
}

// 重置
function resetFilters() {
  filters.unit = ''
  filters.region = ''
  filters.type = []
  filters.dateRange = []
  page.value = 1
  fetchData()
}

// 点击标题打开详情（预留）
function openDetail(row) {
  console.log('点击了政策：', row)
}

onMounted(fetchData)
</script>


<style scoped>
.search-page {
  height: 100vh;
  overflow: hidden;
}

/* 顶部栏 */
.header {
  background: #0f4c81;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.logo {
  font-size: 20px;
  font-weight: bold;
}

/* 左侧筛选栏 */
.aside {
  background: #f5f7fa;
  padding: 18px;
  border-right: 1px solid #e5e5e5;
  overflow-y: auto;
}

/* 主内容区 */
.main-content {
  background: #fff;
  padding: 20px;
}

/* 标题可点击效果 */
.title-link {
  color: #0f4c81;
  font-weight: bold;
  cursor: pointer;
}
.title-link:hover {
  text-decoration: underline;
}
</style>
