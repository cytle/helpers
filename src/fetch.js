/**
 * Created by hupo
 * on 16/10/11.
 *
 * node依赖 :   依赖于 zepto $.ajax 后期可以考虑把 zepto 的ajax 单独打包出来 封装成模块 或使用其他更干净的ajax npm 模块
 * 本地依赖  :   track.js base.js baseStorage.js
 *
 *  option = {
 *      url: "",                     (必选)
 *      type: "get",
 *      success: callback,           (必选)
 *      error: callback,
 *      isShowLoading: true,         加载动画/统计相关  isShowLoading true/静默调用  false 不调用
 *      params: {},                  请求参数 json格式 会被加入url中
 *      data: {},                    post 请求的 data json格式
 *      beforeSend: callback,
 *      warnMessage: "",
 *      infoMessage: "",
 *      errorMessage: "",
 *      contentType: "",             Content-Type
 *      withoutCookie: false,        Sending cookies 默认发送cookie 只有当 options.withoutCookie == true 时,可以不发送cookie
 *      timeout: "15000"             node-fetch 特性  不确定是否生效 待测试
 *      tempData                     其他临时数据, 主要用于ajax回调使用
 *  }
 *
 */

import window from './window';
import ajax from './ajax';
import format from './format';
import query from './query';

class FireFetch {
    constructor(options) {
        if (typeof options !== "object") {
            throw new Error("options must's object");
        }
        this.type = "get";
        this.timeout = 15000;
        this.isShowLoading = true;
        this.beforeSend = undefined;
        this.url = options.url;
        this.reload = options.reload;
        this.success = options.success;
        this.complete = options.complete;
        this.error = options.error;
        this.contentType = "application/x-www-form-urlencoded;application/json;charset=utf-8;";
        this.xhrFields = {
            withCredentials: true
        };
        // 其他
        this.warnMessage = options.warnMessage;
        this.infoMessage = options.infoMessage;
        this.errorMessage = options.errorMessage;
        // 统计相关

        this.url = format.params(this.url, options.params);

        if (options.type != undefined) {
            this.type = options.type;
        }

        if (options.contentType) {
            this.contentType = options.contentType;
        }

        if (options.data) {
            if (this.method == "get") {
                throw new Error("GET method can't send data, please modify 'data' to 'params' or use POST");
            }
            this.data = options.data;
        }

        if (options.withoutCookie) {
            this.xhrFields.withCredentials = false;
        }

        if (options.beforeSend) {
            this.beforeSend = options.beforeSend;
        }

        if (options.timeout !== undefined) {
            this.timeout = options.timeout;
        }
        if (options.showLoading !== undefined) {
            this.isShowLoading = options.showLoading;
        }
        if (options.tempData) {
            this.tempData = format.clone(options.tempData);
        }
    }

    successHandler(response, resolve, reject) {
        if (this.isShowLoading) {
            window.globalBasePage.stopLoading();
        }

        if (response.code == 2001) {
            window.location.href = "../page/blacklist.html?t=grunt_page_time";
            return false;
        }

        if (response.code == -1 || response.code == undefined) {
            if (response.code == -1) {
                //重新授权前需要清理cookie数据
                cookie.reset();
                window.globalBasePage.showInfo(window.globalBasePage.type.sessionOut);
            } else {
                if (this.isShowLoading !== false) {
                    this.globalErrorHandler();  // todo hupo 查看原来的ajax逻辑 为何只在这里处理 error
                }
            }
            if (this.error) {
                this.error(response);
            }
            if (window.DFAnalytics) {
                // 新统计相关
                var params = {
                    api: this.url,
                    code: response.code || "",
                    message: response.message || ""
                };
                window.DFAnalytics.fire("Er", "apiEr", params);
            }
            reject(response);
        } else {
            //每次接口返回了成功，就延长指定的cookie1Day
            cookie.postPoneAll();
            if (this.success) {
                if (!response.data) {
                    response.data = {};
                }
                this.success(response);
            }
            resolve(response);
        }
    }

    errorHandler(response) {
        if (this.isShowLoading) {
            window.globalBasePage.stopLoading();
            this.globalErrorHandler();
        }

        if (this.error) {
            this.error(response);
        }

        if (window.DFAnalytics) {
            // 新统计相关
            var params = {
                api: this.url,
                code: response.code || "",
                message: response.message || ""
            };
            window.DFAnalytics.fire("Er", "apiEr", params);
        }
    }

    // 全局的请求出错处理  (这部分不是很清楚 直接copy http.js原来的代码)
    globalErrorHandler() {
        if (this.reload) {                                           //是否重载
            window.globalBasePage.showInfo(window.globalBasePage.type.error, {
                errorMessage: this.errorMessage,
                reload: this.reload
            });
        } else if (this.warnMessage) {
            window.globalBasePage.showInfo(window.globalBasePage.type.warn, {warnMessage: this.warnMessage});
        } else if (this.infoMessage) {
            window.globalBasePage.showInfo(window.globalBasePage.type.info, {infoMessage: this.infoMessage});
        }
    }

    // 统计/token/时间戳/定位信息/灰度  (参考原 http.js 原来的代码)
    otherInit() {
        var params = {
            xtoken: cookie.getToken(),
            t: new Date().getTime(),
            g_entityId: cookie.getEntityId()
        };

        var gpsInfo = localInfo.getGPSInfo();   //获取地理位置定位数据
        if (gpsInfo) {
            params["loc"] = gpsInfo;
        }

        format.params(this.url, params);
    }

    doFetch() {
        var self = this;
        if (self.isShowLoading) {
            window.globalBasePage.startLoading({content: ""});
        }

        self.otherInit();

        var promise = new Promise(function (resolve, reject) {
            ajax({
                type: self.type,
                url: self.url,
                dataType: 'json',
                crossDomain: true,
                data: self.data,
                timeout: self.timeout,
                contentType: self.contentType,
                xhrFields: self.xhrFields,
                beforeSend: function () {
                    if (self.beforeSend) {
                        self.beforeSend();
                    }
                },
                success: function (data) {
                    self.successHandler(data, resolve, reject);
                },
                complete: function () {
                    if (self.complete) {
                        self.complete();
                    }
                },
                error: function (xhr, type, error) {
                    var resp = {
                        xhr: xhr,
                        type: type,
                        error: error
                    };
                    console.log("ajax error: ", resp);
                    self.errorHandler(resp);
                    reject(resp);
                }
            });
        });
        return promise.then(function (resp) {
            resp.fetchStatus = true;
            return resp;
        }, function (resp) {
            resp.fetchStatus = false;
            return resp;
        });
    }
}

var dFireFetch = function (options) {
    if (!options.params) {
        options.params = {};
    }
    options.params.xtoken = cookie.getToken() || query('token');
    var dfFetch = new FireFetch(options);
    return dfFetch.doFetch();
};

export default {
    FireFetch: FireFetch,           // 类
    dFireFetch: dFireFetch          // 实例
};