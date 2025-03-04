//// [tests/cases/conformance/importDefer/importDeferInvalidDefault.ts] ////

//// [a.ts]
export default function foo() {
    console.log("foo from a");
}

//// [b.ts]
import defer foo from "a";

foo();

//// [a.js]
export default function foo() {
    console.log("foo from a");
}
//// [b.js]
import defer foo from "a";
foo();
