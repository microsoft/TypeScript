//// [tests/cases/compiler/abstractClassInLocalScope.ts] ////

//// [abstractClassInLocalScope.ts]
(() => {
    abstract class A {}
    class B extends A {}
    new B();
    return A;
})();


//// [abstractClassInLocalScope.js]
"use strict";
(() => {
    class A {
    }
    class B extends A {
    }
    new B();
    return A;
})();
