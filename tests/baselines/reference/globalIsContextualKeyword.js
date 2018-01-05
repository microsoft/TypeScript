//// [globalIsContextualKeyword.ts]
function a() {
    let global = 1;
}
function b() {
    class global {}
}

namespace global {
}

function foo(global: number) {
}

let obj = {
    global: "123"
}

//// [globalIsContextualKeyword.js]
function a() {
    var global = 1;
}
function b() {
    var global = /** @class */ (function () {
        function global() {
        }
        return global;
    }());
}
function foo(global) {
}
var obj = {
    global: "123"
};
