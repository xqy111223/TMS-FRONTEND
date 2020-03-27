/**
 * 本地保存token, username, adminUserId
 */
export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  return localStorage.setItem('token', token);
}

export function removeToken() {
  return localStorage.setItem('token', '');
}

// 用户名
export function setLocalAdminName(adminUserName) {
  return localStorage.setItem('adminUserName', adminUserName);
}
export function getLocalAdminName() {
  return localStorage.getItem('adminUserName');
}

// 用户id
export function setLocalAdminId(adminUserId) {
  return localStorage.setItem('adminUserId', adminUserId);
}
export function getLocalAdminId() {
  return localStorage.getItem('adminUserId');
}
