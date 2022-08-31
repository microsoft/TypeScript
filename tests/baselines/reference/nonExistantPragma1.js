//// [nonExistantPragma1.ts]
// @ts-thisOptionDoesNotExist
// unknown option is ignored
export class A {}


//// [nonExistantPragma1.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
// @ts-thisOptionDoesNotExist
// unknown option is ignored
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
