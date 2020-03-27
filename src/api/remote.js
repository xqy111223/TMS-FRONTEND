/*
* 远程操作    Remote operation
*/

import request from '@/utils/request'

// 获取远程控制列表
export function getRemoteControlList(params) {
  return request({
    url: '/tms/admin/remote/control/query.do',
    method: 'post',
    params: params
  })
}

// 获取操作日志列表
export function getOplogList(params) {
  return request({
    url: '/tms/admin/remote/control/checklog.do',
    method: 'get',
    params: params
  })
}

// 获取自检详情
export function getSelfCheck(params) {
  return request({
    url: '/tms/admin/remote/control/detail.do',
    method: 'post',
    params: params
  })
}

// 获取远程调试列表
export function getRemoteTestList(params) {
  return request({
    url: '/tms/admin/remote/debug/query.do',
    method: 'get',
    params: params
  })
}

// 自检
export function selfChecking(params) {
  return request({
    url: '/tms/admin/remote/control/selfCheck.do',
    method: 'get',
    params: params
  })
}

// 重启
export function restarting(params) {
  return request({
    url: '/tms/admin/remote/control/restart.do',
    method: 'get',
    params: params
  })
}

// 关机
export function shutDowning(params) {
  return request({
    url: '/tms/admin/remote/control/shutdown.do',
    method: 'get',
    params: params
  })
}

