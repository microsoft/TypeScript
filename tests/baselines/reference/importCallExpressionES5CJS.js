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
exports.foo = foo;
function foo() { return "foo"; }
//// [1.js]
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = exports.p2 = void 0;
Promise.resolve().then(() => __importStar(require("./0")));
var p1 = Promise.resolve().then(() => __importStar(require("./0")));
p1.then(zero => {
    return zero.foo();
});
exports.p2 = Promise.resolve().then(() => __importStar(require("./0")));
function foo() {
    const p2 = Promise.resolve().then(() => __importStar(require("./0")));
}
class C {
    method() {
        const loadAsync = Promise.resolve().then(() => __importStar(require("./0")));
    }
}
class D {
    method() {
        const loadAsync = Promise.resolve().then(() => __importStar(require("./0")));
    }
}
exports.D = D;
