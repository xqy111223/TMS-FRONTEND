import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/auth-redirect']// 可访问白名单

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (!store.getters.loginFlag) { // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetUserInfo').then(data => { // 拉取user_info
        const menuList = data // 获取用户的权限菜单
        store.dispatch('GenerateRoutes', menuList).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      }).catch(() => {
        store.dispatch('FedLogOut').then(() => {
          // Message.error(err)  // 所以 接口错误都会走
          next({ path: '/' });
        })
      })
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login')
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
