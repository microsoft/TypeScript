//// [tests/cases/conformance/es6/classDeclaration/emitClassDeclarationWithThisKeywordInES6.ts] ////

//// [emitClassDeclarationWithThisKeywordInES6.ts]
class B {
    x = 10;
    constructor() {
        this.x = 10;
    }
    static log(a: number) { }
    foo() {
        B.log(this.x);
    }

    get X() {
        return this.x;
    }

    set bX(y: number) {
        this.x = y;
    }
}

//// [emitClassDeclarationWithThisKeywordInES6.js]
class B {
    constructor() {
        this.x = 10;
        this.x = 10;
    }
    static log(a) { }
    foo() {
        B.log(this.x);
    }
    get X() {
        return this.x;
    }
    set bX(y) {
        this.x = y;
    }
}
