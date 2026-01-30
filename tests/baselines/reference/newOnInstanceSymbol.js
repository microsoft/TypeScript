//// [tests/cases/compiler/newOnInstanceSymbol.ts] ////

//// [newOnInstanceSymbol.ts]
class C {}
var x = new C(); // should be ok
new x(); // should error

//// [newOnInstanceSymbol.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var x = new C(); // should be ok
new x(); // should error
