/**
 * cookie.js Cookie 存取
 * 
 */


const Cookie = {
    
    set (name, value, options) {
        if (typeof value == "object") {
            options = value;
            value = undefined;
        }
        options = options || {};

        /*把cookie的domain设置到根域名下*/
        var strDomain = document.domain;
        var aryDomain = strDomain.split(".");
        var strRootDomain = strDomain;
        var domainLen = aryDomain.length;

        //域名数组求和,判断是否为ip地址

        var ipSum = aryDomain.reduce(function (preValue, curValue) {
            return preValue + curValue;
        });
        //如果是localhost或者ip地址访问,则不修改domain

        if (strDomain != "localhost" && isNaN(ipSum)) {
            strRootDomain = "." + aryDomain[domainLen - 2] + "." + aryDomain[domainLen - 1];
        }
        // 如果没有主动设置domain,则修改为根域名

        if (typeof options.domain == "undefined") {
            options.domain = strRootDomain;
        }
        if (typeof options.path == "undefined") {
            options.path = "/";
        }
        /*域名修改End*/
        if (typeof value != 'undefined') { // name and value given, set cookie
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';

            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },

    clear () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        aKeys.map(function (item) {
            document.cookie = encodeURIComponent(item) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        });
    }

};

export default Cookie;