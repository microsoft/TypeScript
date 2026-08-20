//// [tests/cases/compiler/simpleTestMultiFile.ts] ////

//// [foo.ts]
const x: number = "";

//// [bar.ts]
const y: string = 1;

//// [foo.js]
"use strict";
const x = "";
//// [bar.js]
"use strict";
const y = 1;
