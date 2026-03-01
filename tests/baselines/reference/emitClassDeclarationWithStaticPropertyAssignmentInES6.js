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
"use strict";
class C {
}
C.z = "Foo";
class D {
    constructor() {
        this.x = 20000;
    }
}
D.b = true;
