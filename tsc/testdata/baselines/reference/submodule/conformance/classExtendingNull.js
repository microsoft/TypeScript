//// [tests/cases/conformance/classes/classDeclarations/classExtendingNull.ts] ////

//// [classExtendingNull.ts]
class C1 extends null { }
class C2 extends (null) { }
class C3 extends null { x = 1; }
class C4 extends (null) { x = 1; }

//// [classExtendingNull.js]
class C1 extends null {
}
class C2 extends (null) {
}
class C3 extends null {
    x = 1;
}
class C4 extends (null) {
    x = 1;
}
