//// [tests/cases/conformance/es2018/dynamicImport/importCallExpressionInAMD1.ts] ////

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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function foo() { return "foo"; }
    exports.foo = foo;
});
//// [1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    new Promise(resolve => require(["./0"], resolve));
    var p1 = new Promise(resolve => require(["./0"], resolve));
    p1.then(zero => {
        return zero.foo();
    });
    function foo() {
        const p2 = new Promise(resolve => require(["./0"], resolve));
    }
});
