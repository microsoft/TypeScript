//// [tests/cases/conformance/importDefer/importDeferNamespace.ts] ////

//// [a.ts]
export function foo() {
    console.log("foo from a");
}

//// [b.ts]
import defer * as aNs from "./a.js";

aNs.foo();

//// [a.js]
export function foo() {
    console.log("foo from a");
}
//// [b.js]
import defer * as aNs from "./a.js";
aNs.foo();
