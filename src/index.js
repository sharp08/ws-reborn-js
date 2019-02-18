// import ws_import from "./ws-reborn.js"

// new ws_import({
//     url: "ws://123.207.167.163:9010/ajaxchattest"
// })

const ws_require = require("./ws-reborn.js")

new ws_require.default({
    url: "ws://123.207.167.163:9010/ajaxchattest"
})


function foo() {
    const ele = document.createElement("div");
    ele.innerHTML = "请打开控制台"
    document.querySelector('body').appendChild(ele)
}

foo()
