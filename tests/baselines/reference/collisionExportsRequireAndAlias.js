//// [collisionExportsRequireAndAlias.ts]
// TODO: re-enable, fails when run in the browser with full compiler suite, but not when run alone

////@module: amd
//// @Filename: collisionExportsRequireAndAlias_file1.ts
//export function bar() {
//}

//// @Filename: collisionExportsRequireAndAlias_file3333.ts
//export function bar2() {
//}
//// @Filename: collisionExportsRequireAndAlias_file2.ts
//import require = require('collisionExportsRequireAndAlias_file1'); // Error
//import exports = require('collisionExportsRequireAndAlias_file3333'); // Error
//export function foo() {
//    require.bar();
//}
//export function foo2() {
//    exports.bar2();
//}

//// [collisionExportsRequireAndAlias.js]
// TODO: re-enable, fails when run in the browser with full compiler suite, but not when run alone
