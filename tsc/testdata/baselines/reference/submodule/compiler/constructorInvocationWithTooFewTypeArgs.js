//// [tests/cases/compiler/constructorInvocationWithTooFewTypeArgs.ts] ////

//// [constructorInvocationWithTooFewTypeArgs.ts]
class D<T, U> {

   x: T

   y: U

}
 
var d = new D<number>();


//// [constructorInvocationWithTooFewTypeArgs.js]
"use strict";
class D {
    x;
    y;
}
var d = new D();
