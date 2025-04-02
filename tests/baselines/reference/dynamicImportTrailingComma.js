//// [tests/cases/compiler/dynamicImportTrailingComma.ts] ////

//// [dynamicImportTrailingComma.ts]
const path = './foo';
import(path,);

//// [dynamicImportTrailingComma.js]
var path = './foo';
Promise.resolve("".concat(path)).then(function (s) { return require(s); });
