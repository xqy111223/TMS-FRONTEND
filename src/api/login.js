import request from '@/utils/request';

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/tms/login.do',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/tms/admin/sys/user/exit.do',
    method: 'post'
  })
}

export function getUserInfo(userId) {
  return request({
    url: '/tms/admin/sys/role/getRoleList.do',
    method: 'post',
    params: { userId }
  })
}

export function getNav(token) {
  return request({
    url: '/login/getNav',
    method: 'get',
    params: { token }
  })
}

