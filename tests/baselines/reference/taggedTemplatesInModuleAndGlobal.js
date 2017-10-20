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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var n;
(function (n) {
    function id(x) {
        return x;
    }
    function templateObjectFactory() {
        return id(__makeTemplateObject(["hello world"], ["hello world"]));
    }
    var result = templateObjectFactory() === templateObjectFactory();
})(n || (n = {}));
//// [module.js]
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
function id(x) {
    return x;
}
function templateObjectFactory() {
    return id(templateObject_1 || (templateObject_1 = __makeTemplateObject(["hello world"], ["hello world"])));
}
var result = templateObjectFactory() === templateObjectFactory();
var templateObject_1;
