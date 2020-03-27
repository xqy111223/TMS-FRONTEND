import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(hasRoutesIdList, routers) {
  routers = routers.filter(router => {
    if (router.children && router.children.length > 0) {
      router.children = hasPermission(hasRoutesIdList, router.children);
    }
    debugger
    if (hasRoutesIdList.indexOf(router.id) > -1) {
      return router;
    }
  }) 
  return routers
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes) {
  // 以下为路由过滤，前后端联调时直接放开即可
  // 重新组装routes数据结构
  // const hasRoutesIdList = [];
  // let resultRouter = [];
  // routes.forEach(router => {
  //   hasRoutesIdList.push(router.adminMenuId);
  // });
  // resultRouter = hasPermission(hasRoutesIdList, asyncRouterMap);
  // return resultRouter

  return asyncRouterMap; 
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, routes) {
      return new Promise(resolve => {
        // const { roles } = data
        let accessedRouters = []

        // 过滤用户的路由菜单
        accessedRouters = filterAsyncRouter(routes)
        accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
