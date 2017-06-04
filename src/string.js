export function isString(v) {
  return typeof(v) == 'string'
}

/**
 * 清除字符串两边空格
 * @param  {String} str
 * @return {String}
 */
export function stringTrim(str) {
  return str.replace(/^\s*|\s*$/g, '')
}

/**
 * 清除字符串左边空格
 * @param  {String} str
 * @return {String}
 */
export function stringTrimLeft(str) {
  return str.replace(/^\s*/, '')
}

/**
 * 清除字符串右边空格
 * @param  {String} str
 * @return {String}
 */
export function stringTrimRight(str) {
  return str.replace(/\s*$/, '')
}

/**
 * 查询参数转换为key=value形式字符串
 * @param  {Object|Array} params key-value 对象,参数对象
 * @return {String}       key=value[&key=value]形式字符串
 */
export function queryParamsToString(params) {
  if (!params || typeof params !== 'object') {
    return ''
  }
  return Object.keys(params).map(function (k) {
    return k + '=' + (params[k] || '')
  }).join('&')
}

/**
 * 创建一个地址附带查询参数
 * @param  {String} baseUrl 基础地址
 * @param  {Object} params  key-value 对象,选填
 * @return {void}
 */
export function createUrlWithQuery (baseUrl, params) {
  const paramsStr = queryParamsToString(params)
  if (!paramsStr) {
    return baseUrl
  }

  let subStr = ''
    // 没有问号
  if (baseUrl.lastIndexOf('?') === -1) {
    subStr = '?'
  } else {
        // 最后一个字符
    const lastChar = baseUrl.slice(-1)
        // 如果最后接在最后一个字符不是是?并且是&加上一个&
    if (lastChar !== '&' && lastChar !== '?') {
      subStr = '&'
    }
  }

  return baseUrl + subStr + paramsStr
}
