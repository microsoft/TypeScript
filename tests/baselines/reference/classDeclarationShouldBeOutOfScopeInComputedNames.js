//// [classDeclarationShouldBeOutOfScopeInComputedNames.ts]
class A {
    static readonly p1 = Symbol();
    static readonly p2 = Symbol();
    // All of the below should be out of scope or TDZ - `A` has not finished being constructed as they are executed
    static readonly [A.p1] = 0;
    static [A.p2]() { return 0 };
    [A.p1]() { }
    [A.p2] = 0
}


//// [classDeclarationShouldBeOutOfScopeInComputedNames.js]
var A = /** @class */ (function () {
    function A() {
        this[_b] = 0;
    }
    A[(_a = A.p1, A.p2)] = function () { return 0; };
    ;
    A.prototype[A.p1] = function () { };
    var _a, _b;
    _b = A.p2;
    A.p1 = Symbol();
    A.p2 = Symbol();
    // All of the below should be out of scope or TDZ - `A` has not finished being constructed as they are executed
    A[_a] = 0;
    return A;
}());
