//// [tests/cases/conformance/dynamicImport/importCallExpressionInCJS5.ts] ////

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
        const loadAsync = import ("./0");
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
exports.foo = foo;
class B {
    print() { return "I am B"; }
}
exports.B = B;
function foo() { return "foo"; }
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backup = backup;
function backup() { return "backup"; }
//// [2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
class C {
    constructor() {
        this.myModule = Promise.resolve().then(() => require("./0"));
    }
    method() {
        const loadAsync = Promise.resolve().then(() => require("./0"));
        this.myModule.then(Zero => {
            console.log(Zero.foo());
        }, async (err) => {
            console.log(err);
            let one = await Promise.resolve().then(() => require("./1"));
            console.log(one.backup());
        });
    }
}
class D {
    constructor() {
        this.myModule = Promise.resolve().then(() => require("./0"));
    }
    method() {
        const loadAsync = Promise.resolve().then(() => require("./0"));
        this.myModule.then(Zero => {
            console.log(Zero.foo());
        }, async (err) => {
            console.log(err);
            let one = await Promise.resolve().then(() => require("./1"));
            console.log(one.backup());
        });
    }
}
exports.D = D;
