//// [emitClassDeclarationWithConstructorInES6.ts]
class C {
    y: number;
    constructor(x: number) {
    }
}

class D {
    y: number;
    x: string = "hello";
    constructor(x: number, z = "hello") {
        this.y = 10;
    }
}

//// [emitClassDeclarationWithConstructorInES6.js]
class C {
    constructor(x) {
    }
}
class D {
    constructor(x, z = "hello") {
        this.x = "hello";
        this.y = 10;
    }
}
