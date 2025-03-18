//// [tests/cases/compiler/classImplementsClass2.ts] ////

//// [classImplementsClass2.ts]
class A { foo(): number { return 1; } }
class C implements A {} // error

class C2 extends A {
    foo() {
        return 1;
    }
}

var c: C;
var c2: C2;
c = c2;
c2 = c;

//// [classImplementsClass2.js]
class A {
    foo() { return 1; }
}
class C {
}
class C2 extends A {
    foo() {
        return 1;
    }
}
var c;
var c2;
c = c2;
c2 = c;
