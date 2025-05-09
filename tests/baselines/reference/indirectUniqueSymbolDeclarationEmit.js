//// [tests/cases/compiler/indirectUniqueSymbolDeclarationEmit.ts] ////

//// [indirectUniqueSymbolDeclarationEmit.ts]
export const x = Symbol();
export const y = Symbol();
declare function rand(): boolean;
export function f() {
    return rand() ? x : y;
}

//// [indirectUniqueSymbolDeclarationEmit.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
exports.f = f;
exports.x = Symbol();
exports.y = Symbol();
function f() {
    return rand() ? exports.x : exports.y;
}


//// [indirectUniqueSymbolDeclarationEmit.d.ts]
export declare const x: unique symbol;
export declare const y: unique symbol;
export declare function f(): typeof x | typeof y;
