//// [tests/cases/compiler/indirectUniqueSymbolDeclarationEmit2.ts] ////

//// [indirectUniqueSymbolDeclarationEmit2.ts]
// repro from https://github.com/microsoft/TypeScript/issues/53276

export const a = Symbol.toStringTag;

export class F {
    [a](){ return "" }
}

export const b = (new F())[a];


//// [indirectUniqueSymbolDeclarationEmit2.js]
"use strict";
// repro from https://github.com/microsoft/TypeScript/issues/53276
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.F = exports.a = void 0;
exports.a = Symbol.toStringTag;
var F = /** @class */ (function () {
    function F() {
    }
    F.prototype[exports.a] = function () { return ""; };
    return F;
}());
exports.F = F;
exports.b = (new F())[exports.a];


//// [indirectUniqueSymbolDeclarationEmit2.d.ts]
export declare const a: typeof Symbol.toStringTag;
export declare class F {
    [a](): string;
}
export declare const b: () => string;
