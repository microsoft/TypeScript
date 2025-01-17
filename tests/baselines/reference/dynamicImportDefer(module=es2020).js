//// [tests/cases/conformance/importDefer/dynamicImportDefer.ts] ////

//// [a.ts]
export function foo() {
  console.log("foo from a");
}

//// [b.ts]
import.defer("./a.js").then(ns => {
  ns.foo();
});

import("./a.js"); // TODO: Without this the import.defer cannot resolve ./a


//// [a.js]
export function foo() {
    console.log("foo from a");
}
//// [b.js]
import.defer("./a.js").then(ns => {
    ns.foo();
});
import("./a.js"); // TODO: Without this the import.defer cannot resolve ./a
