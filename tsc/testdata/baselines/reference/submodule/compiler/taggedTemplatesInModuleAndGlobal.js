//// [tests/cases/compiler/taggedTemplatesInModuleAndGlobal.ts] ////

//// [global.ts]
namespace n {
    function id<T>(x: T): T {
        return x;
    }

    function templateObjectFactory() {
        return id`hello world`;
    }
    let result = templateObjectFactory() === templateObjectFactory();
}
//// [module.ts]
export { }
function id<T>(x: T): T {
    return x;
}

function templateObjectFactory() {
    return id`hello world`;
}
let result = templateObjectFactory() === templateObjectFactory();


//// [global.js]
var n;
(function (n) {
    function id(x) {
        return x;
    }
    function templateObjectFactory() {
        return id `hello world`;
    }
    let result = templateObjectFactory() === templateObjectFactory();
})(n || (n = {}));
//// [module.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function id(x) {
    return x;
}
function templateObjectFactory() {
    return id `hello world`;
}
let result = templateObjectFactory() === templateObjectFactory();
