//// [tests/cases/compiler/classImplementsClass4.ts] ////

//// [classImplementsClass4.ts]
class A {
    private x = 1;
    foo(): number { return 1; }
}
class C implements A {
    foo() {
        return 1;
    }
}

class C2 extends A {}

declare var c: C;
declare var c2: C2;
c = c2;
c2 = c;

//// [classImplementsClass4.js]
"use strict";
class A {
    x = 1;
    foo() { return 1; }
}
class C {
    foo() {
        return 1;
    }
}
class C2 extends A {
}
c = c2;
c2 = c;
