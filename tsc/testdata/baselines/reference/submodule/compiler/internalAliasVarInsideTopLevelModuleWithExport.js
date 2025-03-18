//// [tests/cases/compiler/internalAliasVarInsideTopLevelModuleWithExport.ts] ////

//// [internalAliasVarInsideTopLevelModuleWithExport.ts]
export module a {
    export var x = 10;
}

export import b = a.x;
export var bVal = b;



//// [internalAliasVarInsideTopLevelModuleWithExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bVal = exports.a = void 0;
var a;
(function (a) {
    a.x = 10;
})(a || (exports.a = a = {}));
exports.bVal = exports.b;
