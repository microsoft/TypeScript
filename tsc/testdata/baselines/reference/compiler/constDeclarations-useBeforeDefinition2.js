//// [tests/cases/compiler/constDeclarations-useBeforeDefinition2.ts] ////

//// [file1.ts]
c;

//// [file2.ts]
const c = 0;


//// [file1.js]
"use strict";
c;
//// [file2.js]
"use strict";
const c = 0;
