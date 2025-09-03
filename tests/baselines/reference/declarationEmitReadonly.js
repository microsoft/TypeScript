//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/declarationEmitReadonly.ts] ////

//// [declarationEmitReadonly.ts]
class C {
    constructor(readonly x: number) {}
}

//// [declarationEmitReadonly.js]
class C {
    x;
    constructor(x) {
        this.x = x;
    }
}


//// [declarationEmitReadonly.d.ts]
declare class C {
    readonly x: number;
    constructor(x: number);
}
