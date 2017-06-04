/**
 * 1 > 01, 11 > 11
 * @param  {Number} n
 * @return {String}
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 格式化时间
 * @param  {Date} date
 * @return {String}      格式化完的字符串,如:2017/01/01 12:00:00
 */
export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
