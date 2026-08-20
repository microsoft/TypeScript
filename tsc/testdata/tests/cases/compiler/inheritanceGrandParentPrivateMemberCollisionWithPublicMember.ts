// @target: es2015
// @strict: false
class A {
    private myMethod() { }
}

class B extends A { }

class C extends B {
    public myMethod() { }
}
