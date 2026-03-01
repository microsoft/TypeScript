//// [tests/cases/compiler/exportDefaultClassAndValue.ts] ////

//// [exportDefaultClassAndValue.ts]
const foo = 1
export default foo
export default class Foo {}


//// [exportDefaultClassAndValue.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = 1;
exports.default = foo;
class Foo {
}
exports.default = Foo;
