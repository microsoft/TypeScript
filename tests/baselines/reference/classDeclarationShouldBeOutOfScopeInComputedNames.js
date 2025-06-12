//// [tests/cases/compiler/classDeclarationShouldBeOutOfScopeInComputedNames.ts] ////

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
let A = (() => {
    var _a, _b;
    class A {
        constructor() {
            this[_b] = 0;
        }
        static [(_a = A.p1, A.p2)]() { return 0; }
        ;
        [A.p1]() { }
    }
    _b = A.p2;
    A.p1 = Symbol();
    A.p2 = Symbol();
    // All of the below should be out of scope or TDZ - `A` has not finished being constructed as they are executed
    A[_a] = 0;
    return A;
})();
