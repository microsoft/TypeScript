//// [tests/cases/conformance/importDefer/importDeferTypeConflict1.ts] ////

//// [a.ts]
export function foo() {
  console.log("foo from a");
}

//// [b.ts]
import type defer * as ns1 from "a";


//// [a.js]
export function foo() {
    console.log("foo from a");
}
//// [b.js]
 * as;
ns1;
from;
"a";
