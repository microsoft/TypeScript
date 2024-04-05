// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

export {};

declare var x: any;
async function f() {
    if (x) await using a = null;
}