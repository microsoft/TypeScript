//// [tests/cases/compiler/genericInterfacesWithoutTypeArguments.ts] ////

//// [genericInterfacesWithoutTypeArguments.ts]
interface I<T> { }
class C<T> { }
var i: I;
var c: C<I>;


//// [genericInterfacesWithoutTypeArguments.js]
"use strict";
class C {
}
var i;
var c;
