//// [tests/cases/conformance/importDefer/dynamicImportDeferInvalidStandalone.ts] ////

//// [a.ts]
export function foo() {
  console.log("foo from a");
}

//// [b.ts]
import.defer;

(import.defer)("a");


//// [a.js]
export function foo() {
    console.log("foo from a");
}
//// [b.js]
import.defer;
(import.defer)("a");
