//// [dynamicImportTrailingComma.ts]
const path = './foo';
import(path,);

//// [dynamicImportTrailingComma.js]
var _a;
var path = './foo';
_a = path, Promise.resolve().then(function () { return require(_a); });
