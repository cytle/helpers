import objectAssign from 'object-assign'

export {
    objectAssign
}

/**
 * 判断是否是对象(除数组)
 * @param  {Any}  v
 * @return {Boolean}   true表示是,false表示不是
 */
export function isEnumObject(v) {
  return toString.apply(v) === '[object Object]'
}

/**
 * 对象map方法
 * @param  {Object}   obj
 * @param  {Function} cb  原数组中的元素经过该方法后返回一个新的元素。
 *      currentValue
 *          callback 的第一个参数，数组中当前被传递的元素。
 *      index
 *          callback 的第二个参数，数组中当前被传递的元素的索引。
 *      obj
 *          callback 的第三个参数，调用 map 方法的对象。
 * @return {Object}
 */
export function objectMap(obj, cb) {
  const hasOwn = Object.prototype.hasOwnProperty
  const newObj = {}
  for (const index in obj) {
    if (hasOwn.call(obj, index)) {
      newObj[index] = cb.call(obj, obj[index], index, obj)
    }
  }
  return newObj
}

/**
 * 对象forEach方法
 * @param  {Object}   obj
 * @param  {Function} cb  原数组中的元素经过该方法后返回一个新的元素。
 *      currentValue
 *          callback 的第一个参数，数组中当前被传递的元素。
 *      index
 *          callback 的第二个参数，数组中当前被传递的元素的索引。
 *      obj
 *          callback 的第三个参数，调用 map 方法的对象。
 * @return {Void}
 */
export function objectForEach(obj, cb) {
  const hasOwn = Object.prototype.hasOwnProperty
  for (const index in obj) {
    if (hasOwn.call(obj, index)) {
      cb.call(obj, obj[index], index, obj)
    }
  }
}
