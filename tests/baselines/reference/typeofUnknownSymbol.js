//// [tests/cases/compiler/typeofUnknownSymbol.ts] ////

//// [typeofUnknownSymbol.ts]
// previously gave no error here
var x = typeof whatsthis


//// [typeofUnknownSymbol.js]
// previously gave no error here
var x = typeof whatsthis;
