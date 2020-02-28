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
    exports.foo = exports.B = void 0;
    class B {
        print() { return "I am B"; }
    }
    exports.B = B;
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.backup = void 0;
    function backup() { return "backup"; }
    exports.backup = backup;
});
//// [2.js]
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
            this.myModule = __syncRequire ? Promise.resolve().then(() => require("./0")) : new Promise((resolve_1, reject_1) => { require(["./0"], resolve_1, reject_1); });
        }
        method() {
            const loadAsync = __syncRequire ? Promise.resolve().then(() => require("./0")) : new Promise((resolve_2, reject_2) => { require(["./0"], resolve_2, reject_2); });
            this.myModule.then(Zero => {
                console.log(Zero.foo());
            }, async (err) => {
                console.log(err);
                let one = await (__syncRequire ? Promise.resolve().then(() => require("./1")) : new Promise((resolve_3, reject_3) => { require(["./1"], resolve_3, reject_3); }));
                console.log(one.backup());
            });
        }
    }
    class D {
        constructor() {
            this.myModule = __syncRequire ? Promise.resolve().then(() => require("./0")) : new Promise((resolve_4, reject_4) => { require(["./0"], resolve_4, reject_4); });
        }
        method() {
            const loadAsync = __syncRequire ? Promise.resolve().then(() => require("./0")) : new Promise((resolve_5, reject_5) => { require(["./0"], resolve_5, reject_5); });
            this.myModule.then(Zero => {
                console.log(Zero.foo());
            }, async (err) => {
                console.log(err);
                let one = await (__syncRequire ? Promise.resolve().then(() => require("./1")) : new Promise((resolve_6, reject_6) => { require(["./1"], resolve_6, reject_6); }));
                console.log(one.backup());
            });
        }
    }
    exports.D = D;
});
