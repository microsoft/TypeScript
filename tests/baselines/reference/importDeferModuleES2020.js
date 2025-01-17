//// [tests/cases/conformance/importDefer/importDeferModuleES2020.ts] ////

//// [a.ts]
export function foo() {
    console.log("foo from a");
}

//// [b.ts]
import defer * as aNs from "./a";

aNs.foo();


//// [a.js]
export function foo() {
    console.log("foo from a");
}
//// [b.js]
import defer * as aNs from "./a";
aNs.foo();
