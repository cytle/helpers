import objectAssign from 'object-assign';

export {
    objectAssign
};

/**
 * 判断是否是简单对象
 * @param  {Any}  v
 * @return {Boolean}   true表示是,false表示不是
 */
export function isPlainObject (obj) {
    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }

    const proto = Object.getPrototypeOf(obj);

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
        return true;
    }
    const hasOwn = Object.prototype.hasOwnProperty;

    // Objects with prototype are plain iff they were constructed by a global Object function
    const Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}

export function isEmptyObject (obj) {
    for (const name in obj) {
        return false;
    }
    return true;
}

/**
 * 判断是否是数组
 * @param  {Any}  v
 * @return {Boolean}   true表示是,false表示不是
 */
export function isArray (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
}

if (!Array.isArray) {
    Array.isArray = isArray;
}

/**
 * 判断是否是方法
 * @param  {Any}  v
 * @return {Boolean}   true表示是方法,false表示不是
 */
export function isFunction (v) {
    return typeof v === 'function';
}

/**
 * 判断是否是字符串
 * @param  {Any}  v
 * @return {Boolean}   true表示是字符串,false表示不是
 */
export function isString (v) {
    return typeof v === 'string';
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
export function objectMap (obj, cb) {
    const hasOwn = Object.prototype.hasOwnProperty;
    const newObj = {};
    for (const index in obj) {
        if (hasOwn.call(obj, index)) {
            newObj[index] = cb.call(obj, obj[index], index, obj);
        }
    }
    return newObj;
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
export function objectForEach (obj, cb) {
    const hasOwn = Object.prototype.hasOwnProperty;
    for (const index in obj) {
        if (hasOwn.call(obj, index)) {
            cb.call(obj, obj[index], index, obj);
        }
    }
}
