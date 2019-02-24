# WebSocket 心跳重连插件
***
### 简介
基于浏览器原生 WebSocket 封装，用于保持 WebSocket 持续连接状态。
***
### 功能说明
ECMA2015
```
import WSR from "ws-reborn"
const wsr = new WSR(options)
```
CommonJS
```
const WSR = require("./ws-reborn.js").default
const wsr = new WSR(options)
```
浏览器环境
```
const wsr = new WSR.default(options)
```
配置参数说明 `options`，采用解构赋值传参，即 `{ url : xxx }`

参数名 | 是否必填 | 类型 | 默认值 | 描述
----|:------:|----|-----|---
url | 是 | String |  | 连接地址
pingTimeout | 否 | Number | 4000ms | 心跳间隔
pongTimeout | 否 | Number | 6000ms | 发送心跳后，等待响应时间，超时后调用原生 close 事件
reconnectInterval | 否 | Number | 3000ms | 重连间隔
pingMsg | 否 | String | Ping! | 心跳文本
print | 否 | Boolean | true | 在控制台打印 log

实例属性及方法

名称 | 类型 | 描述
---|----|---
onopen | Function | 原生事件的包装
onmessage | Function | 原生事件的包装
onerror | Function | 原生事件的包装
onclose | Function | 原生事件的包装
send | Function | 原生事件的包装
close | Function | 关闭连接，手动调用该方法将不再进行重连
times | 属性 | 当前连接次数
***
# 其他
查看 demo
```
npm run serve
```
打包 `ws-reborn.js` 源码
```
npm run bundle
```