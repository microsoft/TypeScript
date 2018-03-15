//// [privateSymbolNoDeclarationEmit.ts]
const _data = Symbol('data');

export class User {
    private [_data] : any;
};

//// [privateSymbolNoDeclarationEmit.js]
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


//// [privateSymbolNoDeclarationEmit.d.ts]
export declare class User {
}
