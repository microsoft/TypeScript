//// [tests/cases/compiler/jsFileCompilationTypeAssertions.ts] ////

//// [a.js]
0 as number;
var v = <string>undefined;


//// [a.js]
"use strict";
0;
var v = <string>undefined;
</>;
