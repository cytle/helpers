import location from 'platform/location';
import qs from 'query-string';
import { createUrl } from 'url';

/**
 * 地址转跳
 * @param  {String} baseUrl 跳转地址
 * @param  {Object} params key-value 对象,选填
 * @return {void}
 */
export function navigateTo (baseUrl, params = {}) {
    location.navigateTo(createUrl(baseUrl, params));
}

/**
 * 地址转跳,replace形式
 * @param  {String} baseUrl 跳转地址
 * @param  {Object} params key-value 对象,选填
 * @return {void}
 */
export function redirectTo (baseUrl, params = {}) {
    location.redirectTo(createUrl(baseUrl, params));
}

export const navigateBack = location.navigateBack;

// route
let oldSearch;
let oldQuery;
export const route = {
    get search () {
        return location.search;
    },
    get query () {
        const search = this.search;
        if (oldSearch && oldSearch === search) {
            return oldQuery;
        }
        oldSearch = search;
        oldQuery = qs.stringify(location.search);
        return oldQuery;
    }
};
