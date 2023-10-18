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
var _data = Symbol('data');
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
;


//// [declarationEmitPrivateSymbolCausesVarDeclarationToBeEmitted.d.ts]
declare const _data: unique symbol;
export declare class User {
    private [_data];
}
export {};
