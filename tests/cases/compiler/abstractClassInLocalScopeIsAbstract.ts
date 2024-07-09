(() => {
    abstract class A {}
    class B extends A {}
    new A();
    new B();
})()
