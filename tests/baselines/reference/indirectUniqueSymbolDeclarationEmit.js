//// [indirectUniqueSymbolDeclarationEmit.ts]
export const x = Symbol();
export const y = Symbol();
declare function rand(): boolean;
export function f() {
    return rand() ? x : y;
}

//// [indirectUniqueSymbolDeclarationEmit.js]
"use strict";
exports.__esModule = true;
exports.f = exports.y = exports.x = void 0;
exports.x = Symbol();
exports.y = Symbol();
function f() {
    return rand() ? exports.x : exports.y;
}
exports.f = f;


//// [indirectUniqueSymbolDeclarationEmit.d.ts]
export declare const x: unique symbol;
export declare const y: unique symbol;
export declare function f(): typeof x | typeof y;
