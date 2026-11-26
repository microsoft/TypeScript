//// [tests/cases/compiler/contextualTyping15.ts] ////

//// [contextualTyping15.ts]
class foo { public bar: { (): number; (i: number): number; } = function() { return 1 }; }

//// [contextualTyping15.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class foo {
    constructor() {
        this.bar = __setFunctionName(function () { return 1; }, "bar");
    }
}
