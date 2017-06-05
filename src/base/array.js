/**
 * 数组去重
 * @param  {Array}   arr
 * @return {Array}   去重后数组
 */
export function arrayUnique (arr) {
    return Array.from(new Set(arr));
}
