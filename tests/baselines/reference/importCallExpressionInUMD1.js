//// [tests/cases/conformance/dynamicImport/importCallExpressionInUMD1.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
import("./0");
var p1 = import("./0");
p1.then(zero => {
    return zero.foo();
});

export var p2 = import("./0");

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
    exports.foo = foo;
    function foo() { return "foo"; }
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.p2 = void 0;
    __syncRequire ? Promise.resolve().then(() => require("./0")) : new Promise((resolve_1, reject_1) => { require(["./0"], resolve_1, reject_1); });
    var p1 = __syncRequire ? Promise.resolve().then(() => require("./0")) : new Promise((resolve_2, reject_2) => { require(["./0"], resolve_2, reject_2); });
    p1.then(zero => {
        return zero.foo();
    });
    exports.p2 = __syncRequire ? Promise.resolve().then(() => require("./0")) : new Promise((resolve_3, reject_3) => { require(["./0"], resolve_3, reject_3); });
    function foo() {
        const p2 = __syncRequire ? Promise.resolve().then(() => require("./0")) : new Promise((resolve_4, reject_4) => { require(["./0"], resolve_4, reject_4); });
    }
});
