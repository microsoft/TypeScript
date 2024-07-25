//// [tests/cases/conformance/dynamicImport/importCallExpressionES6AMD.ts] ////

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

class C {
    method() {
        const loadAsync = import ("./0");
    }
}

export class D {
    method() {
        const loadAsync = import ("./0");
    }
}

//// [0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = foo;
    function foo() { return "foo"; }
});
//// [1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.D = exports.p2 = void 0;
    new Promise((resolve_1, reject_1) => { require(["./0"], resolve_1, reject_1); });
    var p1 = new Promise((resolve_2, reject_2) => { require(["./0"], resolve_2, reject_2); });
    p1.then(zero => {
        return zero.foo();
    });
    exports.p2 = new Promise((resolve_3, reject_3) => { require(["./0"], resolve_3, reject_3); });
    function foo() {
        const p2 = new Promise((resolve_4, reject_4) => { require(["./0"], resolve_4, reject_4); });
    }
    class C {
        method() {
            const loadAsync = new Promise((resolve_5, reject_5) => { require(["./0"], resolve_5, reject_5); });
        }
    }
    class D {
        method() {
            const loadAsync = new Promise((resolve_6, reject_6) => { require(["./0"], resolve_6, reject_6); });
        }
    }
    exports.D = D;
});
