//// [tests/cases/compiler/unresolvedTypeAssertionSymbol.ts] ////

//// [unresolvedTypeAssertionSymbol.ts]
var x = 1;
var y = <asdf>x;
 


//// [unresolvedTypeAssertionSymbol.js]
"use strict";
var x = 1;
var y = x;
