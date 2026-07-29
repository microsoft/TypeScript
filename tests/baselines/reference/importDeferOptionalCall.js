//// [tests/cases/conformance/importDefer/importDeferOptionalCall.ts] ////

//// [b.ts]
import.defer?.('x');


//// [b.js]
"use strict";
var _a;
(_a = import.defer) === null || _a === void 0 ? void 0 : _a('x');
