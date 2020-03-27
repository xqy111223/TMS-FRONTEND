/**
 * 终端管理路由
 */

import Layout from '@/views/layout/Layout'

const terminalRouter = {
  path: '/terminal',
  id: 'tms.terminal',
  component: Layout,
  redirect: 'noredirect',
  meta: {
    title: '终端管理',
    icon: 'component',
  },
  children: [
    {
      path: 'equipment-manage',
      id: 'tms.terminal.device',
      component: () => import('@/views/terminal/equipmentManage/equipmentManage'),
      name: 'equipmentManage',
      meta: { title: '设备管理' }
    }, {
      path: 'equipment-register/',
      component: () => import('@/views/terminal/equipmentManage/equipmentRegisterOrEdit'),
      name: 'equipmentRegister',
      meta: { title: '注册设备' },
      hidden: true
    }, {
      path: 'equipment-batch-upgrade',
      component: () => import('@/views/terminal/equipmentManage/equipmentBatchUpgrade'),
      name: 'equipmentBatchUpgrade',
      meta: { 'title': '批量升级' },
      hidden: true
    }, {
      path: 'equipment-see/:id',
      component: () => import('@/views/terminal/equipmentManage/equipmentSee'),
      name: 'equipmentSee',
      meta: { 'title': '设备管理详情' },
      hidden: true
    }, {
      path: 'equipment-edit/:id',
      component: () => import('@/views/terminal/equipmentManage/equipmentRegisterOrEdit'),
      name: 'equipmentEdit',
      meta: { 'title': '编辑设备' },
      hidden: true
    }, {
      path: 'equipment-upgrade/:id',
      component: () => import('@/views/terminal/equipmentManage/equipmentUpgrade'),
      name: 'equipmentUpgrade',
      meta: { title: '设备升级' },
      hidden: true
    }, {
      path: 'equipment-upgrade-record/:id',
      component: () => import('@/views/terminal/equipmentManage/equipmentUpgradeRecord'),
      name: 'equipmentUpgradeRecord',
      meta: { title: '设备升级记录' },
      hidden: true
    }, {
      path: 'state-manage',
      id: 'tms.terminal.supervise',
      component: () => import('@/views/terminal/stateManage'),
      name: 'stateManage',
      meta: { title: '状态管理' }
    },
    {
      path: 'exception-manage',
      id: 'tms.terminal.fault',
      component: () => import('@/views/terminal/exceptionManage'),
      name: 'exceptionManage',
      meta: { title: '故障管理' }
    },
    {
      path: 'software-manage',
      id: 'tms.terminal.soft',
      component: () => import('@/views/terminal/softwareManage'),
      name: 'softwareManage',
      meta: { title: '软件管理' }
    },
    {
      path: 'operation-log/:id',
      component: () => import('@/views/terminal/operationLog'),
      name: 'operationLog',
      meta: { title: '操作日志', noCache: true },
      hidden: true
    },
    {
      path: 'exception-details',
      component: () => import('@/views/terminal/exceptionDetails'),
      name: 'exceptionDetails',
      meta: { title: '总设备详情' },
      hidden: true
    },
    {
      path: 'exception-breakdown-details',
      component: () => import('@/views/terminal/exceptionBreakdownDetails'),
      name: 'exceptionBreakdownDetails',
      meta: { title: '故障设备详情' },
      hidden: true
    },
  ]
}

export default terminalRouter
