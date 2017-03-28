//// [tests/cases/conformance/es2018/dynamicImport/importCallExpressionInUMD1.ts] ////

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
    require.length === 1 ? Promise.resolve().then(() => require("./0")) : new Promise(resolve => require(["./0"], resolve));
    var p1 = require.length === 1 ? Promise.resolve().then(() => require("./0")) : new Promise(resolve => require(["./0"], resolve));
    p1.then(zero => {
        return zero.foo();
    });
    function foo() {
        const p2 = require.length === 1 ? Promise.resolve().then(() => require("./0")) : new Promise(resolve => require(["./0"], resolve));
    }
});
