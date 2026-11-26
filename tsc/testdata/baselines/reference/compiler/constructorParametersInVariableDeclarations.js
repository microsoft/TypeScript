//// [tests/cases/compiler/constructorParametersInVariableDeclarations.ts] ////

//// [constructorParametersInVariableDeclarations.ts]
class A {
    private a = x;
    private b = { p: x };
    private c = () => x;
    constructor(x: number) {
    }
}

class B {
    private a = x;
    private b = { p: x };
    private c = () => x;
    constructor() {
        var x = 1;
    }
}

//// [constructorParametersInVariableDeclarations.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class A {
    constructor(x) {
        this.a = x;
        this.b = { p: x };
        this.c = __setFunctionName(() => x, "c");
    }
}
class B {
    constructor() {
        this.a = x;
        this.b = { p: x };
        this.c = __setFunctionName(() => x, "c");
        var x = 1;
    }
}
