// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

async function f() {
    await using x = {};
}