// @target: es2022
// @lib: esnext,dom
// @module: commonjs,amd
// @noTypesAndSymbols: true
// @noEmitHelpers: true

using z = { [Symbol.dispose]() {} };

const y = 2;

console.log(y, z);
export = 4;
