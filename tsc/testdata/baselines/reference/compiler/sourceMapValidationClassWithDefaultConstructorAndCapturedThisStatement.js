//// [tests/cases/compiler/sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.ts] ////

//// [sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.ts]
class Greeter {
    public a = 10;
    public returnA = () => this.a;
}

//// [sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Greeter {
    constructor() {
        this.a = 10;
        this.returnA = __setFunctionName(() => this.a, "returnA");
    }
}
//# sourceMappingURL=sourceMapValidationClassWithDefaultConstructorAndCapturedThisStatement.js.map