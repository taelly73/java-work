<template>
  <div class="detail-page">
    
    <!-- 顶部标题区 -->
    <el-page-header @back="goBack" content="政策详情" class="header">
      <template #content>
        <span class="header-title">{{ detail.title }}</span>
      </template>
    </el-page-header>

    <el-card class="info-card">
      <div class="meta">
        <span><strong>发布单位：</strong>{{ detail.publishUnit }}</span>
        <span><strong>地区：</strong>{{ detail.region }}</span>
        <span><strong>发布日期：</strong>{{ detail.publishTime }}</span>
        <span v-if="detail.documentNo"><strong>文号：</strong>{{ detail.documentNo }}</span>
      </div>

      <div class="tags">
        <el-tag
          v-for="tag in detail.tags"
          :key="tag"
          type="info"
          effect="light"
          style="margin-right: 6px;"
        >
          {{ tag }}
        </el-tag>
      </div>
    </el-card>

    <!-- 正文内容 -->
    <el-card class="content-card">
      <h2 style="margin-bottom:10px;">正文内容</h2>
      <div
        class="content-body"
        v-html="detail.content"
      ></div>
    </el-card>

    <!-- 附件下载 -->
    <el-card v-if="detail.attachments?.length" class="attach-card">
      <h3>附件下载</h3>

      <el-link
        v-for="file in detail.attachments"
        :key="file.url"
        :href="file.url"
        target="_blank"
        style="display:block;margin:4px 0;"
      >
        📄 {{ file.name }}
      </el-link>
    </el-card>

    <!-- 相关政策推荐 -->
    <el-card class="recommend-card">
      <h3>相关政策推荐</h3>

      <el-skeleton :loading="loadingRecommend" animated>
        <ul>
          <li
            v-for="item in recommend"
            :key="item.id"
            class="recommend-item"
            @click="goDetail(item.id)"
          >
            {{ item.title }}
          </li>
        </ul>
      </el-skeleton>
    </el-card>

  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'

const route = useRoute()
const router = useRouter()

const detail = ref({})
const recommend = ref([])
const loadingRecommend = ref(false)

async function fetchDetail() {
  const id = route.params.id
  const res = await api.getPolicyDetail(id)
  detail.value = res
}

async function fetchRecommend() {
  loadingRecommend.value = true
  const res = await api.getRecommendPolicies({ id: route.params.id })
  recommend.value = res.items
  loadingRecommend.value = false
}

function goDetail(id) {
  router.push(`/policy/${id}`)
}

function goBack() {
  router.back()
}

onMounted(() => {
  fetchDetail()
  fetchRecommend()
})
</script>



<style scoped>
.detail-page {
  padding: 25px;
  max-width: 900px;
  margin: 0 auto;
}

.header {
  margin-bottom: 20px;
}

.header-title {
  font-size: 20px;
  font-weight: bold;
}

/* 信息卡片 */
.info-card {
  margin-bottom: 20px;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 14px;
  margin-bottom: 10px;
}

.tags {
  margin-top: 10px;
}

/* 正文 */
.content-card {
  margin-bottom: 20px;
}

.content-body {
  line-height: 1.75;
  font-size: 15px;
  color: #333;
  padding: 5px 0;
}

/* 附件 */
.attach-card {
  margin-bottom: 20px;
}

/* 推荐列表 */
.recommend-card ul {
  padding-left: 0;
  list-style: none;
}

.recommend-item {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.recommend-item:hover {
  color: #0f4c81;
  font-weight: bold;
}
</style>
