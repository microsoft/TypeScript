//// [tests/cases/compiler/implementPublicPropertyAsPrivate.ts] ////

//// [implementPublicPropertyAsPrivate.ts]
interface I {
    x: number;
}
class C implements I {
    private x = 0; // should raise error at class decl
}

//// [implementPublicPropertyAsPrivate.js]
class C {
    x = 0;
}
