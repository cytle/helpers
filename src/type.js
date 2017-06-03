/**
 * 类型判断
 *
 */

export function isArray(v){
    return toString.apply(v) === '[object Array]';
}

export function isString(v){
    return typeof(v) == "string";
}

export function isJson(obj){
    return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
}

export function isFunction (o) {
    return typeof o === 'function';
}


/**
 * 类型转换
 *
 */
function toJson(v){
    try {
        var json = JSON.parse(v) || {};
        return json;
    } catch(e){
        return {};
    }

}

function toStr( v ){
    if ( toJson(v) ) {
        return JSON.stringify(v);
    }
    return '';
}

function toInt( v ){
    let num = parseInt(v);
    return isNaN( num ) ? 0 : num;
}

function toIntBool( v ){
    let bool = v;
    if ( typeof(v) == 'string'){
        bool = toInt(v);
    }
    return bool ? 1 : 0;
}

export function joinJson( obj , t ){
    let a = [];
    for (let key in obj ) {
        a.push(key + '=' + obj[key]);
    }
    let m = t || '&';
    return a.join(m);
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

export default {
    isArray         : isArray,
    isString        : isString,
    isJson          : isJson,
    isFunction      : isFunction,

    toJson          : toJson,
    toInt           : toInt,
    toIntBool       : toIntBool,
    toStr           : toStr,

    objectForEach   : objectForEach,
    joinJson        : joinJson
};
