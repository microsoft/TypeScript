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
(function () {
    C.z = "Foo";
}).call(C);
class D {
    constructor() {
        this.x = 20000;
    }
}
(function () {
    D.b = true;
}).call(D);
