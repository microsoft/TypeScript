//// [dynamicImportTrailingComma.ts]
const path = './foo';
import(path,);

//// [dynamicImportTrailingComma.js]
var path = './foo';
(function (_a) {
    return Promise.resolve().then(function () { return require(_a); });
})(path);
