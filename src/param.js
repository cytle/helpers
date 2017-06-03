/**
 * param.js 请求参数相关的 util
 * 
 */

import Type  from './type';
import Window from './window';

const { isArray , isString } = Type;

const Param = {

    query (a) {
        if( isString(a) ){
            return this.queryString(a).val;
        }

        if ( isArray(a) ){
            return this.queryArray(a);
        }

        return null;
    },

    queryArray (arr) {
        var res   = {};
        var self = this;
        arr.map(function(n){
            var s = self.queryString(n);
            res[s.key] = s.val;
        });
        return res;
    },

    // 返回 { key, val }
    //      key :  name
    //      val :  null 没有此参数 ， "" 参数为空值
    queryString (name) {
        var key = name;
        var type = null;

        // 检测是否 有类型转换标志
        if ( key.indexOf(':') > 0 ) {
            var a = key.split(':');
            key = a[0];
            type = a[1];
        }

        // url 中获取数据
        var sValue = Window.location.search.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
        var val =  sValue ? this.decodingUrl(sValue[1]) : null;

        if ( type != null ) {
            switch ( type ) {
            case 'int' :
                var int = parseInt( val);
                val = isNaN(int) ? null : int;
                break;
                break;
            default : break; 
            }
        }

        var res = {
            key : key,
            val : val
        };

        return res;
    },

    // 过滤 url 
    decodingUrl (params) {
        if (params) {
            return unescape(decodeURI(decodeURI(params)));
        } else {
            return "";
        }
    },

};

export default Param;