//// [tests/cases/conformance/importDefer/importDeferOptionalCall.ts] ////

//// [x.ts]
export const x = 1;

//// [b.ts]
import.defer?.("./x");
import.defer?.<string>("./x");
import.defer("./x");


//// [x.js]
export const x = 1;
//// [b.js]
"use strict";
import.defer?.("./x");
import.defer?.("./x");
import.defer("./x");
