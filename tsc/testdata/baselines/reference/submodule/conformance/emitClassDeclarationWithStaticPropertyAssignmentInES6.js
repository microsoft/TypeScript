//// [tests/cases/conformance/es6/classDeclaration/emitClassDeclarationWithStaticPropertyAssignmentInES6.ts] ////

//// [emitClassDeclarationWithStaticPropertyAssignmentInES6.ts]
class C {
    static z: string = "Foo";
}

class D {
    x = 20000;
    static b = true;
}


//// [emitClassDeclarationWithStaticPropertyAssignmentInES6.js]
class C {
    static z = "Foo";
}
class D {
    x = 20000;
    static b = true;
}
