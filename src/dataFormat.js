import { isArray, objectMap } from './type';

/**
 * 产生一个转换数组的方法
 * eg:
 * const demoFormat = formatArray(type.int);
 * demoFormat('1', null) // [1, NaN]
 *
 * @param  {Object} itemFormat 转换规则
 * @return {function}         转换方法
 */
export function formatArray(itemFormat) {
    if (!itemFormat) {
        return function (data) {
            if (isArray(data)) {
                return data;
            }
            return [];
        };
    }
    return function (data) {
        if (isArray(data)) {
            return data.map(itemFormat);
        }
        return [];
    };
}

/**
 * 产生一个转换对象的方法, 如果字段有itemFormat(转换规则对象), 会默认返回对应类型默认值,
 * 如:
 *      type.int 返回NaN
 *      type.string 返回'',空字符串
 * eg:
 * const demoFormat = formatObj({
 *          key: type.int,
 *          key2: formatObj({
 *              key3: type.string
 *          })
 *      });
 * demoFormat({
 *      key: '12',
 *      key2: {}
 * }) // { key: 12, key2: null }
 *
 * @param  {Object} objFormat 转换规则对象
 * @return {function}        转换方法
 */
export function formatObj(objFormat) {
    if (!objFormat) {
        return function (data) {
            if (data) {
                return data;
            }
            return [];
        };
    }
    return function (data) {
        if (data) {
            // 遍历objFormat
            return objectMap(
                objFormat,
                function (itemFormat, key) {
                    // 执行itemFormat
                    return itemFormat.call(null, data[key]);
                }
            );
        }
        return {};
    };
}

export const formatType = {
    /**
     * 转换数字为整形
     * @param  {Number} data 需要转换的数字
     * @return {Number}      转为整形后的数字,如果没有入参返回 ""
     */
    int: data => parseInt(data, 10) || 0,

    /**
     * 转换为字符串
     * @param  {String} data 需要转换的字符串
     * @return {String}      如果没有入参返回'',空字符串
     */
    string: (data = '') => data ? '' + data : '',

    /**
     * 转换为布尔类型
     * @param  {Number|String|Boolean|...} data 需要转换数据
     * @return {Boolean}                        如果没有入参返回false
     */
    boolean: (data = false) => !!data
};

export default {
    formatType,
    formatObj,
    formatArray
};
