//// [tests/cases/conformance/es6/classDeclaration/emitClassDeclarationWithExtensionInES6.ts] ////

//// [emitClassDeclarationWithExtensionInES6.ts]
class B {
    baz(a: string, y = 10) { }
}
class C extends B {
    foo() { }
    baz(a: string, y:number) {
        super.baz(a, y);
    }
}
class D extends C {
    constructor() {
        super();
    }

    foo() {
        super.foo();
    }

    baz() {
        super.baz("hello", 10);
    }
}


//// [emitClassDeclarationWithExtensionInES6.js]
class B {
    baz(a, y = 10) { }
}
class C extends B {
    foo() { }
    baz(a, y) {
        super.baz(a, y);
    }
}
class D extends C {
    constructor() {
        super();
    }
    foo() {
        super.foo();
    }
    baz() {
        super.baz("hello", 10);
    }
}
