/**
 * sessionStorage 存取
 *
 */

import Window from './window';

const cookie = {
    get: function (name) {
        var arr = this.ck.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return decodeURI(arr[2]);
        }
        return "";
    }
};

cookie.ck = window.document.cookie;

export default cookie;
