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
function foo() { return "foo"; }
exports.foo = foo;
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function backup() { return "backup"; }
exports.backup = backup;
//// [2.js]
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
async function compute(promise) {
    let j = await promise;
    if (!j) {
        j = await Promise.resolve().then(() => __importStar(require("./1")));
        return j.backup();
    }
    return j.foo();
}
compute(Promise.resolve().then(() => __importStar(require("./0"))));
