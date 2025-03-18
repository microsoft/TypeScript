//// [tests/cases/compiler/abstractClassInLocalScopeIsAbstract.ts] ////

//// [abstractClassInLocalScopeIsAbstract.ts]
(() => {
    abstract class A {}
    class B extends A {}
    new A();
    new B();
})()


//// [abstractClassInLocalScopeIsAbstract.js]
(() => {
    class A {
    }
    class B extends A {
    }
    new A();
    new B();
})();
