//// [tests/cases/compiler/missingArgument1.ts] ////

//// [missingArgument1.ts]
foo(a,,b);

//// [missingArgument1.js]
"use strict";
foo(a, b);
