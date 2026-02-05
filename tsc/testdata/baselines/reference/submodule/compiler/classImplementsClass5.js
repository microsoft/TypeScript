//// [tests/cases/compiler/classImplementsClass5.ts] ////

//// [classImplementsClass5.ts]
class A {
    private x = 1;
    foo(): number { return 1; }
}
class C implements A {
    private x = 1;
    foo() {
        return 1;
    }
}

class C2 extends A {}

declare var c: C;
declare var c2: C2;
c = c2;
c2 = c;

//// [classImplementsClass5.js]
"use strict";
class A {
    x = 1;
    foo() { return 1; }
}
class C {
    x = 1;
    foo() {
        return 1;
    }
}
class C2 extends A {
}
c = c2;
c2 = c;
