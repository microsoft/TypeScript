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
}
C.z = "Foo";
class D {
    constructor() {
        this.x = 20000;
    }
}
D.b = true;
