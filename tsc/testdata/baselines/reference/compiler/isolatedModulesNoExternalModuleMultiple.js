//// [tests/cases/compiler/isolatedModulesNoExternalModuleMultiple.ts] ////

//// [file1.ts]
var x;

//// [file2.ts]
var y;

//// [file3.ts]
var z;


//// [file1.js]
"use strict";
var x;
//// [file2.js]
"use strict";
var y;
//// [file3.js]
"use strict";
var z;
