interface A {
    name();
}
class B {
    public name() { }
}
class C {
    public static name() { }
}

var a: A = new B();
a = new C(); // error name is missing
a = B; // error name is missing
a = C;

var b: B = new C(); // error name is missing
b = B; // error name is missing
b = C;
b = a;

var c: C = new B();
c = B;
c = C;
c = a;
