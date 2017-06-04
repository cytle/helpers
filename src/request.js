import {isFunction} from 'src/function';
import {objectAssign} from 'src/object';
import Promise from 'promise';

/**
 * 上一次请求序号
 * @type {Number}
 */
let lastRequestIndex = 0;

/**
 * 请求是否取消集合
 * 如:{ 1: true },表示序号为1的请求已经被取消,success或error回调会被跳过,而promise将被
 * 拒绝,并且reason为{ isCancled: true }.如果回调已经结束则取消没有意义.
 * @type {Object}
 */
const requestsCancle = {};

/**
 * 创建一个promiseRequest
 * @param  {Function} request 请求方法,实现jquery.ajax形式请求,wx.request是被允许的.
 * @return {Function}         请求方法,执行后返回Promise来反应结果.
 */
export function createPromiseRequest(request) {
    return (options = {}) => {
        const requestIndex = ++lastRequestIndex;
        requestsCancle[requestIndex] = false;
        const promise = new Promise((resolve, reject) => {
            request(objectAssign({}, options, {
                url: options.url,
                success(...args) {
                    if (requestsCancle[requestIndex]) {
                        return reject({isCancled: true});
                    }
                    if (isFunction(options.success)) {
                        options.success.apply(this, args);
                    }
                    resolve(...args);
                },
                error(...args) {
                    if (requestsCancle[requestIndex]) {
                        return reject({isCancled: true});
                    }
                    if (isFunction(options.error)) {
                        options.error.apply(this, args);
                    }
                    resolve(...args);
                }
            }));
        });
        return promise;
    };
}

/**
 * 返回最后一次请求的序号
 * @return {Number}
 */
export function getLastRequstIndex() {
    return lastRequestIndex;
}

/**
 * 取消请求
 * @param  {Number} requestIndex 需求取消的请求序号
 * @return {Void}
 */
export function cancleRequest(requestIndex) {
    if (requestIndex in requestsCancle) {
        requestsCancle[requestIndex] = true;
    }
}

/**
 * 取消上一次请求
 * @return {Void}
 */
export function cancleLastRequest() {
    cancleRequest(getLastRequstIndex());
}
