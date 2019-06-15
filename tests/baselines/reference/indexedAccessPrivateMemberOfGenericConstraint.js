//// [indexedAccessPrivateMemberOfGenericConstraint.ts]
class A {
  private a: number;
}

type B<T extends A> = T["a"];


//// [indexedAccessPrivateMemberOfGenericConstraint.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
