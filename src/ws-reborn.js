/**
 * @description: 打印日志
 * @param {String} msg 打印的内容
 * @param {String} preMsg 前缀内容
 * @param {String} style 样式
 * @param {Boolean} print 是否打印
 * @return: 
 */
function log({ msg, preMsg = `websocket：`, style, print = true }) {
    if (print === true) {
        console.log(`%c${preMsg}${msg}`, `${style}`)
    }
}

//  全局保存 this
let _me;

/**
 * @description: 
 * @param {String} url 连接地址
 * @param {Number} pingTimeout 心跳间隔
 * @param {Number} pongTimeout 等待响应时间，超时后调用原生 close 事件
 * @param {Number} reconnectInterval 重连间隔
 * @param {String} pingMsg 心跳文本
 * @param {Boolean} print 打印 log
 * @return: 
 */
function Foo({ url, pingTimeout = 4000, pongTimeout = 6000, reconnectInterval = 3000, pingMsg = "Ping!", print = true }) {
    _me = this;
    _me.opts = { url, pingTimeout, pongTimeout, reconnectInterval, pingMsg, print }

    //  连接次数
    _me.times = 0
    
    //  比如实例化后未定义 onopen 方法，_me.onopen 会报错，因此提前全部覆盖一下
    this.onopen = () => { };
    this.onmessage = () => { };
    this.onclose = () => { };
    this.onerror = () => { };

    //  实例化时建立连接
    createConnect()
}

//  初始化，让原生 onopen 能够触发实例 onopen
function init() {
    _me.ws.onopen = () => {
        log({ msg: '已经连接', print: _me.opts.print })
        _me.onopen()
        //  建立连接后开始心跳监控
        heartCheck()
    }
    _me.ws.onmessage = (res) => {
        log({ msg: `<<=== Pong`, print: _me.opts.print })
        _me.onmessage(res)
        //  收到信息后开始心跳监控
        heartCheck()
    }
    _me.ws.onerror = () => {
        _me.onerror()
    }
    _me.ws.onclose = () => {
        log({ msg: '连接已关闭', print: _me.opts.print })
        console.groupEnd()
        _me.onclose()

        //  如果手动关闭则跳出，反之重连
        if (_me.stopConnect === true) return;
        clearTimeout(_me.connectID)
        _me.connectID = setTimeout(createConnect, _me.opts.reconnectInterval)
    }
}

Foo.prototype.send = function (e) {
    _me.ws.send(e)
}

Foo.prototype.close = function () {
    //  停止重连标识
    _me.stopConnect = true;
    _me.ws.close()
}

//  建立连接
function createConnect() {
    _me.ws = new WebSocket(_me.opts.url)
    _me.times++
    console.group("Websocket")
    log({ msg: '正在连接...', print: _me.opts.print })
    log({ msg: `当前为第 ${_me.times} 次连接`, print: _me.opts.print })
    init()
}

//  发送心跳检测，间隔 _me.opts.pingTimeout
function sendHeartCheck() {
    return new Promise((resolve, reject) => {
        _me.pingID = setTimeout(() => {
            _me.ws.send(_me.opts.pingMsg)
            log({ msg: `===>> ${_me.opts.pingMsg} - 心跳间隔 ${_me.opts.pingTimeout}ms`, print: _me.opts.print })
            resolve()
        }, _me.opts.pingTimeout)
    })
}

//  等待响应 - 准备重连，发送心跳检测信息后，_me.opts.pongTimeout 收不到信息就调用 close 方法
function waitingForResponse() {
    return new Promise((resolve, reject) => {
        _me.pongID = setTimeout(() => {
            log({ msg: `${_me.opts.pongTimeout}ms 未收到响应，等待重连...`, print: _me.opts.print })
            //  只需触发 close 事件，重连行为在原生 onclose 上
            _me.ws.close()
            resolve()
        }, _me.opts.pongTimeout)
    })
}

//  心跳监控，每次触发前先重置
function heartCheck() {
    clearTimeout(_me.pingID)
    clearTimeout(_me.pongID)
    //  发送
    sendHeartCheck().then(function () {
        //  等待
        waitingForResponse()
    })
}

export default Foo