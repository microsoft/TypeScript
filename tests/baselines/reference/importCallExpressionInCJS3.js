//// [tests/cases/conformance/dynamicImport/importCallExpressionInCJS3.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

//// [2.ts]
// We use Promise<any> for now as there is no way to specify shape of module object
function foo(x: Promise<any>) {
    x.then(value => {
        let b = new value.B();
        b.print();
    })
}

foo(import("./0"));

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
class B {
    print() { return "I am B"; }
}
exports.B = B;
//// [2.js]
// We use Promise<any> for now as there is no way to specify shape of module object
function foo(x) {
    x.then(value => {
        let b = new value.B();
        b.print();
    });
}
foo(Promise.resolve().then(() => require("./0")));
