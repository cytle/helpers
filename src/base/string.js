
/**
 * 清除字符串两边空格
 * @param  {String} str
 * @return {String}
 */
export function stringTrim (str) {
    return str.replace(/^\s*|\s*$/g, '');
}

/**
 * 清除字符串左边空格
 * @param  {String} str
 * @return {String}
 */
export function stringTrimLeft (str) {
    return str.replace(/^\s*/, '');
}

/**
 * 清除字符串右边空格
 * @param  {String} str
 * @return {String}
 */
export function stringTrimRight (str) {
    return str.replace(/\s*$/, '');
}
