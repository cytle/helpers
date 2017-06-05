/**
 * sessionStorage 存取
 *
 */

import Type   from './type';
import Window from './window';

const { isArray , isString , isJson ,  toJson } = Type;

const sessionStorage = {
    // 入参 可以是 { key , val } 或者 name, val
    set( name , val ) {
        if ( isJson(name) ) {
            let obj = name;
            for( let key in obj ) {
                this.setItem( key , obj[key] );
            }
        }
        if ( isString(name) ) {
            this.setItem( name , val );
        }
    },

    // 入参 可以是 string , array
    // 返回 string => staing , array => { key : val }
    get ( a ) {

        if( isString(a) ){
            return this.getItem(a).val;
        }

        if ( isArray(a) ){
            return this.getArray(a);
        }

        return null;
    },

    getArray( arr ) {
        var res = {};
        arr.forEach(n => res[n] = this.queryString(n));
        return res;
    },

    // 入参  name, val
    setItem (name, value) {
        if( isString( name ) ){
            value = isJson(value) ? JSON.stringify(value) : value;
            this.sg.setItem(name, value);
        }
    },

    // 返回 { key, val }
    //      key :  name
    //      val :  null 没有此参数 ， "" 参数为空值
    getItem( name ) {
        var key = name;
        var type = null;

        // 检测是否 有类型转换标志
        if ( key.indexOf(':') > 0 ) {
            var a = key.split(':');
            key  = a[0];
            type = a[1];
        }

        var val = this.sg.getItem( key ) || null;

        if ( type != null ) {
            switch ( type ) {
                case 'int' :
                    var num = parseInt( val);
                    val = isNaN(num) ? null : num;
                    break;
                case 'json' :
                    var val = toJson( val );
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

    clear () {
        this.sg.clear();
    }

};
sessionStorage.sg = Window.sessionStorage;

export default sessionStorage;
