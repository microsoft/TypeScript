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
    function foo() { return "foo"; }
    exports.foo = foo;
});
//// [1.js]
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new Promise((resolve_1, reject_1) => { require(["./0"], resolve_1, reject_1); }).then(__importStar);
    var p1 = new Promise((resolve_2, reject_2) => { require(["./0"], resolve_2, reject_2); }).then(__importStar);
    p1.then(zero => {
        return zero.foo();
    });
    exports.p2 = new Promise((resolve_3, reject_3) => { require(["./0"], resolve_3, reject_3); }).then(__importStar);
    function foo() {
        const p2 = new Promise((resolve_4, reject_4) => { require(["./0"], resolve_4, reject_4); }).then(__importStar);
    }
});
