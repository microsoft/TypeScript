//// [tests/cases/conformance/es2018/dynamicImport/importCallExpressionES5UMD.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
import("./0");
var p1 = import("./0");
p1.then(zero => {
    return zero.foo();
});

function foo() {
    const p2 = import("./0");
}

//// [0.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function foo() { return "foo"; }
    exports.foo = foo;
});
//// [1.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    var __resolved = new Promise(function (resolve) { resolve(); });
    __syncRequire ? __resolved.then(function () { return require("./0"); }) : new Promise(function (_a, _b) { require(["./0"], _a, _b); });
    var p1 = __syncRequire ? __resolved.then(function () { return require("./0"); }) : new Promise(function (_a, _b) { require(["./0"], _a, _b); });
    p1.then(function (zero) {
        return zero.foo();
    });
    function foo() {
        var p2 = __syncRequire ? __resolved.then(function () { return require("./0"); }) : new Promise(function (_a, _b) { require(["./0"], _a, _b); });
    }
});
