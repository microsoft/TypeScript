//// [tests/cases/conformance/dynamicImport/importCallExpressionES5AMD.ts] ////

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
    new Promise(function (resolve_1, reject_1) { require(["./0"], resolve_1, reject_1); });
    var p1 = new Promise(function (resolve_2, reject_2) { require(["./0"], resolve_2, reject_2); });
    p1.then(function (zero) {
        return zero.foo();
    });
    exports.p2 = new Promise(function (resolve_3, reject_3) { require(["./0"], resolve_3, reject_3); });
    function foo() {
        var p2 = new Promise(function (resolve_4, reject_4) { require(["./0"], resolve_4, reject_4); });
    }
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.method = function () {
            var loadAsync = new Promise(function (resolve_5, reject_5) { require(["./0"], resolve_5, reject_5); });
        };
        return C;
    }());
    var D = /** @class */ (function () {
        function D() {
        }
        D.prototype.method = function () {
            var loadAsync = new Promise(function (resolve_6, reject_6) { require(["./0"], resolve_6, reject_6); });
        };
        return D;
    }());
    exports.D = D;
});
