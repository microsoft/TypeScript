//// [tests/cases/conformance/dynamicImport/importCallExpressionInAMD4.ts] ////

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
define(["require", "exports"], function (require, exports) {
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.backup = backup;
    function backup() { return "backup"; }
});
//// [2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.D = void 0;
    class C {
        constructor() {
            this.myModule = new Promise((resolve_1, reject_1) => { require(["./0"], resolve_1, reject_1); });
        }
        method() {
            const loadAsync = new Promise((resolve_2, reject_2) => { require(["./0"], resolve_2, reject_2); });
            this.myModule.then(Zero => {
                console.log(Zero.foo());
            }, async (err) => {
                console.log(err);
                let one = await new Promise((resolve_3, reject_3) => { require(["./1"], resolve_3, reject_3); });
                console.log(one.backup());
            });
        }
    }
    class D {
        constructor() {
            this.myModule = new Promise((resolve_4, reject_4) => { require(["./0"], resolve_4, reject_4); });
        }
        method() {
            const loadAsync = new Promise((resolve_5, reject_5) => { require(["./0"], resolve_5, reject_5); });
            this.myModule.then(Zero => {
                console.log(Zero.foo());
            }, async (err) => {
                console.log(err);
                let one = await new Promise((resolve_6, reject_6) => { require(["./1"], resolve_6, reject_6); });
                console.log(one.backup());
            });
        }
    }
    exports.D = D;
});
