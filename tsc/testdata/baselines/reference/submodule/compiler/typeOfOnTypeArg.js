//// [tests/cases/compiler/typeOfOnTypeArg.ts] ////

//// [typeOfOnTypeArg.ts]
var A = { '': 3 };

function fill<B extends typeof A>(f: B) {

} 

fill(32);


//// [typeOfOnTypeArg.js]
"use strict";
var A = { '': 3 };
function fill(f) {
}
fill(32);
