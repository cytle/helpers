# 通用工具库


## 目录说明

```
    src             开发目录
    dist            静态js引用目录
    
```

## 引用说明

```
    示例: import Utils from "@2dfire/utils"                       引用所有工具                 打包 utils 所有文件进来
    示例: import { Type, Fetch } from "@2dfire/utils"             引用type 和 fetch           打包 utils 所有文件进来
    示例: import Type from "@2dfire/utils/type"                   引用type                    只会打包 type.js进来

    "utils/type.js"         格式判断和转换相关工具
    

```

## 内容说明

```
    + "utils/type.js"                                       格式判断和转换相关工具
    + "utils/fetch.js"                                      ajax请求相关工具
    + "utils/format.js"                                     格式化相关工具
        - clone                                                   克隆
        - date                                                    日期格式化
        - params                                                  ajax params 格式化

```

## 需要导出小程序的模块

```
    "utils/fetch.js"                                 
    "utils/localStorage.js"                          
    "utils/sessionStorage.js"                        
    "utils/cookie.js"                        
    "utils/query.js"                        
    "utils/redirect.js"                        
    "utils/window.js"                        

```