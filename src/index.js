// import ws_import from "./ws-reborn.js"

// new ws_import({
//     url: "ws://123.207.167.163:9010/ajaxchattest"
// })

const WSR = require("./ws-reborn.js").default

const wsr = new WSR({
    url: "ws://123.207.167.163:9010/ajaxchattest"
})

function foo() {
    const body = document.querySelector("body")
    const ele = document.createElement("div");
    ele.innerHTML = "Please open the console"
    body.appendChild(ele)

    const btn = document.createElement("button")
    btn.innerHTML = "Print connection times"
    btn.onclick = function () {
        console.log(wsr)
    }
    body.append(btn)
}

foo()
