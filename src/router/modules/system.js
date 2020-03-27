/**
 * 系统管理路由
 */
import Layout from '@/views/layout/Layout'

const systemRouter = {
  path: '/system',
  id: 'tms.sys',
  component: Layout,
  redirect: 'noredirect',
  meta: {
    title: '系统管理',
    icon: 'component'
  },
  children: [
    {
      path: 'role-manage',
      id: 'tms.sys.role',
      component: () => import('@/views/system/roleManage/roleManage'),
      name: 'roleManage',
      meta: { title: '角色管理' }
    },
    {
      path: 'user-manage',
      id: 'tms.sys.user',
      component: () => import('@/views/system/userManage'),
      name: 'systemManage',
      meta: { title: '用户管理' }
    },
    {
      path: 'system-parameter',
      id: 'tms.sys.param',
      component: () => import('@/views/system/systemParameter'),
      name: 'systemParameter',
      meta: { title: '系统参数' }
    },
    {
      path: 'add-role',
      component: () => import('@/views/system/roleManage/addOrEditRole'),
      name: 'addOrEditRole',
      meta: { title: '新增角色' },
      hidden: true
    },
    {
      path: 'edit-role/:id',
      component: () => import('@/views/system/roleManage/addOrEditRole'),
      name: 'editOrEditRole',
      meta: { title: '编辑角色', noCache: true },
      hidden: true
    },
    {
      path: 'view-role/:id',
      component: () => import('@/views/system/roleManage/roleDetail'),
      name: 'roleDetail',
      meta: { title: '角色详情', noCache: true },
      hidden: true
    },
    {
      path: 'add-user',
      component: () => import('@/views/system/addOrEditUser'),
      name: 'addOrEditUser',
      meta: { title: '新增用户', noCache: true },
      hidden: true
    },
    {
      path: 'edit-user/:id',
      component: () => import('@/views/system/addOrEditUser'),
      name: 'editOrEditUser',
      meta: { title: '编辑用户', noCache: true },
      hidden: true
    },
    {
      path: 'userDetail/:id',
      component: () => import('@/views/system/userDetail'),
      name: 'userDetail',
      meta: { title: '查看用户', noCache: true },
      hidden: true
    }
  ]
}
export default systemRouter
