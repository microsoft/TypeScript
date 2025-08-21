// @target: es2022
// @module: esnext
// @lib: esnext
// @importHelpers: true
// @noTypesAndSymbols: true

export {};

async function f() {
    await using a = null;
}