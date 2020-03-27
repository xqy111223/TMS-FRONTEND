/**
 * 远程操作 ---- 远程调式 ---- 导播配置 - 基础数据对应表
 * 
 */

// 跟踪机位select
export const trackPositionList = [{
  value: '1',
  label: '一机位'
}, {
  value: '2',
  label: '二机位'
}, {
  value: '3',
  label: '三机位'
}, {
  value: '4',
  label: '四机位'
}, {
  value: '5',
  label: '五机位'
}];

// 跟踪机位选项
export const trackCheckList = [{
  value: '1',
  label: '教师跟踪',
  name: 'isEnableTeacherTrack'
}, {
  value: '2',
  label: 'VGA',
  name: 'isEnableVGA'
}, {
  value: '3',
  label: '学生跟踪',
  name: 'isEnable_student_track'
}, {
  value: '4',
  label: '板书',
  name: 'bBlackboardTower'
}, {
  value: '5',
  label: '教师全景',
  name: 'is_enable_teacher_fullscene_camera_ext'
}, {
  value: '6',
  label: '学生全景',
  name: 'is_enable_student_fullscene_camera_ext'
}];

// 跟踪分析头
export const trackHeadList = [{
  value: '1',
  label: '教师跟踪分析头',
  name: 'is_enable_teacher_analyze_camera'
}, {
  value: '2',
  label: '学生跟踪分析头',
  name: 'is_enable_student_analyze_camera'
}, {
  value: '3',
  label: '板书跟踪分析头',
  name: 'isEnable_blackboard_track'
}, {
  value: '4',
  label: '联合跟踪分析头',
  name: 'is_enable_teacher_student_union_track_analyze_camera'
}];

// table list
export const tableDateList = [{
  channelId: '教师跟踪',
  cameraType: 'cameraType相机类型',
  videoType: 'videoType相机型号',
  cameraUrl: 'cameraUrl相机地址',
  resolutionIndex: 'resolutionIndex分别率',
  comNo: 'comNo云台串口',
  enable: '未启用',
  name: 'isEnableTeacherTrack'
}, {
  channelId: 'VGA',
  cameraType: 'cameraType相机类型',
  videoType: 'videoType相机型号',
  cameraUrl: 'cameraUrl相机地址',
  resolutionIndex: 'resolutionIndex分别率',
  comNo: 'comNo云台串口',
  enable: '未启用',
  name: 'isEnableVGA'
}, {
  channelId: '学生跟踪',
  cameraType: 'cameraType相机类型',
  videoType: 'videoType相机型号',
  cameraUrl: 'cameraUrl相机地址',
  resolutionIndex: 'resolutionIndex分别率',
  comNo: 'comNo云台串口',
  enable: '未启用',
  name: 'isEnable_student_track'
}, {
  channelId: '板书',
  cameraType: 'cameraType相机类型',
  videoType: 'videoType相机型号',
  cameraUrl: 'cameraUrl相机地址',
  resolutionIndex: 'resolutionIndex分别率',
  comNo: 'comNo云台串口',
  enable: '未启用',
  name: 'bBlackboardTower'
}, {
  channelId: '教师全景',
  cameraType: 'cameraType相机类型',
  videoType: 'videoType相机型号',
  cameraUrl: 'cameraUrl相机地址',
  resolutionIndex: 'resolutionIndex分别率',
  comNo: 'comNo云台串口',
  enable: '未启用',
  name: 'is_enable_teacher_fullscene_camera_ext'
}, {
  channelId: '学生全景',
  cameraType: 'cameraType相机类型',
  videoType: 'videoType相机型号',
  cameraUrl: 'cameraUrl相机地址',
  resolutionIndex: 'resolutionIndex分别率',
  comNo: 'comNo云台串口',
  enable: '未启用',
  name: 'is_enable_student_fullscene_camera_ext'
}, {
  channelId: '教师分析头',
  cameraType: 'cameraType相机类型',
  videoType: 'videoType相机型号',
  cameraUrl: 'cameraUrl相机地址',
  resolutionIndex: 'resolutionIndex分别率',
  comNo: 'comNo云台串口',
  enable: '未启用',
  name: 'is_enable_teacher_analyze_camera'
}, {
  channelId: '学生分析头',
  cameraType: 'cameraType相机类型',
  videoType: 'videoType相机型号',
  cameraUrl: 'cameraUrl相机地址',
  resolutionIndex: 'resolutionIndex分别率',
  comNo: 'comNo云台串口',
  enable: '未启用',
  name: 'is_enable_student_analyze_camera'
}, {
  channelId: '板书分析头',
  cameraType: 'cameraType相机类型',
  videoType: 'videoType相机型号',
  cameraUrl: 'cameraUrl相机地址',
  resolutionIndex: 'resolutionIndex分别率',
  comNo: 'comNo云台串口',
  enable: '未启用',
  name: 'isEnable_blackboard_track'
}, {
  channelId: '联合分析头',
  cameraType: 'cameraType相机类型',
  videoType: 'videoType相机型号',
  cameraUrl: 'cameraUrl相机地址',
  resolutionIndex: 'resolutionIndex分别率',
  comNo: 'comNo云台串口',
  enable: '未启用',
  name: 'is_enable_teacher_student_union_track_analyze_camera'
}];

// 摄像机采集通道
export const acquisitionList = [{
  value: '1',
  label: '教师跟踪'
}, {
  value: '2',
  label: 'VGA'
}, {
  value: '3',
  label: '学生跟踪'
}, {
  value: '4',
  label: '板书'
}, {
  value: '5',
  label: '教师全景'
}, {
  value: '6',
  label: '学生全景'
}, {
  value: '7',
  label: '教师分析头'
}, {
  value: '8',
  label: '学生分析头'
}, {
  value: '9',
  label: '板书分析头'
}, {
  value: '10',
  label: '联合分析头'
}];

// 摄像机通道
export const cameraChannelList = [{
  value: '0',
  label: '请选择'
}, {
  value: '1',
  label: '教师跟踪摄像机'
}, {
  value: 2,
  label: 'VGA'
}, {
  value: 3,
  label: '学生跟踪摄像机'
}, {
  value: 4,
  label: '教师板书摄像机'
}, {
  value: 5,
  label: '教师全景摄像机'
}, {
  value: 6,
  label: '学生全景摄像机'
}, {
  value: 7,
  label: '教师跟踪分析头'
}, {
  value: 8,
  label: '学生跟踪分析头'
}, {
  value: 9,
  label: '联合跟踪分析头'
}];

// 区域预置位
export const regionalLocationList = [{
  value: 1,
  label: '教师全景预置位'
}, {
  value: 2,
  label: '主预置位1'
}, {
  value: 3,
  label: '主预置位2'
}, {
  value: 4,
  label: '主预置位3'
}, {
  value: 5,
  label: '辅预置位1'
}, {
  value: 6,
  label: '辅预置位2'
}, {
  value: 7,
  label: '板书预置位1'
}, {
  value: 8,
  label: '板书预置位2'
}];

// 黑板类型
export const blackboardList = [{
  value: 1,
  label: '两版式'
}];
// {
//   value: 2,
//   label: '三版式'
// }

// 画线类型
export const lineTypeList = [{
  value: 1,
  label: '主预置位线'
}, {
  value: 2,
  label: '辅预置位线'
}, {
  value: 3,
  label: '黑板边界线'
}, {
  value: 4,
  label: '板书辅预置位线'
}];

// 安装位置
export const installLocationList = [{
  value: '安装位置1',
  label: '安装位置1'
}, {
  value: '安装位置2',
  label: '安装位置2'
}];
