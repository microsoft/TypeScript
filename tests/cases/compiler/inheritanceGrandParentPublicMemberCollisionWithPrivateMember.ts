// @target: es2015
// @strict: false
class A {
    public myMethod() { }
}

class B extends A { }

class C extends B {
    private myMethod() { }
}
