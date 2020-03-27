/**
 * 远程操作路由
 */

import Layout from '@/views/layout/Layout'

const remoteRouter = {
  path: '/remote',
  id: 'tms.remote',
  component: Layout,
  redirect: 'noredirect',
  meta: {
    title: '远程操作',
    icon: 'component',
  },
  children: [

    {
      path: 'remote-control',
      id: 'tms.remote.control',
      component: () => import('@/views/remote/remoteControl'),
      name: 'remoteControl',
      meta: { title: '远程控制' }
    },
    {
      path: 'remote-test',
      id: 'tms.remote.debug',
      component: () => import('@/views/remote/remoteTest/remoteTest'),
      name: 'remoteTest',
      meta: { title: '远程调试' }
    },
    {
      path: 'remote-oplog',
      component: () => import('@/views/remote/remoteOplog'),
      name: 'remoteOplog',
      meta: { title: '操作日志' },
      hidden: true
    },
    {
      path: 'remote-video-config/:id',
      component: () => import('@/views/remote/remoteTest/remoteVideoConfig/index'),
      name: 'remoteVideoConfig',
      meta: { title: '音视频配置' },
      hidden: true
    },
    {
      path: 'remote-broadcast-config/:id',
      component: () => import('@/views/remote/remoteTest/broadcastConfig'),
      name: 'broadcastConfig',
      meta: {
        title: '导播配置'
      },
      hidden: true
    }
  ]
}

export default remoteRouter
