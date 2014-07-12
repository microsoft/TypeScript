//@module: amd
// @Filename: collisionExportsRequireAndAlias_file1.ts
export function bar() {
}

// @Filename: collisionExportsRequireAndAlias_file11.ts
export function bar2() {
}
// @Filename: collisionExportsRequireAndAlias_file2.ts
import require = require('collisionExportsRequireAndAlias_file1'); // Error
import exports = require('collisionExportsRequireAndAlias_file11'); // Error
export function foo() {
    require.bar();
}
export function foo2() {
    exports.bar2();
}