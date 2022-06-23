//// [dynamicImportTrailingComma.ts]
const path = './foo';
import(path,);

//// [dynamicImportTrailingComma.js]
var path = './foo';
Promise.resolve(path).then(function (c) { return require(c); });
