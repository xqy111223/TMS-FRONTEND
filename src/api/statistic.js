/*
* 统计报表    Statistical report forms
*/

import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/tms/sys/role/init.do',
    method: 'get',
    params: query
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

