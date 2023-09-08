//// [tests/cases/compiler/arrayFlatUnlimitedDepth.ts] ////

//// [arrayFlatUnlimitedDepth.ts]
const foo = [ [ ['string' ] ] ]
const flatFoo : string[] = foo.flat(1000) 


//// [arrayFlatUnlimitedDepth.js]
"use strict";
var foo = [[['string']]];
var flatFoo = foo.flat(1000);
