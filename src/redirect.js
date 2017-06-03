/**
 * location.js
 *
 */
import Window from './window';
import { isJson, joinJson }   from './type';

const getUrl = (page, ops) => {
    let arg = isJson(ops) ? ops : {};
    arg.t = 'grunt_page_time'; // 增加 时间搓

    const join_pre = page.indexOf('?') ? '?' : '&';
    const join_arg = joinJson(arg);

    return page + join_pre + join_arg;
};

const Location = {
    getUrl: getUrl,
    jump (page, ops, wait = 0) {
        setTimeout(function () {
            Window.location.href = getUrl(page, ops);
        }, wait);
    },

    replace (page, ops, wait = 0) {
        setTimeout(function () {
            Window.location.replace(getUrl(page, ops));
        }, wait);
    }
};

export default Location;
