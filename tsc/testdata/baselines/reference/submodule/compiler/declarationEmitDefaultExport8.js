//// [tests/cases/compiler/declarationEmitDefaultExport8.ts] ////

//// [declarationEmitDefaultExport8.ts]
var _default = 1;
export {_default as d}
export default 1 + 2;


//// [declarationEmitDefaultExport8.js]
var _default = 1;
export { _default as d };
export default 1 + 2;
