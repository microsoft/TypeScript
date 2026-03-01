//// [tests/cases/compiler/typeofUnknownSymbol.ts] ////

//// [typeofUnknownSymbol.ts]
// previously gave no error here
var x = typeof whatsthis


//// [typeofUnknownSymbol.js]
"use strict";
// previously gave no error here
var x = typeof whatsthis;
