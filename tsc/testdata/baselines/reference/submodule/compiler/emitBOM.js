//// [tests/cases/compiler/emitBOM.ts] ////

//// [emitBOM.ts]
// JS and d.ts output should have a BOM but not the sourcemap
var x;

//// [emitBOM.js]
﻿// JS and d.ts output should have a BOM but not the sourcemap
var x;
//# sourceMappingURL=emitBOM.js.map

//// [emitBOM.d.ts]
﻿// JS and d.ts output should have a BOM but not the sourcemap
declare var x: any;
