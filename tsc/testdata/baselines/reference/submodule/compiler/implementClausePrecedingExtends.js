//// [tests/cases/compiler/implementClausePrecedingExtends.ts] ////

//// [implementClausePrecedingExtends.ts]
class C { foo: number }
class D implements C extends C { }

//// [implementClausePrecedingExtends.js]
class C {
    foo;
}
class D extends C {
}
