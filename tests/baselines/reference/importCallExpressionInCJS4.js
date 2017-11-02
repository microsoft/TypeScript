//// [tests/cases/conformance/dynamicImport/importCallExpressionInCJS4.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

//// [2.ts]
async function foo() {
    class C extends (await import("./0")).B {}
    var c = new C();
    c.print();
}
foo();

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class B {
    print() { return "I am B"; }
}
exports.B = B;
//// [2.js]
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
async function foo() {
    class C extends (await Promise.resolve().then(() => __importStar(require("./0")))).B {
    }
    var c = new C();
    c.print();
}
foo();
