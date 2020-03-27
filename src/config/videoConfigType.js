/**
 * 音视频设置 各状态对应码
 */

// 帧率状态列表
export const fpsStatus = [15, 25, 30, 50, 60]

// 音频处理器输入设备
export const enableCancellation = [
  {
    id: '0',
    name: '内置软件'
  }, {
    id: '1',
    name: '外接硬件'
  }
];

// 编码码率
// export const encodeBitrate = [128, 96, 64, 32]

// // 音频采样率
// export const samplingFrequency = [48000, 44100, 32000, 22050, 16000]

// // 音频通道数
// export const audioEncodeChannel = [
//   {
//     id: '1',
//     name: '单声道'
//   }, {
//     id: '2',
//     name: '双声道'
//   }
// ]

// 自动增益级别
export const automaticLevel = [
  {
    id: '0',
    name: '关闭'
  }, {
    id: '1',
    name: '轻微'
  }, {
    id: '2',
    name: '适中'
  }, {
    id: '3',
    name: '重度'
  }
]

// 回声消除级别
export const cancellationLevel = [
  {
    id: '1',
    name: '轻微'
  }, {
    id: '2',
    name: '适中'
  }, {
    id: '3',
    name: '重度'
  }
]

// 码率
export const bitrateList = [
  {
    id: '8000',
    name: '超清'
  }, {
    id: '4000',
    name: '高清'
  }, {
    id: '2000',
    name: '标清'
  }, {
    id: 'auto',
    name: '自定义'
  }
]
