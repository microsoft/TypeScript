//// [emitClassDeclarationWithExtensionInES6.ts]
class B { }
class C extends B { }
class D extends B {
    constructor() {
        super();
    }
}


//// [emitClassDeclarationWithExtensionInES6.js]
class B {
    constructor() {
    }
}
class C extends B {
    constructor(...args) {
        super(...args);
    }
}
class D extends B {
    constructor() {
        super();
    }
}
