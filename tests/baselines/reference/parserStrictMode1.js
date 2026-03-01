//// [tests/cases/conformance/parser/ecmascript5/StrictMode/parserStrictMode1.ts] ////

//// [parserStrictMode1.ts]
foo1();
foo1();
foo1();
static();

//// [parserStrictMode1.js]
"use strict";
foo1();
foo1();
foo1();
static();
