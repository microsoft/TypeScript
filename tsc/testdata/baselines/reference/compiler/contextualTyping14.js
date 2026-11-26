//// [tests/cases/compiler/contextualTyping14.ts] ////

//// [contextualTyping14.ts]
class foo { public bar:(a:number)=>number = function(a){return a}; }

//// [contextualTyping14.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class foo {
    constructor() {
        this.bar = __setFunctionName(function (a) { return a; }, "bar");
    }
}
