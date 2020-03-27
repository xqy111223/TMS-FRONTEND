export default {
  msg: 'success',
  result: [{
    path: '/sys',
    redirect: 'sys-role',
    name: 'sys',
    meta: {
      title: '系统管理',
      icon: 'component'
    },
    children: [
      {
        path: 'sys-role',
        url: 'system/roleManage',
        name: 'sys-role',
        meta: { title: '角色管理' }
      },
      {
        path: 'sys-user',
        url: 'system/userManage',
        name: 'sys-user',
        meta: { title: '用户管理' }
      },
      {
        path: 'sys-params',
        url: 'system/systemParameter',
        name: 'sys-params',
        meta: { title: '系统参数' }
      }
    ]
  },
  {
    path: '/terminal',
    redirect: 'terminal-drive',
    url: null,
    name: 'terminal',
    meta: {
      title: '终端管理',
      icon: 'component'
    },
    children: [
      {
        path: 'terminal-drive',
        url: 'table/dynamicTable/index',
        name: 'terminal-drive',
        meta: { title: '设备管理' }
      },
      {
        path: 'terminal-setting',
        url: 'table/dragTable',
        name: 'terminal-setting',
        meta: { title: '参数配置' }
      },
      {
        path: 'terminal-status',
        url: 'table/dragTable',
        name: 'terminal-status',
        meta: { title: '状态监管' }
      },
      {
        path: 'terminal-exception',
        url: 'table/dragTable',
        name: 'terminal-exception',
        meta: { title: '故障管理' }
      },
      {
        path: 'terminal-software',
        url: 'table/dragTable',
        name: 'terminal-software',
        meta: { title: '软件管理' }
      }
    ]
  },
  {
    path: '/mstsc',
    url: null,
    redirect: 'mstsc-setting',
    name: 'mstsc',
    meta: {
      title: '远程操作',
      icon: 'component'
    },
    children: [
      {
        path: 'mstsc-setting',
        url: 'table/dynamicTable/index',
        name: 'mstsc-setting',
        meta: { title: '远程配置' }
      },
      {
        path: 'mstsc-control',
        url: 'table/dragTable',
        name: 'mstsc-control',
        meta: { title: '远程控制' }
      },
      {
        path: 'mstsc-test',
        url: 'table/dragTable',
        name: 'mstsc-test',
        meta: { title: '远程调试' }
      }
    ]
  },
  {
    path: '/dashboard',
    url: null,
    redirect: 'dashboard',
    name: 'dashboard',
    meta: {
      title: '统计分析',
      icon: 'component'
    },
    children: [
      {
        path: 'dashboard',
        url: 'dashboard/index',
        name: 'dashboard',
        meta: { title: '统计报表', icon: 'dashboard' }
      }
    ]
  }
  ]
}
