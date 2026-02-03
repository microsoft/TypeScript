//// [tests/cases/compiler/globalIsContextualKeyword.ts] ////

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
    let global = 1;
}
function b() {
    class global {
    }
}
function foo(global) {
}
let obj = {
    global: "123"
};
