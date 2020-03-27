/*
* 系统管理    system management
*/

import request from '@/utils/request'

// 修改密码
export function changePwd(token) {
  return request({
    url: '/tms/admin/manage/changepwd/save.do',
    method: 'post',
    params: { token }
  })
}

// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/tms/admin/sys/role/init.do',
    method: 'get',
    params: params
  })
}

// 获取绑定用户列表
export function getRoleUserList(params) {
  return request({
    url: '/tms/admin/sys/role/getRoleUserList.do',
    method: 'get',
    params: params
  })
}

// 删除用户角色
export function deleteRole(roleId) {
  const params = { roleId };
  return request({
    url: '/tms/admin/sys/role/delete.do',
    method: 'get',
    params: params
  })
}

// 新增用户角色
export function addRoleInfo(params) {
  return request({
    url: '/tms/admin/sys/role/add/save.do',
    method: 'get',
    params,
  })
}

// 编辑用户角色
export function editRoleInfo(params) {
  return request({
    url: '/tms/admin/sys/role/edit/save.do',
    method: 'post',
    params,
  })
}
// 获取权限列表
export function getAuthorityList(params) {
  return request({
    url: '/tms/admin/sys/role/getRoleList.do',
    method: 'get',
    params
  })
}

// 获取角色详情
export function getRoleDetail(roleId) {
  const params = { roleId };
  return request({
    url: '/tms/admin/sys/role/check/init.do',
    method: 'get',
    params: params
  })
}

// 获取系统参数列表
export function getSystemParameterList(params) {
  return request({
    url: '/tms/admin/sys/param/init.do',
    method: 'get',
    params: params
  })
}

// 保存编辑后的系统参数列表
export function saveSystemParameterList(params) {
  return request({
    url: '/tms/admin/sys/param/edit/save.do',
    method: 'post',
    params: params
  })
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/tms/admin/sys/user/init.do',
    method: 'get',
    params: params
  })
}

// 新增用户
export function addUser(params) {
  return request({
    url: '/tms/admin/sys/user/add/save.do',
    method: 'post',
    params: params
  })
}

// 编辑用户保存
export function saveEditUser(params) {
  return request({
    url: '/tms/admin/sys/user/edit/save.do',
    method: 'post',
    params: params
  })
}

// 编辑、查看用户
export function editUser(params) {
  return request({
    url: '/tms/admin/sys/user/check.do',
    method: 'post',
    params: params
  })
}

// 删除用户信息
export function removeUser(params) {
  return request({
    url: '/tms/admin/sys/user/delete.do',
    method: 'post',
    params: params
  })
}

// 保存用户设置
export function saveUserSetting(params) {
  return request({
    url: '/tms/admin/sys/user/add/save.do',
    method: 'post',
    params: params
  })
}

// 新增、编辑用户中获取角色类型
export function getAllRoles(params) {
  return request({
    url: '/tms/admin/sys/role/queryAllRoles.do',
    method: 'get',
    params: params
  })
}

// 用户解锁
export function unlocked(params) {
  return request({
    url: '/tms/admin/sys/user/unlock.do',
    method: 'get',
    params: params
  })
}
