//// [tests/cases/compiler/declarationEmitIndexTypeNotFound.ts] ////

//// [declarationEmitIndexTypeNotFound.ts]
export interface Test {
    [index: TypeNotFound]: any;
}


//// [declarationEmitIndexTypeNotFound.js]
export {};


//// [declarationEmitIndexTypeNotFound.d.ts]
export interface Test {
    [index: TypeNotFound]: any;
}
