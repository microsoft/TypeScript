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
    constructor() {
        this.x = "Hello world";
    }
}
class D {
    constructor() {
        this.x = "Hello world";
        this.y = 10;
    }
}
class E extends D {
    constructor() {
        super(...arguments);
        this.z = true;
    }
}
class F extends D {
    constructor() {
        super();
        this.z = true;
        this.j = "HI";
    }
}
