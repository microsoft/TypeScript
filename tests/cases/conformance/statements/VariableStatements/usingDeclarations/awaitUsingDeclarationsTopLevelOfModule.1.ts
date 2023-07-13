// @target: es2022
// @lib: esnext,dom
// @module: system,esnext
// @noTypesAndSymbols: true
// @noEmitHelpers: true

export const x = 1;
export { y };

await using z = { async [Symbol.asyncDispose]() {} };

const y = 2;

export const w = 3;

export default 4;

console.log(w, x, y, z);
