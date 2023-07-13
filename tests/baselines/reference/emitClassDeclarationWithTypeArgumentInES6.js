//// [tests/cases/conformance/es6/classDeclaration/emitClassDeclarationWithTypeArgumentInES6.ts] ////

//// [emitClassDeclarationWithTypeArgumentInES6.ts]
class B<T> {
    x: T;
    B: T;
    constructor(a: T) { this.B = a;}
    foo(): T {
        return this.x;
    }
    get BB(): T {
        return this.B;
    }
    set BBWith(c: T) {
        this.B = c;
    }
}

//// [emitClassDeclarationWithTypeArgumentInES6.js]
class B {
    constructor(a) { this.B = a; }
    foo() {
        return this.x;
    }
    get BB() {
        return this.B;
    }
    set BBWith(c) {
        this.B = c;
    }
}
