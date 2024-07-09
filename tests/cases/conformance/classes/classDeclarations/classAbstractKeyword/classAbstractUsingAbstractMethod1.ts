abstract class A {
    abstract foo() : number;
}

class B extends A {
    foo() { return 1; }
}

abstract class C extends A  {
    abstract foo() : number;
}

var a = new B;
a.foo();

a = new C; // error, cannot instantiate abstract class.
a.foo();