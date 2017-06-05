import * as array from './base/array';
import * as string from './base/string';
import * as date from './base/date';
import * as object from './base/object';
import * as localStorage from 'platform/localStorage';
import * as sessionStorage from 'platform/sessionStorage';
import * as cookie from 'platform/cookie';
import * as location from 'platform/location';

module.exports = {
    array,
    string,
    date,
    object,
    localStorage,
    sessionStorage,
    cookie,
    location
};

module.exports.default = module.exports;
