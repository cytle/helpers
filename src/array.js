/**
 * 判断是否是数组
 * @param  {Any}  v
 * @return {Boolean}   true表示是数组,false表示不是
 */
export function isArray(v) {
    return toString.apply(v) === '[object Array]';
}


export function arrayUnique(arr) {
    return Array.from(new Set(arr));
}
