//// [tests/cases/conformance/importDefer/importDeferOptionalCall.ts] ////

//// [x.ts]
export const x = 1;
//// [b.ts]
import.defer?.('./x');


//// [x.js]
export const x = 1;
//// [b.js]
"use strict";
var _a;
(_a = import.defer) === null || _a === void 0 ? void 0 : _a('./x');
