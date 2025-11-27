// @target: esnext
// @module: esnext
// @declaration: true
// @noTypesAndSymbols: true

using r1 = { [Symbol.dispose]() {} };
export { r1 };

await using r2 = { async [Symbol.asyncDispose]() {} };
export { r2 };
