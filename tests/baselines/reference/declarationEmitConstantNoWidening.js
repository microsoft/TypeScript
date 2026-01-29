//// [tests/cases/compiler/declarationEmitConstantNoWidening.ts] ////

//// [declarationEmitConstantNoWidening.ts]
export const FOO = 'FOO'; 
export class Bar {
    readonly type = FOO; // Should be widening literal "FOO" - so either `typeof "FOO"` or = "FOO"
}

//// [declarationEmitConstantNoWidening.js]
export const FOO = 'FOO';
export class Bar {
    constructor() {
        this.type = FOO; // Should be widening literal "FOO" - so either `typeof "FOO"` or = "FOO"
    }
}


//// [declarationEmitConstantNoWidening.d.ts]
export declare const FOO = "FOO";
export declare class Bar {
    readonly type = "FOO";
}
