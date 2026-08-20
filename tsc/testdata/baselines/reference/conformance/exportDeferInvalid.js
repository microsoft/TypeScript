//// [tests/cases/conformance/importDefer/exportDeferInvalid.ts] ////

//// [a.ts]
export function foo() {
  console.log("foo from a");
}

//// [b.ts]
export defer * as ns from "a";


//// [a.js]
export function foo() {
    console.log("foo from a");
}
//// [b.js]
"use strict";
defer * as;
ns;
from;
"a";
