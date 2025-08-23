//// [tests/cases/conformance/importDefer/dynamicImportDefer.ts] ////

//// [a.ts]
export function foo() {
  console.log("foo from a");
}

//// [b.ts]
import.defer("./a.js").then(ns => {
  ns.foo();
});


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() {
    console.log("foo from a");
}
//// [b.js]
import.defer("./a.js").then(ns => {
    ns.foo();
});
