//// [tests/cases/conformance/parser/ecmascript5/StrictMode/parserStrictMode12.ts] ////

//// [parserStrictMode12.ts]
"use strict";
var v = { set foo(eval) { } }

//// [parserStrictMode12.js]
"use strict";
var v = { set foo(eval) { } };
