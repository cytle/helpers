
// 时间格式处理
function date (time, format) {
    var o = {
        "M+": time.getMonth() + 1,
        "D+": time.getDate(),
        "h+": time.getHours(),
        "m+": time.getMinutes(),
        "s+": time.getSeconds(),
        "q+": Math.floor((time.getMonth() + 3) / 3),
        "S": time.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (time.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

function params(url, params) {
    if (params != undefined && Object.keys(params).length > 0) {
        if (url.indexOf("?") > -1) {
            url += "&";
        } else {
            url += "?";
        }

        for (var k in params) {
            if (params.hasOwnProperty(k)) {
                url = url + k + "=" + encodeURIComponent(params[k]) + "&";
            }
        }
        if (url[url.length - 1] === "&") {
            url = url.slice(0, -1);
        }
    }
    return url;
}

function clone(o) {
    var k, ret = o, b;
    if (o && ((b = (o instanceof Array)) || o instanceof Object)) {
        ret = b ? [] : {};
        for (k in o) {
            if (o.hasOwnProperty(k)) {
                ret[k] = clone(o[k]);
            }
        }
    }
    return ret;
}


export default {
    clone,
    date,
    params,
};
