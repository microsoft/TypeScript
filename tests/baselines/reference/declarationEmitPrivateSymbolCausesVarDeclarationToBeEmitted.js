//// [tests/cases/compiler/declarationEmitPrivateSymbolCausesVarDeclarationToBeEmitted.ts] ////

//// [declarationEmitPrivateSymbolCausesVarDeclarationToBeEmitted.ts]
const _data = Symbol('data');

export class User {
    private [_data] : any;
};


//// [declarationEmitPrivateSymbolCausesVarDeclarationToBeEmitted.js]
const _data = Symbol('data');
export class User {
}
;


//// [declarationEmitPrivateSymbolCausesVarDeclarationToBeEmitted.d.ts]
declare const _data: unique symbol;
export declare class User {
    private [_data];
}
export {};
