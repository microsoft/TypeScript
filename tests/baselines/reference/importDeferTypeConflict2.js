//// [tests/cases/conformance/importDefer/importDeferTypeConflict2.ts] ////

//// [a.ts]
export function foo() {
  console.log("foo from a");
}

//// [b.ts]
import defer type * as ns1 from "a";


//// [a.js]
export function foo() {
    console.log("foo from a");
}
//// [b.js]
ns1;
from;
"a";
export {};
