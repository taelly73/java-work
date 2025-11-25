import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // 改成你 Spring Boot 后端地址
  timeout: 10000
})

export default {
  async getPolicies(params) {
    // 演示数据
    const mock = {
      items: [
        { title: '关于促进新能源产业发展的通知', publishUnit: '发改委', region: '全国', publishTime: '2024-09-12' },
        { title: '人工智能创新发展实施意见', publishUnit: '工信部', region: '北京', publishTime: '2025-01-20' }
      ]
    }
    return mock
    // 实际开发中改为：
    // return await api.get('/policies', { params }).then(res => res.data)
  }
}
