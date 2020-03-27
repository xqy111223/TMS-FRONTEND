/*
* 终端管理    Terminal management
*/

import request from '@/utils/request';

// 终端管理 --- 设备管理 --- 设备管理列表
export function terminalList(params) {
  return request({
    url: 'tms/admin/terminal/device/init.do',
    method: 'POST',
    params: params
  });
}

// 终端管理 --- 设备管理 --- 设备操作 --- 查看
export function terminalDetail(deviceId) {
  const params = { deviceId };
  return request({
    url: 'tms/admin/terminal/device/check.do',
    method: 'get',
    params: params
  });
}

// 终端管理 --- 设备管理 --- 注册设备
export function addDevice(params) {
  return request({
    url: 'tms/admin/terminal/device/regist/save.do',
    method: 'get',
    params: params
  });
}

// 终端管理 --- 设备管理 ---编辑设备
export function editDevice(params) {
  return request({
    url: 'tms/admin/terminal/device/edit/save.do',
    method: 'get',
    params: params
  });
}

// 终端管理 --- 设备管理 --- 设备操作 ---删除
export function deleteDevice(deviceId) {
  const params = { deviceId };
  return request({
    url: '/tms/admin/terminal/device/delete.do',
    method: 'get',
    params: params
  });
}

// 终端管理 --- 设备管理 --- 升级操作 --- 升级
export function updateDevice(params) {
  return request({
    url: 'tms/admin/terminal/device/update/save.do',
    method: 'get',
    params: params
  });
}

// 终端管理 --- 设备管理 --- 升级操作 --- 批量升级
export function batchUpdateDevice(params) {
  return request({
    url: 'tms/admin/terminal/device/batchUpdate/save.do',
    method: 'get',
    params: params
  });
}
// 终端管理 --- 设备管理 --- 升级操作 --- 升级记录
export function upgradeRecordList(params) {
  return request({
    url: 'tms/admin/terminal/device/log/query.do',
    method: 'get',
    params: params
  });
}

// 获取状态管理列表
export function getStateList(params) {
  return request({
    url: 'tms/admin/terminal/supervise/init.do',
    method: 'get',
    params
  })
}
// 设置间隔
export function setupInterval(params) {
  return request({
    url: 'tms/admin/terminal/supervise/setInterval/save.do',
    method: 'get',
    params
  })
}

// 批量设置间隔
export function batchSet(params) {
  return request({
    url: 'tms/admin/terminal/supervise/BatchSetInterVal.do',
    method: 'get',
    params
  })
}

// 获取软件管理列表
export function getSoftList(params) {
  return request({
    url: 'tms/admin/terminal/soft/init.do',
    method: 'get',
    params
  })
}

// 获取操作日志列表
export function getOperationList(params) {
  return request({
    url: 'tms/admin/terminal/soft/log/init.do',
    method: 'get',
    params
  })
}

// 软件管理-新增版本
export function addVersion(params) {
  return request({
    url: 'tms/admin/terminal/soft/save.do',
    method: 'get',
    params
  })
}

// 软件管理-编辑版本
export function editVersion(params) {
  return request({
    url: 'tms/admin/terminal/soft/edit/save.do',
    method: 'get',
    params
  })
}
// 软件管理-删除软件
export function deleteVersion(params) {
  return request({
    url: 'tms/admin/terminal/soft/delete.do',
    method: 'get',
    params
  })
}

// 异常参数设置
export function errorParamsSetting(params) {
  return request({
    url: 'tms/admin/terminal/fault/setExceptionParam/submit.do',
    method: 'post',
    params
  })
}

// 获取故障管理列表
export function getExceptionList(baseAreaId) {
  const params = { baseAreaId };
  return request({
    url: 'tms/admin/terminal/fault/query.do',
    method: 'get',
    params
  })
}

// 获取故障管理详情列表
export function getExceptionDetailList(params) {
  return request({
    url: 'tms/admin/terminal/fault/detail.do',
    method: 'get',
    params
  })
}

// 终端管理 --- 设备管理 --- 升级操作 --- 升级 -- 升级版本下拉列表
export function getSoftForOneUpgrade(params) {
  return request({
    url: '/tms/admin/terminal/device/getSoftForOneUpgrade.do',
    method: 'post',
    params: params
  });
}

