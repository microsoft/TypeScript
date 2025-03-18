//// [tests/cases/conformance/es6/classDeclaration/emitClassDeclarationWithPropertyAssignmentInES6.ts] ////

//// [emitClassDeclarationWithPropertyAssignmentInES6.ts]
class C {
    x: string = "Hello world";
}

class D {
    x: string = "Hello world";
    y: number;
    constructor() {
        this.y = 10;
    }
}

class E extends D{
    z: boolean = true;
}

class F extends D{
    z: boolean = true;
    j: string;
    constructor() {
        super();
        this.j = "HI";
    }
}

//// [emitClassDeclarationWithPropertyAssignmentInES6.js]
class C {
    x = "Hello world";
}
class D {
    x = "Hello world";
    y;
    constructor() {
        this.y = 10;
    }
}
class E extends D {
    z = true;
}
class F extends D {
    z = true;
    j;
    constructor() {
        super();
        this.j = "HI";
    }
}
