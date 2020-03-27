const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  name: state => state.user.name,
  locked: state => state.user.locked,
  menuList: state => state.user.menuList,   // 权限列表
  loginFlag: state => state.user.loginFlag, // 是否获取过用户权限信息
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
}
export default getters
