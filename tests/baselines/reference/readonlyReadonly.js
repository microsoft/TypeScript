//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/readonlyReadonly.ts] ////

//// [readonlyReadonly.ts]
class C {
    readonly readonly x: number;
    constructor(readonly readonly y: number) {}
}

//// [readonlyReadonly.js]
class C {
    y;
    x;
    constructor(y) {
        this.y = y;
    }
}
