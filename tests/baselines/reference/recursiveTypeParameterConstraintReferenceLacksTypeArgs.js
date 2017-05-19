//// [recursiveTypeParameterConstraintReferenceLacksTypeArgs.ts]
class A<T extends A> { }

//// [recursiveTypeParameterConstraintReferenceLacksTypeArgs.js]
var A = (function () {
    function A() {
    }
    return A;
}());
