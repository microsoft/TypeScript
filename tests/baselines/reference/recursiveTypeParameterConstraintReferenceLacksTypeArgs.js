//// [tests/cases/compiler/recursiveTypeParameterConstraintReferenceLacksTypeArgs.ts] ////

//// [recursiveTypeParameterConstraintReferenceLacksTypeArgs.ts]
class A<T extends A> { }

//// [recursiveTypeParameterConstraintReferenceLacksTypeArgs.js]
"use strict";
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
