//// [tests/cases/compiler/functionsInClassExpressions.ts] ////

//// [functionsInClassExpressions.ts]
let Foo = class {
    constructor() {
        this.bar++;
    }
    bar = 0;
    inc = () => {
        this.bar++;
    }
    m() { return this.bar; }
}

//// [functionsInClassExpressions.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
let Foo = class {
    constructor() {
        this.bar = 0;
        this.inc = __setFunctionName(() => {
            this.bar++;
        }, "inc");
        this.bar++;
    }
    m() { return this.bar; }
};
