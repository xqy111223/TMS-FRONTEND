/** 
 * 导播canvas画线操作函数
*/

// 水平线函数
export function drawHorizontalLine(canvas, y) {
  canvas.beginPath();
  canvas.moveTo(0, y);
  canvas.lineTo(740, y);
  canvas.strokeStyle = '#19f719'; // 描边
  canvas.lineWidth = 2; // 描边线的宽度
  canvas.stroke();
  canvas.closePath();
}

// ROI 与 ROU 画线函数
export function drawROLine(canvas, arr, x, y, flag) {
  if (arr.length === 0) {
    canvas.beginPath();
    canvas.moveTo(x, y);
  }
  canvas.lineTo(x, y);
  canvas.strokeStyle = 'red'; // 描边
  canvas.lineWidth = 2; // 描边线的宽度
  canvas.stroke();
  if (flag) {
    canvas.closePath();
    // this.drawROI = false;
    console.log('event.returnValue******flag******', flag);
  }
}
