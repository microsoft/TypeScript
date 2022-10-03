class A { foo(): number { return 1; } }
class C implements A {
    foo() {
        return 1;
    }
}

class C2 extends A {}

// no errors
var c: C;
var c2: C2;
c = c2;
c2 = c;