//// [tests/cases/conformance/dynamicImport/importCallExpressionES5CJS.ts] ////

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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo() { return "foo"; }
exports.foo = foo;
//// [1.js]
"use strict";
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve().then(function () { return __importStar(require("./0")); });
var p1 = Promise.resolve().then(function () { return __importStar(require("./0")); });
p1.then(function (zero) {
    return zero.foo();
});
exports.p2 = Promise.resolve().then(function () { return __importStar(require("./0")); });
function foo() {
    var p2 = Promise.resolve().then(function () { return __importStar(require("./0")); });
}
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () {
        var loadAsync = Promise.resolve().then(function () { return __importStar(require("./0")); });
    };
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.method = function () {
        var loadAsync = Promise.resolve().then(function () { return __importStar(require("./0")); });
    };
    return D;
}());
exports.D = D;
