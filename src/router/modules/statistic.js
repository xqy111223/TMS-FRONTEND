/**
 * 统计报表路由
 */

import Layout from '@/views/layout/Layout'

const statisticRouter = {
  path: '/statistic',
  component: Layout,
  redirect: 'noredirect',
  meta: {
    title: '统计分析',
    icon: 'component',
  },
  children: [
    {
      path: 'statistic-analysis',
      component: () => import('@/views/statistic/statisticAnalysis'),
      name: 'statisticAnalysis',
      meta: { title: '统计报表' }
    }
  ]
}

export default statisticRouter
