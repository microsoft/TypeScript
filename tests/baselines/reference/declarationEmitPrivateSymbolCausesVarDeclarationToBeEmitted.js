//// [declarationEmitPrivateSymbolCausesVarDeclarationToBeEmitted.ts]
const _data = Symbol('data');

export class User {
    private [_data] : any;
};


//// [declarationEmitPrivateSymbolCausesVarDeclarationToBeEmitted.js]
"use strict";
exports.__esModule = true;
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
