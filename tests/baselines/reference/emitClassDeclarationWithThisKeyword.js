//// [emitClassDeclarationWithThisKeyword.ts]
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

//// [emitClassDeclarationWithThisKeyword.js]
class B {
    constructor() {
        this.x = 10;
        this.x = 10;
    }
    static log(a) {
    }
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
