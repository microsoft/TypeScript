//// [tests/cases/conformance/dynamicImport/importCallExpressionInUMD4.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

export function foo() { return "foo" }

//// [1.ts]
export function backup() { return "backup"; }

//// [2.ts]
declare var console: any;
class C {
    private myModule = import("./0");
    method() {
        const loadAsync = import("./0");
        this.myModule.then(Zero => {
            console.log(Zero.foo());
        }, async err => {
            console.log(err);
            let one = await import("./1");
            console.log(one.backup());
        });
    }
}

export class D {
    private myModule = import("./0");
    method() {
        const loadAsync = import("./0");
        this.myModule.then(Zero => {
            console.log(Zero.foo());
        }, async err => {
            console.log(err);
            let one = await import("./1");
            console.log(one.backup());
        });
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
    exports.B = void 0;
    exports.foo = foo;
    class B {
        print() { return "I am B"; }
    }
    exports.B = B;
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.backup = backup;
    function backup() { return "backup"; }
});
//// [2.js]
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
    exports.D = void 0;
    class C {
        constructor() {
            this.myModule = __syncRequire ? Promise.resolve().then(() => __importStar(require("./0"))) : new Promise((resolve_1, reject_1) => { require(["./0"], resolve_1, reject_1); }).then(__importStar);
        }
        method() {
            const loadAsync = __syncRequire ? Promise.resolve().then(() => __importStar(require("./0"))) : new Promise((resolve_2, reject_2) => { require(["./0"], resolve_2, reject_2); }).then(__importStar);
            this.myModule.then(Zero => {
                console.log(Zero.foo());
            }, async (err) => {
                console.log(err);
                let one = await (__syncRequire ? Promise.resolve().then(() => __importStar(require("./1"))) : new Promise((resolve_3, reject_3) => { require(["./1"], resolve_3, reject_3); }).then(__importStar));
                console.log(one.backup());
            });
        }
    }
    class D {
        constructor() {
            this.myModule = __syncRequire ? Promise.resolve().then(() => __importStar(require("./0"))) : new Promise((resolve_4, reject_4) => { require(["./0"], resolve_4, reject_4); }).then(__importStar);
        }
        method() {
            const loadAsync = __syncRequire ? Promise.resolve().then(() => __importStar(require("./0"))) : new Promise((resolve_5, reject_5) => { require(["./0"], resolve_5, reject_5); }).then(__importStar);
            this.myModule.then(Zero => {
                console.log(Zero.foo());
            }, async (err) => {
                console.log(err);
                let one = await (__syncRequire ? Promise.resolve().then(() => __importStar(require("./1"))) : new Promise((resolve_6, reject_6) => { require(["./1"], resolve_6, reject_6); }).then(__importStar));
                console.log(one.backup());
            });
        }
    }
    exports.D = D;
});
