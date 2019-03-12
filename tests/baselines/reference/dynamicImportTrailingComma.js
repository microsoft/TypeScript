//// [dynamicImportTrailingComma.ts]
const path = './foo';
import(path,);

//// [dynamicImportTrailingComma.js]
var path = './foo';
Promise.resolve().then(function () { return require(path); });
