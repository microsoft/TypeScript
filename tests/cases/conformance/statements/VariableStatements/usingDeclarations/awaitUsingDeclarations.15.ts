// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true
// @noUnusedLocals: true

async function f() {
    await using _ = { async [Symbol.asyncDispose]() {} };
}