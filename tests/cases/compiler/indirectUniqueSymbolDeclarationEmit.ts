// @lib: es6
// @declaration: true
export const x = Symbol();
export const y = Symbol();
declare function rand(): boolean;
export function f() {
    return rand() ? x : y;
}