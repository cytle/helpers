import window from "./window"

const query = function (name) {
    var url = window.location.href;
    var values = url.match(new RegExp("[(\?)|(\&)]" + name + "\=[^\?\&\\\/\#]*", "g"));
    var value = "";
    if (values) {
        var val = "";
        if (values.length === 1) {
            val = values[0] || "";
            value = val.split("=")[1]
        } else if (values.length > 1) {   // 有多个值 就返回第二个
            val = values[values.length - 1] || "";
            value = val.split("=")[1]
        }
    }
    return value || ""
};

export default query
