//// [recursiveTypeParameterConstraintReferenceLacksTypeArgs.ts]
class A<T extends A> { }

//// [recursiveTypeParameterConstraintReferenceLacksTypeArgs.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
