/**
 * 各状态对应的名称
 */
function getText(value, data) {
  let result = '';
  data.map(v => {
    if (value == v.id) {
      result = v.name;
    }
  })
  return result;
}

// 锁定标志
const lockStatus = {
  data: [{
    id: '2',
    name: '锁定'
  }, {
    id: '1',
    name: '开启'
  }, {
    id: '0',
    name: '关闭'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 异常情况
const errorStatus = {
  data: [{
    id: '2',
    name: '告罄'
  },{
    id: '1',
    name: '警告'
  }, {
    id: '0',
    name: '正常'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 开启标志
const openStatus = {
  data: [{
    id: '0',
    name: '开启'
  }, {
    id: '1',
    name: '锁定'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 删除标志
const deleteStatus = {
  data: [{
    id: '0',
    name: '未删除'
  }, {
    id: '1',
    name: '删除'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 状态标志
const stateStatus = {
  data: [{
    id: '0',
    name: '停用'
  }, {
    id: '1',
    name: '开启'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 角色标志
const roleStatus = {
  data: [{
    id: '0',
    name: '运营管理员'
  }, {
    id: '1',
    name: '编辑管理员'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 类型标志
const typeStatus = {
  data: [{
    id: '0',
    name: '麦克风'
  }, {
    id: '1',
    name: '音响'
  }, {
    id: '2',
    name: '摄像机'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 终端软件升级管理 ----- 升级类型标志
const upgradeStatus = {
  data: [{
    id: '0',
    name: '升级'
  }, {
    id: '1',
    name: '强制升级'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 升级状态标志
const upgradeStateStatus = {
  data: [{
    id: '0',
    name: '未成功'
  }, {
    id: '1',
    name: '成功'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 升级模式标志
const upgradeModeStatus = {
  data: [{
    id: '1',
    name: '升级模式一'
  }, {
    id: '2',
    name: '升级模式二'
  }, {
    id: '3',
    name: '升级模式三'
  }, {
    id: '4',
    name: '升级模式四'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 激活状态标志
const activeStatus = {
  data: [{
    id: '0',
    name: '未激活'
  }, {
    id: '1',
    name: '已激活'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 自检状态标志
const selfCheckStatus = {
  data: [{
    id: '0',
    name: '自检'
  }, {
    id: '1',
    name: '自检中'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 重启状态标志
const restartStatus = {
  data: [{
    id: '0',
    name: '重启'
  }, {
    id: '1',
    name: '重启中'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 关机状态标志
const shutDownStatus = {
  data: [{
    id: '0',
    name: '关机'
  }, {
    id: '1',
    name: '关机中'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 设备状态标志
const deviceStatus = {
  data: [{
    id: '0',
    name: '停用'
  }, {
    id: '1',
    name: '启用'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 升级状态标志
const updateStatus = {
  data: [{
    id: '0',
    name: '未升级'
  }, {
    id: '1',
    name: '下载中'
  }, {
    id: '2',
    name: '下载完成'
  }, {
    id: '3',
    name: '升级成功'
  }, {
    id: '4',
    name: '升级失败'
  }, {
    id: '5',
    name: '完成'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 注册方式标志
const registStatus = {
  data: [{
    id: '0',
    name: '手机'
  }, {
    id: '1',
    name: 'PC'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 设备类型标志
const deviceTypeStatus = {
  data: [{
    id: '0',
    name: 'PC机'
  }, {
    id: '1',
    name: '嵌入式'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 终端机信息表 ------- 升级方式标志
const upgradeTypeStatus = {
  data: [{
    id: '0',
    name: '升级'
  }, {
    id: '1',
    name: '强制升级'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 操作系统类型标志
const osTypeStatus = {
  data: [{
    id: '0',
    name: 'Windows32'
  }, {
    id: '1',
    name: 'Windows64'
  }, {
    id: '2',
    name: 'Linux'
  }, {
    id: '3',
    name: 'Mac'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 操作类型标志
const operationTypeStatus = {
  data: [{
    id: '0',
    name: '自检'
  }, {
    id: '1',
    name: '重启'
  }, {
    id: '2',
    name: '关机'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 当前状态
const currentStatus = {
  data: [{
    id: '0',
    name: '在线'
  }, {
    id: '1',
    name: '离线'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

// 强制升级 是否
const upgradeType = {
  data: [{
    id: '1',
    name: '是'
  }, {
    id: '0',
    name: '否'
  }],
  getText: function(value) {
    return getText(value, this.data);
  }
}

export { lockStatus, openStatus, deleteStatus, stateStatus,
  typeStatus, upgradeStatus, upgradeStateStatus, upgradeModeStatus,
  activeStatus, selfCheckStatus, restartStatus, shutDownStatus,
  deviceStatus, updateStatus, registStatus, deviceTypeStatus,
  upgradeTypeStatus, osTypeStatus, roleStatus, currentStatus, upgradeType, errorStatus, operationTypeStatus }

