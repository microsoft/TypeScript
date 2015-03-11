//// [emitClassDeclarationWithConstructorPropertyAssignmentInES6.ts]
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

//// [emitClassDeclarationWithConstructorPropertyAssignmentInES6.js]
class C {
    constructor() {
        thisx = "Hello world";
    }
}
class D {
    constructor() {
        thisx = "Hello world";
        this.y = 10;
    }
}
class E extends E {
    constructor(...args) {
        super(...args);
        thisz = true;
    }
}
class F extends F {
    constructor() {
        super();
        thisz = true;
        this.j = "HI";
    }
}
