// @importHelpers: true
// @target: es2017
// @module: commonjs,system,amd,es2015,es2020
// @esModuleInterop: true,false
// @noEmit: true
// @noTypesAndSymbols: true
// @filename: a.ts
export default class { }

// @filename: b.ts
export { default } from "./a";
