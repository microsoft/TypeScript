//// [tests/cases/conformance/parser/ecmascript5/StrictMode/parserStrictMode16.ts] ////

//// [parserStrictMode16.ts]
"use strict";
delete this;
delete 1;
delete null;
delete "a";

//// [parserStrictMode16.js]
"use strict";
delete this;
delete 1;
delete null;
delete "a";
