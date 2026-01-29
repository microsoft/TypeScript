//// [tests/cases/compiler/indirectUniqueSymbolDeclarationEmit.ts] ////

//// [indirectUniqueSymbolDeclarationEmit.ts]
export const x = Symbol();
export const y = Symbol();
declare function rand(): boolean;
export function f() {
    return rand() ? x : y;
}

//// [indirectUniqueSymbolDeclarationEmit.js]
export const x = Symbol();
export const y = Symbol();
export function f() {
    return rand() ? x : y;
}


//// [indirectUniqueSymbolDeclarationEmit.d.ts]
export declare const x: unique symbol;
export declare const y: unique symbol;
export declare function f(): typeof x | typeof y;
