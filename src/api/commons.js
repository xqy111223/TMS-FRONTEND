/**
 * 公共接口API
 */
import request from '@/utils/request'

// 获取区域列表
export function getAreaList(baseAreaId) {
  const query = { baseAreaId };
  return request({
    url: '/tms/admin/backend/getChildAreaList.do',
    method: 'get',
    params: query
  })
}

// 获取学校列表
export function getSchoolList(baseAreaId) {
  const query = { baseAreaId };
  return request({
    url: '/tms/admin/backend/getSchList.do',
    method: 'get',
    params: query
  })
}

// 获取教室列表
export function getClassroomList(baseSchoolId) {
  const query = { baseSchoolId };
  return request({
    url: '/tms/admin/backend/getClassRoomList.do',
    method: 'get',
    params: query
  })
}
