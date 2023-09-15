// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

await using x = null;

function f() {
    await using x = null;
}