//// [tests/cases/compiler/declarationEmitPrivateSymbolCausesVarDeclarationToBeEmitted.ts] ////

//// [declarationEmitPrivateSymbolCausesVarDeclarationToBeEmitted.ts]
const _data = Symbol('data');

export class User {
    private [_data] : any;
};


//// [declarationEmitPrivateSymbolCausesVarDeclarationToBeEmitted.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const _data = Symbol('data');
class User {
    [_data];
}
exports.User = User;
;
