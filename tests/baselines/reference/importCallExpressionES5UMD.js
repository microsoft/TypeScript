//// [tests/cases/conformance/dynamicImport/importCallExpressionES5UMD.ts] ////

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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
    exports.D = exports.p2 = void 0;
    __syncRequire ? Promise.resolve().then(function () { return __importStar(require("./0")); }) : new Promise(function (resolve_1, reject_1) { require(["./0"], resolve_1, reject_1); }).then(__importStar);
    var p1 = __syncRequire ? Promise.resolve().then(function () { return __importStar(require("./0")); }) : new Promise(function (resolve_2, reject_2) { require(["./0"], resolve_2, reject_2); }).then(__importStar);
    p1.then(function (zero) {
        return zero.foo();
    });
    exports.p2 = __syncRequire ? Promise.resolve().then(function () { return __importStar(require("./0")); }) : new Promise(function (resolve_3, reject_3) { require(["./0"], resolve_3, reject_3); }).then(__importStar);
    function foo() {
        var p2 = __syncRequire ? Promise.resolve().then(function () { return __importStar(require("./0")); }) : new Promise(function (resolve_4, reject_4) { require(["./0"], resolve_4, reject_4); }).then(__importStar);
    }
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.method = function () {
            var loadAsync = __syncRequire ? Promise.resolve().then(function () { return __importStar(require("./0")); }) : new Promise(function (resolve_5, reject_5) { require(["./0"], resolve_5, reject_5); }).then(__importStar);
        };
        return C;
    }());
    var D = /** @class */ (function () {
        function D() {
        }
        D.prototype.method = function () {
            var loadAsync = __syncRequire ? Promise.resolve().then(function () { return __importStar(require("./0")); }) : new Promise(function (resolve_6, reject_6) { require(["./0"], resolve_6, reject_6); }).then(__importStar);
        };
        return D;
    }());
    exports.D = D;
});
