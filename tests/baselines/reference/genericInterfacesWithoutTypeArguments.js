//// [tests/cases/compiler/genericInterfacesWithoutTypeArguments.ts] ////

//// [genericInterfacesWithoutTypeArguments.ts]
interface I<T> { }
class C<T> { }
var i: I;
var c: C<I>;


//// [genericInterfacesWithoutTypeArguments.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var i;
var c;
