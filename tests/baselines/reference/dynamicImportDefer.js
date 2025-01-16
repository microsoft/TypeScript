//// [tests/cases/conformance/importDefer/dynamicImportDefer.ts] ////

//// [a.ts]
export function foo() {
  console.log("foo from a");
}

//// [b.ts]
import.defer("a").then(ns => {
  ns.foo();
});


//// [a.js]
export function foo() {
    console.log("foo from a");
}
//// [b.js]
import.defer("a").then(function (ns) {
    ns.foo();
});
