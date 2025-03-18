//// [tests/cases/compiler/collisionExportsRequireAndAlias.ts] ////

//// [collisionExportsRequireAndAlias_file1.ts]
export function bar() {
}

//// [collisionExportsRequireAndAlias_file3333.ts]
export function bar2() {
}
//// [collisionExportsRequireAndAlias_file2.ts]
import require = require('collisionExportsRequireAndAlias_file1'); // Error
import exports = require('collisionExportsRequireAndAlias_file3333'); // Error
export function foo() {
    require.bar();
}
export function foo2() {
    exports.bar2();
}

//// [collisionExportsRequireAndAlias_file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
exports.foo2 = foo2;
const require = require("collisionExportsRequireAndAlias_file1");
const exports = require("collisionExportsRequireAndAlias_file3333");
function foo() {
    require.bar();
}
function foo2() {
    exports.bar2();
}
