// @target: es2015
(() => {
    abstract class A {}
    class B extends A {}
    new A();
    new B();
})()
