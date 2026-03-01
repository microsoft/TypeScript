//// [tests/cases/compiler/newOnInstanceSymbol.ts] ////

//// [newOnInstanceSymbol.ts]
class C {}
var x = new C(); // should be ok
new x(); // should error

//// [newOnInstanceSymbol.js]
"use strict";
class C {
}
var x = new C(); // should be ok
new x(); // should error
