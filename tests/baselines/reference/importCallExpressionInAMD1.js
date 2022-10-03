//// [tests/cases/conformance/dynamicImport/importCallExpressionInAMD1.ts] ////

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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = void 0;
    function foo() { return "foo"; }
    exports.foo = foo;
});
//// [1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.p2 = void 0;
    new Promise((resolve_1, reject_1) => { require(["./0"], resolve_1, reject_1); });
    var p1 = new Promise((resolve_2, reject_2) => { require(["./0"], resolve_2, reject_2); });
    p1.then(zero => {
        return zero.foo();
    });
    exports.p2 = new Promise((resolve_3, reject_3) => { require(["./0"], resolve_3, reject_3); });
    function foo() {
        const p2 = new Promise((resolve_4, reject_4) => { require(["./0"], resolve_4, reject_4); });
    }
});
