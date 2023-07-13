// @target: es2022
// @lib: esnext,dom
// @module: commonjs,system,esnext,amd
// @noTypesAndSymbols: true
// @noEmitHelpers: true

export const x = 1;
export { y };

using z = { [Symbol.dispose]() {} };

const y = 2;

export const w = 3;

export default 4;

console.log(w, x, y, z);
