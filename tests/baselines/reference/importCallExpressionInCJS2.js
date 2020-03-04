//// [tests/cases/conformance/dynamicImport/importCallExpressionInCJS2.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
export function backup() { return "backup"; }

//// [2.ts]
async function compute(promise: Promise<any>) {
    let j = await promise;
    if (!j) {
        j = await import("./1");
        return j.backup();
    }
    return j.foo();
}

compute(import("./0"));

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
function foo() { return "foo"; }
exports.foo = foo;
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backup = void 0;
function backup() { return "backup"; }
exports.backup = backup;
//// [2.js]
async function compute(promise) {
    let j = await promise;
    if (!j) {
        j = await Promise.resolve().then(() => require("./1"));
        return j.backup();
    }
    return j.foo();
}
compute(Promise.resolve().then(() => require("./0")));
