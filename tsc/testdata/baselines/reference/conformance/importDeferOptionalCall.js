//// [tests/cases/conformance/importDefer/importDeferOptionalCall.ts] ////

//// [x.ts]
export const x = 1;

//// [b.ts]
import.defer?.("./x");

//// [c.ts]
import.defer?.<string>("./x");

//// [d.ts]
import.defer("./x");


//// [x.js]
export const x = 1;
//// [b.js]
"use strict";
import.defer?.("./x");
//// [c.js]
"use strict";
import.defer?.("./x");
//// [d.js]
"use strict";
import.defer("./x");
